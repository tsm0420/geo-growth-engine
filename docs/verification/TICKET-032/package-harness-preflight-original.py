from pathlib import Path, PurePosixPath
import datetime, hashlib, json, os, platform, shutil, subprocess, sys, tarfile, tempfile

repo = Path('/Users/tsm0420/geo')
revision = sys.argv[1]
assert subprocess.check_output(['git', 'rev-parse', revision + '^{commit}'], cwd=repo, text=True).strip() == revision
raw = repo / 'reports/candidates/TICKET-032/package'
raw.mkdir()
root = Path(tempfile.mkdtemp(prefix='geo032-package-')).resolve()
source = root / 'source'
source.mkdir()
archive = root / 'source.tar'
with archive.open('wb') as f:
    subprocess.run(['git', 'archive', '--format=tar', revision], cwd=repo, stdout=f, check=True)
with tarfile.open(archive) as t:
    assert all(not PurePosixPath(m.name).is_absolute() and '..' not in PurePosixPath(m.name).parts and (m.isfile() or m.isdir()) for m in t.getmembers())
    t.extractall(source)
env = dict(os.environ, npm_config_cache=str(root / 'npm-cache'))
steps = []
def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()
def run(label, command, cwd, expected=0):
    command = [str(x) for x in command]
    r = subprocess.run(command, cwd=cwd, env=env, capture_output=True)
    (raw / (label + '.stdout.txt')).write_bytes(r.stdout)
    (raw / (label + '.stderr.txt')).write_bytes(r.stderr)
    receipt = {'label': label, 'command': command, 'cwd': str(cwd), 'exitCode': r.returncode, 'expectedExit': expected, 'at': datetime.datetime.now(datetime.timezone.utc).isoformat()}
    (raw / (label + '.json')).write_text(json.dumps(receipt, indent=2) + '\n')
    steps.append(receipt)
    print(label, r.returncode, flush=True)
    if r.returncode != expected:
        print(r.stdout.decode(errors='replace'), r.stderr.decode(errors='replace'), flush=True)
        raise SystemExit('Unexpected outcome: ' + label)
    return r

run('clean-install', ['npm', 'ci', '--ignore-scripts', '--no-audit', '--no-fund'], source)
run('clean-build', ['npm', 'run', 'build'], source)
pack = json.loads(run('pack', ['npm', 'pack', '--ignore-scripts', '--json', '--pack-destination', root], source).stdout)[0]
tarball = root / pack['filename']
consumer = root / 'consumer'
consumer.mkdir()
(consumer / 'package.json').write_text('{"private":true,"type":"module"}\n')
run('consumer-install', ['npm', 'install', '--ignore-scripts', '--no-audit', '--no-fund', tarball], consumer)
package = consumer / 'node_modules/geo-growth-engine'
cli = consumer / 'node_modules/.bin/geo'
installed = [{'path': x['path'], 'bytes': (package / x['path']).stat().st_size, 'sha256': sha(package / x['path'])} for x in pack['files']]
with tarfile.open(tarball) as t:
    members = {str(PurePosixPath(m.name).relative_to('package')): m for m in t.getmembers() if m.isfile()}
    assert set(members) == {x['path'] for x in installed}
    for item in installed:
        archived = t.extractfile(members[item['path']])
        assert archived is not None and hashlib.sha256(archived.read()).hexdigest() == item['sha256']
        assert sha(source / item['path']) == item['sha256']
old = json.loads((repo / 'docs/verification/TICKET-030/package/manifest.json').read_text())['installedFiles']
old_hashes = {x['path']: x['sha256'] for x in old}
changed = [x['path'] for x in installed if old_hashes.get(x['path']) != x['sha256']]
assert set(changed) == {'dist/src/compare.js', 'dist/src/visibility.js', 'dist/src/json-text.js', 'docs/configuration.md'}, changed
assert len(installed) == 25

fixture = root / 'fixture'
shutil.copytree(source / 'examples', fixture)
config = fixture / '.geo/config.yaml'
outputs = {}
for kind in ['audit', 'aso', 'plan', 'visibility']:
    output = root / kind
    args = [cli, kind, '--config', config, '--output', output]
    if kind == 'visibility': args += ['--input', fixture / 'visibility.jsonl']
    run('consumer-' + kind, args, consumer)
    doc = json.loads((output / (kind + '.json')).read_text())
    assert doc['kind'] == kind and doc['summary']['fail'] == 0 and doc['example'] is True
    assert (output / (kind + '.md')).is_file()
    outputs[kind] = {'directory': str(output), 'summary': doc['summary']}
run('consumer-compare', [cli, 'compare', '--before', root/'audit/audit.json', '--after', root/'audit/audit.json', '--output', root/'compare'], consumer)
comparison = json.loads((root/'compare/compare.json').read_text())
assert comparison['data']['counts']['unchanged'] == len(json.loads((root/'audit/audit.json').read_text())['findings'])
assert comparison['data']['before']['sha256'] == sha(root/'audit/audit.json')
assert (root/'visibility/evidence/responses.jsonl').read_bytes() == (fixture/'visibility.jsonl').read_bytes()
assert json.loads((root/'visibility/visibility.json').read_text())['data']['sha256'] == sha(fixture/'visibility.jsonl')

def sample(identity, answer):
    return json.dumps(dict(id=identity, provider='fixture', surface='recorded', model='fixture', locale='en-GB', observedAt='2026-10-18T10:00:00Z', example=True, query='Fictional question', status='success', answer=answer, citations=[]), ensure_ascii=False).encode()
def report(identity):
    return json.dumps(dict(schemaVersion=1,kind='audit',example=True,generatedAt='2026-10-18T10:00:00Z',scope='Fictional fixture',findings=[dict(id=identity,status='pass',evidence='supplied',action='inspect')],summary={'pass':1,'fail':0,'unknown':0},data=None),ensure_ascii=False).encode()
valid_text = 'Example Journal \ufffd \U0001f44b e\u0301'
valid = root/'valid.json'; valid.write_bytes(report(valid_text))
valid_input = root/'valid.jsonl'; valid_input.write_bytes(sample('literal',valid_text)+b'\r\n\n'+sample('escaped',valid_text).replace(b'\xef\xbf\xbd', b'\\ufffd')+b'\n')
run('consumer-valid-unicode', [cli,'visibility','--config',config,'--input',valid_input,'--output',root/'unicode'], consumer)
unicode = json.loads((root/'unicode/visibility.json').read_text())
assert unicode['data']['totals']['successful'] == 2 and unicode['data']['totals']['mentionRate'] == 1
assert unicode['data']['sha256'] == sha(valid_input)
assert (root/'unicode/evidence/responses.jsonl').read_bytes() == valid_input.read_bytes()
escaped = root/'escaped.json'; escaped.write_bytes(valid.read_bytes().replace(b'\xef\xbf\xbd',b'\\ufffd'))
run('consumer-valid-comparison', [cli,'compare','--before',valid,'--after',escaped,'--output',root/'unicode-compare'], consumer)
c = json.loads((root/'unicode-compare/compare.json').read_text())
assert c['data']['counts']['unchanged'] == 1
for side,path in [('before',valid),('after',escaped)]:
    assert c['data'][side]['report']['findings'][0]['id'] == valid_text
    assert c['data'][side]['sha256'] == sha(path)

bad_input = root/'bad.jsonl'; bad_report = root/'bad.json'
bad_input.write_bytes(sample('valid','Example Journal')+b'\n'+sample('bad','BYTE_MARKER').replace(b'BYTE_MARKER',b'\xff')+b'\n')
bad_report.write_bytes(report('checkBYTE_MARKER').replace(b'BYTE_MARKER',b'\xe2\x82'))
original_inputs = {str(x):sha(x) for x in [bad_input,bad_report,valid,escaped,valid_input]}
for label,args,paths,bad in [
    ('invalid-visibility',[cli,'visibility','--config',config,'--input',bad_input],['visibility.json','visibility.md','evidence/responses.jsonl'],bad_input),
    ('invalid-before',[cli,'compare','--before',bad_report,'--after',valid],['compare.json','compare.md'],bad_report),
    ('invalid-after',[cli,'compare','--before',valid,'--after',bad_report],['compare.json','compare.md'],bad_report),
]:
    for reused in [False,True]:
        output = root/(label+('-existing' if reused else '-fresh'))
        if reused:
            for item in paths:
                dst=output/item; dst.parent.mkdir(parents=True,exist_ok=True); dst.write_bytes(('existing '+item).encode())
        result=run('consumer-'+output.name,args+['--output',output],consumer,2)
        assert b'UTF-8' in result.stderr and str(bad).encode() in result.stderr and result.stdout == b''
        if reused:
            for item in paths: assert (output/item).read_bytes() == ('existing '+item).encode()
        else: assert not output.exists()
for path,digest in original_inputs.items(): assert sha(Path(path)) == digest
collision = valid.read_bytes()
# The collision uses a valid source named exactly like the destination.
collision_dir=root/'collision'; collision_dir.mkdir(); collision_source=collision_dir/'compare.json'; collision_source.write_bytes(collision)
run('consumer-input-protection',[cli,'compare','--before',collision_source,'--after',escaped,'--output',collision_dir],consumer,2)
assert collision_source.read_bytes() == collision and not (collision_dir/'compare.md').exists()
checked=json.loads((repo/'reports/candidates/TICKET-032/checked-inputs.json').read_text())
for path,item in checked.items(): assert sha(source/path) == item['sha256'] and (source/path).stat().st_size == item['size']
reused_skills=[x for x in installed if x['path'].startswith('.agents/skills/')]
assert len(reused_skills)==5 and all(old_hashes[x['path']]==x['sha256'] for x in reused_skills)
manifest={'sourceRevision':revision,'runtime':subprocess.check_output(['node','--version'],text=True).strip(),'root':str(root),'tarball':str(tarball),'tarballBytes':tarball.stat().st_size,'tarballSha256':sha(tarball),'installedFiles':installed,'changedPackageInputs':changed,'steps':steps,'outputs':outputs,'inputDigests':original_inputs,'checkedInputCount':len(checked),'skillValidationReuse':{'reason':'Five exact unchanged skill byte identities; no validators rerun','priorProof':'docs/verification/TICKET-028/package/manifest.json','files':reused_skills},'harnessSha256':sha(Path(__file__))}
(raw/'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
shutil.copy2(__file__,raw/'harness.py')
for name in ['bad.jsonl','bad.json','valid.jsonl','valid.json','escaped.json']: shutil.copy2(root/name,raw/name)
print(json.dumps({k:manifest[k] for k in ['sourceRevision','root','tarballBytes','tarballSha256','changedPackageInputs','checkedInputCount']}),flush=True)
