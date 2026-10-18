from pathlib import Path
import datetime, hashlib, io, json, os, shutil, subprocess, sys, tarfile, tempfile

repo = Path('/Users/tsm0420/geo')
revision = sys.argv[1]
assert len(revision) == 40 and subprocess.check_output(['git', 'rev-parse', revision], cwd=repo, text=True).strip() == revision
root = Path(tempfile.mkdtemp(prefix='geo038-package-')).resolve()
source = root / 'source'
source.mkdir()
receipts = root / 'receipts'
receipts.mkdir()
steps = []

def command(label, args, cwd, expected=0):
    result = subprocess.run(args, cwd=cwd, capture_output=True)
    row = {'label': label, 'command': [str(x) for x in args], 'cwd': str(cwd), 'exitCode': result.returncode, 'expectedExit': expected, 'at': datetime.datetime.now(datetime.timezone.utc).isoformat()}
    (receipts / (label + '.json')).write_text(json.dumps(row, indent=2) + '\n')
    (receipts / (label + '.stdout.txt')).write_bytes(result.stdout)
    (receipts / (label + '.stderr.txt')).write_bytes(result.stderr)
    steps.append(row)
    assert result.returncode == expected, (label, result.stderr.decode(errors='replace'))
    return result

archive = subprocess.check_output(['git', 'archive', '--format=tar', revision], cwd=repo)
with tarfile.open(fileobj=io.BytesIO(archive)) as handle:
    for member in handle.getmembers():
        destination = source / member.name
        assert destination.resolve().is_relative_to(source)
        if member.isdir():
            destination.mkdir(parents=True, exist_ok=True)
        else:
            assert member.isfile(), member.name
            stream = handle.extractfile(member)
            assert stream is not None
            destination.parent.mkdir(parents=True, exist_ok=True)
            destination.write_bytes(stream.read())
            destination.chmod(member.mode)

checked = json.loads((repo / 'docs/verification/TICKET-038/checked-inputs.json').read_text())
for name, identity in checked.items():
    original = subprocess.check_output(['git', 'show', revision + ':' + name], cwd=repo)
    assert original == (source / name).read_bytes() == (repo / name).read_bytes(), name
    assert len(original) == identity['bytes'] and hashlib.sha256(original).hexdigest() == identity['sha256'], name

command('clean-install', ['npm', 'ci', '--ignore-scripts'], source)
command('clean-build', ['npm', 'run', 'build'], source)
packed = command('pack', ['npm', 'pack', '--json'], source)
tarball = source / json.loads(packed.stdout)[0]['filename']
consumer = root / 'consumer'
consumer.mkdir()
(consumer / 'package.json').write_text('{"name":"geo038-consumer","private":true}')
command('consumer-install', ['npm', 'install', '--ignore-scripts', '--no-audit', '--no-fund', str(tarball)], consumer)
installed = consumer / 'node_modules/geo-growth-engine'
identities = []
with tarfile.open(tarball) as handle:
    for member in handle.getmembers():
        if not member.isfile():
            continue
        name = str(Path(member.name).relative_to('package'))
        stream = handle.extractfile(member)
        assert stream is not None
        data = stream.read()
        assert data == (source / name).read_bytes() == (installed / name).read_bytes(), name
        identities.append({'path': name, 'bytes': len(data), 'sha256': hashlib.sha256(data).hexdigest()})
previous = json.loads((repo / 'docs/verification/TICKET-036/package/manifest.json').read_text())
old = {x['path']: x['sha256'] for x in previous['installedFiles']}
assert set(old) == {x['path'] for x in identities}
changed = [x['path'] for x in identities if old[x['path']] != x['sha256']]
assert set(changed) == {'dist/src/visibility.js', 'README.md', 'docs/configuration.md', '.agents/skills/geo-visibility-tracker/SKILL.md'}, changed

geo = str(consumer / 'node_modules/.bin/geo')
project = root / 'project'
project.mkdir()
command('consumer-init', [geo, 'init', '--target', str(project)], consumer)
command('consumer-skills', [geo, 'install', '--target', str(project)], consumer)
for skill in sorted((installed / '.agents/skills').iterdir()):
    assert (project / '.agents/skills' / skill.name / 'SKILL.md').read_bytes() == (skill / 'SKILL.md').read_bytes()
    command('validate-' + skill.name, ['python3', '/Users/tsm0420/.codex/skills/.system/skill-creator/scripts/quick_validate.py', str(project / '.agents/skills' / skill.name)], consumer)
for name in ['config.yaml', 'product.yaml', 'queries.yaml']:
    assert (project / '.geo' / name).read_bytes() == (installed / 'templates' / name).read_bytes()

inputs = {}
def supplied(name, data):
    path = root / name
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_bytes(data)
    inputs[str(path)] = hashlib.sha256(data).hexdigest()
    return path

baseline = supplied('baseline.jsonl', (repo / 'docs/verification/TICKET-038/discovery/baseline.jsonl').read_bytes())
swapped = supplied('swapped.jsonl', (repo / 'docs/verification/TICKET-038/discovery/swapped.jsonl').read_bytes())
empty = supplied('empty.jsonl', b'')
duplicate_rows = [json.loads(line) for line in baseline.read_text().splitlines()]
duplicate_rows[1]['id'] = duplicate_rows[2]['id']
duplicate = supplied('duplicate.jsonl', ''.join(json.dumps(x) + '\n' for x in duplicate_rows).encode())
collision = supplied('collision/evidence/responses.jsonl', baseline.read_bytes())
example_input = source / 'examples/visibility.jsonl'
inputs[str(example_input)] = hashlib.sha256(example_input.read_bytes()).hexdigest()
config = source / 'examples/.geo/config.yaml'
expected = {'audit': {'pass': 17, 'fail': 0, 'unknown': 2}, 'aso': {'pass': 9, 'fail': 0, 'unknown': 2}, 'plan': {'pass': 1, 'fail': 0, 'unknown': 0}, 'visibility': {'pass': 0, 'fail': 0, 'unknown': 3}}
for kind in expected:
    output = root / ('example-' + kind)
    args = [geo, kind, '--config', str(config), '--output', str(output)]
    if kind == 'visibility':
        args += ['--input', str(example_input)]
    result = command('consumer-' + kind, args, consumer)
    report = json.loads((output / (kind + '.json')).read_bytes())
    assert report['example'] is True and report['summary'] == expected[kind]
    assert {k: json.loads(result.stdout)[k] for k in ['pass', 'fail', 'unknown']} == expected[kind]
    if report['data'] is not None:
        assert json.dumps(report['data'], indent=2, ensure_ascii=False) in (output / (kind + '.md')).read_text()
    if kind == 'visibility':
        assert (output / 'evidence/responses.jsonl').read_bytes() == example_input.read_bytes()
        assert report['data']['sha256'] == inputs[str(example_input)]

documents = {}
for label, path in [('baseline', baseline), ('swapped', swapped), ('empty', empty)]:
    output = root / label
    command('question-' + label, [geo, 'visibility', '--config', str(config), '--input', str(path), '--output', str(output)], consumer)
    document = json.loads((output / 'visibility.json').read_bytes())
    documents[label] = document
    assert document['example'] is True and document['summary'] == expected['visibility']
    assert document['data']['sha256'] == inputs[str(path)]
    assert (output / 'evidence/responses.jsonl').read_bytes() == path.read_bytes()
    assert json.dumps(document['data'], indent=2, ensure_ascii=False) in (output / 'visibility.md').read_text()

ctx = {'provider': 'fictional-provider', 'surface': 'api', 'model': 'fictional-model-a', 'locale': 'en-GB'}
def row(query, a, s, f, coverage, mention, citation, competitor, model='fictional-model-a'):
    return dict(ctx, query=query, model=model, attempted=a, successful=s, failed=f, coverage=coverage, mentionRate=mention, citationRate=citation, recommendationRate=None, competitors={'Other Journal': competitor})
qa = 'How can I save daily journal entries?'
qb = 'Which journal supports sharing?'
qc = 'Does it work offline?'
rows = [row(qa, 2, 1, 1, 0.5, 1, 1, 0), row(qb, 1, 1, 0, 1, 0, 0, 1), row(qc, 1, 0, 1, 0, None, None, 0), row(qa, 1, 1, 0, 1, 0, 0, 1, model='fictional-model-b')]
assert documents['baseline']['data']['queryGroups'] == rows
changed_rows = [dict(x, query=qb if x['query'] == qa else qa if x['query'] == qb else x['query']) for x in rows]
assert documents['swapped']['data']['queryGroups'] == changed_rows
for field in ['totals', 'groups']:
    assert documents['baseline']['data'][field] == documents['swapped']['data'][field]
    assert documents['baseline']['data'][field] == json.loads((repo / 'docs/verification/TICKET-038/discovery/baseline.visibility.json').read_bytes())['data'][field]
assert documents['empty']['data']['queryGroups'] == [] and documents['empty']['data']['groups'] == []
assert documents['empty']['data']['totals']['coverage'] is None and documents['empty']['data']['totals']['mentionRate'] is None

older = json.loads(json.dumps(documents['baseline']))
del older['data']['queryGroups']
older_path = supplied('older.json', (json.dumps(older, indent=2) + '\n').encode())
current = root / 'baseline/visibility.json'
inputs[str(current)] = hashlib.sha256(current.read_bytes()).hexdigest()
for metrics in [False, True]:
    output = root / ('compare-' + str(metrics))
    args = [geo, 'compare', '--before', str(older_path), '--after', str(current), '--output', str(output)]
    if metrics:
        args += ['--visibility-metrics']
    command('compare-' + str(metrics), args, consumer)
    result = json.loads((output / 'compare.json').read_bytes())
    data = result['data']
    assert data['before']['report'] == older and data['after']['report'] == documents['baseline']
    assert data['before']['sha256'] == inputs[str(older_path)] and data['after']['sha256'] == inputs[str(current)]
    assert data['counts'] == {'added': 0, 'removed': 0, 'status-changed': 0, 'details-changed': 0, 'unchanged': 3}
    assert json.dumps(data, indent=2, ensure_ascii=False) in (output / 'compare.md').read_text()
    if metrics:
        assert [x['difference'] for x in data['visibilityMetrics']] == [0, 0, 0, 0, 0, 0]
    else:
        assert 'visibilityMetrics' not in data

rejected = root / 'duplicate-output'
r = command('duplicate-rejection', [geo, 'visibility', '--config', str(config), '--input', str(duplicate), '--output', str(rejected)], consumer, 2)
assert not rejected.exists() and not r.stdout and b'duplicate sample ID' in r.stderr
collision_output = root / 'collision'
sentinels = {}
for name in ['visibility.json', 'visibility.md']:
    path = collision_output / name
    data = ('Prior artifact ' + name).encode()
    path.write_bytes(data)
    sentinels[str(path)] = data
r = command('input-protection', [geo, 'visibility', '--config', str(config), '--input', str(collision), '--output', str(collision_output)], consumer, 2)
assert not r.stdout and b'would overwrite an input file' in r.stderr
for name, original in sentinels.items():
    assert Path(name).read_bytes() == original
for name, digest in inputs.items():
    assert hashlib.sha256(Path(name).read_bytes()).hexdigest() == digest, name
assert len(steps) == 22
manifest = {'sourceRevision': revision, 'runtime': subprocess.check_output(['node', '--version'], text=True).strip(), 'root': str(root), 'tarball': str(tarball), 'tarballBytes': tarball.stat().st_size, 'tarballSha256': hashlib.sha256(tarball.read_bytes()).hexdigest(), 'installedFiles': identities, 'changedPackageInputs': changed, 'checkedInputCount': len(checked), 'inputDigestsBeforeConsumption': inputs, 'steps': steps, 'queryRows': rows, 'sentinels': {k: hashlib.sha256(v).hexdigest() for k, v in sentinels.items()}, 'harnessSha256': hashlib.sha256(Path(__file__).read_bytes()).hexdigest(), 'limits': ['Fictional local imports, not new live measurements or growth evidence.', 'Existing unchanged comparison range/UTF-8 behavior uses prior proof plus current full-suite checks; no separate rerun claim.', 'Primary temporal and fresh-directory assertions are separate from independently copied bytes.', 'Final-head CI, actual-main verification, release and marketplace decisions are separate.']}
(root / 'manifest.json').write_text(json.dumps(manifest, indent=2) + '\n')
shutil.copyfile(__file__, root / 'harness.py')
public = repo / 'docs/verification/TICKET-038/package'
public.mkdir()
for file in receipts.iterdir():
    shutil.copyfile(file, public / file.name)
for name in ['manifest.json', 'harness.py', 'baseline.jsonl', 'swapped.jsonl', 'empty.jsonl', 'duplicate.jsonl', 'older.json']:
    shutil.copyfile(root / name, public / name)
for label in ['baseline', 'swapped', 'empty']:
    for name in ['visibility.json', 'visibility.md']:
        shutil.copyfile(root / label / name, public / (label + '.' + name))
print(json.dumps({'root': str(root), 'tarballBytes': manifest['tarballBytes'], 'tarballSha256': manifest['tarballSha256'], 'files': len(identities), 'outcomes': len(steps), 'checkedInputs': len(checked), 'changed': changed}, indent=2))
