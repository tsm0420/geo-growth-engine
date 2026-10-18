from pathlib import Path, PurePosixPath
import datetime, hashlib, json, os, platform, shutil, subprocess, sys, tarfile, tempfile

repo = Path('/Users/tsm0420/geo')
revision = sys.argv[1]
assert subprocess.check_output(['git', 'rev-parse', revision + '^{commit}'], cwd=repo, text=True).strip() == revision
raw = repo / 'reports/candidates/TICKET-034/package'
raw.mkdir()
root = Path(tempfile.mkdtemp(prefix='geo034-package-')).resolve()
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
old = json.loads((repo / 'docs/verification/TICKET-032/package/manifest.json').read_text())['installedFiles']
old_hashes = {x['path']: x['sha256'] for x in old}
changed = [x['path'] for x in installed if old_hashes.get(x['path']) != x['sha256']]
assert set(changed) == {'dist/src/audit.js', 'docs/configuration.md', 'docs/sources.md'}, changed
assert len(installed) == 25

fixture = root/'fixture';shutil.copytree(source/'examples',fixture);config=fixture/'.geo/config.yaml'
outputs={}
for kind in ['audit','aso','plan','visibility']:
    output=root/kind;args=[cli,kind,'--config',config,'--output',output]
    if kind=='visibility':args+=['--input',fixture/'visibility.jsonl']
    run('consumer-'+kind,args,consumer)
    doc=json.loads((output/(kind+'.json')).read_text())
    assert doc['kind']==kind and doc['summary']['fail']==0 and doc['example'] is True
    assert (output/(kind+'.md')).is_file();outputs[kind]={'directory':str(output),'summary':doc['summary']}
run('consumer-compare',[cli,'compare','--before',root/'audit/audit.json','--after',root/'audit/audit.json','--output',root/'compare'],consumer)
c=json.loads((root/'compare/compare.json').read_text());assert c['data']['counts']['unchanged']==len(json.loads((root/'audit/audit.json').read_text())['findings'])
assert c['data']['before']['sha256']==sha(root/'audit/audit.json')
assert (root/'visibility/evidence/responses.jsonl').read_bytes()==(fixture/'visibility.jsonl').read_bytes()
assert json.loads((root/'visibility/visibility.json').read_text())['data']['sha256']==sha(fixture/'visibility.jsonl')

observations=[]
def audit_case(label,xml,expected,statuses,data):
    path=fixture/'public/sitemap.xml';path.write_bytes(xml);original=sha(path)
    output=root/label;run('consumer-'+label,[cli,'audit','--config',config,'--output',output],consumer,expected)
    doc=json.loads((output/'audit.json').read_text());checks={x['id']:x['status'] for x in doc['findings'] if x['id'] in ['sitemap','sitemap-duplicates','index.html:sitemap-coverage']}
    assert checks==statuses and doc['data']['sitemap']==data and sha(path)==original
    for suffix in ['json','md']:shutil.copy2(output/('audit.'+suffix),raw/(label+'.audit.'+suffix))
    (raw/(label+'.xml')).write_bytes(xml)
    observations.append({'case':label,'inputSha256':original,'expectedExit':expected,'checks':checks,'sitemap':data})
pass_checks={'sitemap':'pass','sitemap-duplicates':'pass','index.html:sitemap-coverage':'pass'}
fail_checks={'sitemap':'fail','sitemap-duplicates':'unknown','index.html:sitemap-coverage':'fail'}
one={'entries':1,'uniqueUrls':1,'duplicateEntries':0,'duplicates':[]}
for name in ['direct','root-loc','metadata-loc','nested-url','unrelated-sibling','extension']:
    xml=(source/'docs/verification/TICKET-034/discovery'/(name+'.xml')).read_bytes()
    failed=name in ['root-loc','metadata-loc','nested-url']
    audit_case(name,xml,1 if failed else 0,fail_checks if failed else pass_checks,None if failed else one)
xml=b'<urlset><loc>https://other.example/</loc><url><loc>https://example.com/</loc></url><metadata><loc>https://example.com/</loc></metadata><url><loc>https://example.com/?a=1&amp;b=2</loc></url><url><loc>https://example.com/</loc></url></urlset>'
audit_case('direct-duplicates',xml,1,{**pass_checks,'sitemap-duplicates':'fail'},{'entries':3,'uniqueUrls':2,'duplicateEntries':1,'duplicates':[{'url':'https://example.com/','occurrences':2,'positions':[1,3]}]})
audit_case('partial-coverage',b'<urlset><url><loc>https://example.com/</loc></url><url><loc>relative/path</loc></url></urlset>',1,{**fail_checks,'index.html:sitemap-coverage':'pass'},None)
# Restore the valid fixture before checking its configured-input collision.
(fixture/'public/sitemap.xml').write_bytes((source/'examples/public/sitemap.xml').read_bytes())
collision=fixture/'.geo/audit.json';original=config.read_bytes();collision.write_bytes(original)
run('consumer-input-protection',[cli,'audit','--config',collision,'--output',fixture/'.geo'],consumer,2)
assert collision.read_bytes()==original and not (fixture/'.geo/audit.md').exists()
shutil.copy2(collision,raw/'collision-input.json')
checked=json.loads((repo/'reports/candidates/TICKET-034/checked-inputs.json').read_text())
for path,item in checked.items():assert sha(source/path)==item['sha256'] and (source/path).stat().st_size==item['size']
reused_skills=[x for x in installed if x['path'].startswith('.agents/skills/')]
assert len(reused_skills)==5 and all(old_hashes[x['path']]==x['sha256'] for x in reused_skills)
manifest={'sourceRevision':revision,'runtime':subprocess.check_output(['node','--version'],text=True).strip(),'root':str(root),'tarball':str(tarball),'tarballBytes':tarball.stat().st_size,'tarballSha256':sha(tarball),'installedFiles':installed,'changedPackageInputs':changed,'steps':steps,'outputs':outputs,'observations':observations,'checkedInputCount':len(checked),'skillValidationReuse':{'reason':'Five exact unchanged skill byte identities; validators not rerun','priorProof':'docs/verification/TICKET-028/package/manifest.json','files':reused_skills},'harnessSha256':sha(Path(__file__)),'limits':['Bounded direct-location extraction, not full Sitemaps XSD/namespace/deployment validity.','Primary full-source suite proof is separate; consumer does not rerun full tests.','Final-head and actual-main CI remain separate gates.']}
(raw/'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n');shutil.copy2(__file__,raw/'harness.py')
print(json.dumps({k:manifest[k] for k in ['sourceRevision','root','tarballBytes','tarballSha256','changedPackageInputs','checkedInputCount']}),flush=True)
