from pathlib import Path, PurePosixPath
import datetime, hashlib, json, os, platform, shutil, subprocess, sys, tarfile, tempfile

repo = Path('/Users/tsm0420/geo')
revision = sys.argv[1]
assert subprocess.check_output(['git', 'rev-parse', revision + '^{commit}'], cwd=repo, text=True).strip() == revision
raw = repo / 'reports/candidates/TICKET-036/package'
raw.mkdir()
root = Path(tempfile.mkdtemp(prefix='geo036-package-')).resolve()
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
old = json.loads((repo / 'docs/verification/TICKET-034/package/manifest.json').read_text())['installedFiles']
old_hashes = {x['path']: x['sha256'] for x in old}
changed = [x['path'] for x in installed if old_hashes.get(x['path']) != x['sha256']]
assert set(changed) == {'dist/src/compare.js', 'docs/configuration.md'}, changed
assert len(installed) == 25

fixture=root/'fixture';shutil.copytree(source/'examples',fixture);config=fixture/'.geo/config.yaml';outputs={}
for kind in ['audit','aso','plan','visibility']:
    output=root/kind;args=[cli,kind,'--config',config,'--output',output]
    if kind=='visibility':args+=['--input',fixture/'visibility.jsonl']
    run('consumer-'+kind,args,consumer);doc=json.loads((output/(kind+'.json')).read_text())
    assert doc['kind']==kind and doc['summary']['fail']==0 and doc['example'] is True
    assert (output/(kind+'.md')).is_file();outputs[kind]={'directory':str(output),'summary':doc['summary']}
run('consumer-compare',[cli,'compare','--before',root/'audit/audit.json','--after',root/'audit/audit.json','--output',root/'compare'],consumer)
c=json.loads((root/'compare/compare.json').read_text());assert c['data']['counts']['unchanged']==len(json.loads((root/'audit/audit.json').read_text())['findings']);assert c['data']['before']['sha256']==sha(root/'audit/audit.json')
assert (root/'visibility/evidence/responses.jsonl').read_bytes()==(fixture/'visibility.jsonl').read_bytes();assert json.loads((root/'visibility/visibility.json').read_text())['data']['sha256']==sha(fixture/'visibility.jsonl')

def document():
    return {'schemaVersion':1,'kind':'visibility','example':True,'generatedAt':'2026-10-18T10:00:00Z','scope':'Fictional range fixture','findings':[{'id':'check','status':'pass','evidence':'supplied','action':'inspect','extension':None}],'summary':{'pass':1,'fail':0,'unknown':0,'extension':None},'data':{'nested':[None],'totals':{'attempted':1,'successful':1,'failed':0,'coverage':1,'mentionRate':1,'citationRate':0}},'extension':None}
original_inputs={}
def input_file(name,bytes):
    p=root/name;p.write_bytes(bytes);original_inputs[str(p)]=sha(p);return p
value={'large':1e308,'small':1e-308,'ordinary':0.125,'missing':None,'text':'1e400','nested':[True,False,[],{}]};doc=document();doc['extension']=value;doc['summary']['extension']=value;doc['findings'][0]['extension']=value;doc['data']['nested']=[value]
valid=input_file('valid.json',json.dumps(doc,indent=2).encode());compact=input_file('compact.json',json.dumps(doc).encode())
for metrics in [False,True]:
    output=root/('finite-'+str(metrics));args=[cli,'compare','--before',valid,'--after',compact,'--output',output]
    if metrics:args+=['--visibility-metrics']
    run('consumer-'+output.name,args,consumer);c=json.loads((output/'compare.json').read_text());assert c['data']['counts']['unchanged']==1
    for side,path in [('before',valid),('after',compact)]:assert c['data'][side]['report']==doc and c['data'][side]['sha256']==original_inputs[str(path)]
    for suffix in ['json','md']:shutil.copy2(output/('compare.'+suffix),raw/(output.name+'.compare.'+suffix))
opaque_doc=document();opaque_doc['data']['totals']='opaque';opaque=input_file('opaque.json',json.dumps(opaque_doc).encode())
run('consumer-opaque-default',[cli,'compare','--before',opaque,'--after',opaque,'--output',root/'opaque-default'],consumer)
assert json.loads((root/'opaque-default/compare.json').read_text())['data']['before']['report']==opaque_doc
opaque_error=run('consumer-opaque-explicit',[cli,'compare','--before',opaque,'--after',opaque,'--output',root/'opaque-explicit','--visibility-metrics'],consumer,2)
assert b'before data.totals' in opaque_error.stderr and not (root/'opaque-explicit').exists()
for side in ['before','after']:
    bad_doc=document()
    if side=='before':bad_doc['data']['nested']=[{'value':'RANGE_TOKEN'}]
    else:bad_doc['summary']['extension']='RANGE_TOKEN'
    token=b'-1e400' if side=='before' else b'1e400';bad=input_file('bad-'+side+'.json',json.dumps(bad_doc).encode().replace(b'"RANGE_TOKEN"',token))
    for metrics in [False,True]:
        for reused in [False,True]:
            output=root/f'bad-{side}-{metrics}-{reused}'
            if reused:
                output.mkdir();(output/'compare.json').write_bytes(b'existing JSON');(output/'compare.md').write_bytes(b'existing Markdown')
            args=[cli,'compare','--before',bad if side=='before' else valid,'--after',bad if side=='after' else compact,'--output',output]
            if metrics:args+=['--visibility-metrics']
            result=run('consumer-'+output.name,args,consumer,2);assert b'supported finite range' in result.stderr and str(bad).encode() in result.stderr and result.stdout==b''
            if reused:assert (output/'compare.json').read_bytes()==b'existing JSON' and (output/'compare.md').read_bytes()==b'existing Markdown'
            else:assert not output.exists()
field=document();field['data']['totals']['citationRate']='RANGE_TOKEN';field_path=input_file('field.json',json.dumps(field).encode().replace(b'"RANGE_TOKEN"',b'1e400'))
field_error=run('consumer-existing-field-error',[cli,'compare','--before',valid,'--after',field_path,'--output',root/'field-error','--visibility-metrics'],consumer,2)
assert b'after data.totals.citationRate' in field_error.stderr and not (root/'field-error').exists()
collision_dir=root/'collision';collision_dir.mkdir();collision=input_file('collision/compare.json',valid.read_bytes())
run('consumer-input-protection',[cli,'compare','--before',collision,'--after',compact,'--output',collision_dir],consumer,2)
assert collision.read_bytes()==valid.read_bytes() and not (collision_dir/'compare.md').exists()
for path,digest in original_inputs.items():assert sha(Path(path))==digest
for path in original_inputs:shutil.copy2(path,raw/(Path(path).parent.name+'-'+Path(path).name if Path(path).parent==collision_dir else Path(path).name))
checked=json.loads((repo/'reports/candidates/TICKET-036/checked-inputs.json').read_text())
for path,item in checked.items():assert sha(source/path)==item['sha256'] and (source/path).stat().st_size==item['size']
reused_skills=[x for x in installed if x['path'].startswith('.agents/skills/')];assert len(reused_skills)==5 and all(old_hashes[x['path']]==x['sha256'] for x in reused_skills)
manifest={'sourceRevision':revision,'runtime':subprocess.check_output(['node','--version'],text=True).strip(),'root':str(root),'tarball':str(tarball),'tarballBytes':tarball.stat().st_size,'tarballSha256':sha(tarball),'installedFiles':installed,'changedPackageInputs':changed,'steps':steps,'outputs':outputs,'inputDigests':original_inputs,'checkedInputCount':len(checked),'skillValidationReuse':{'reason':'Five exact unchanged skill byte identities; validators not rerun','priorProof':'docs/verification/TICKET-028/package/manifest.json','files':reused_skills},'harnessSha256':sha(Path(__file__)),'limits':['Finite runtime range only, not arbitrary decimal precision.','Default data remains semantically opaque; explicit metric field errors preserved.','Fresh-directory absence and preserved sentinels are retained primary harness assertions.','Final-head and actual-main CI remain separate gates.']}
(raw/'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n');shutil.copy2(__file__,raw/'harness.py');print(json.dumps({k:manifest[k] for k in ['sourceRevision','root','tarballBytes','tarballSha256','changedPackageInputs','checkedInputCount']}),flush=True)
