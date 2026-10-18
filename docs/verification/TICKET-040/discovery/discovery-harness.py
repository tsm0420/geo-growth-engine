from pathlib import Path
import datetime,hashlib,json,shutil,subprocess,tempfile
repo=Path('/Users/tsm0420/geo');receipts=repo/'reports/candidates/TICKET-039';receipts.mkdir(parents=True,exist_ok=True)
pkg=json.loads((repo/'docs/verification/TICKET-038/package/manifest.json').read_text());installed=Path(pkg['root'])/'consumer/node_modules/geo-growth-engine'
for x in pkg['installedFiles']:
 b=(installed/x['path']).read_bytes();assert len(b)==x['bytes'] and hashlib.sha256(b).hexdigest()==x['sha256']
for name,x in json.loads((repo/'docs/verification/TICKET-038/checked-inputs.json').read_text()).items():
 b=(repo/name).read_bytes();assert len(b)==x['bytes'] and hashlib.sha256(b).hexdigest()==x['sha256'];assert subprocess.check_output(['git','show','ea594befaf0827c1b03b264a646abc13df623946:'+name],cwd=repo)==b
root=Path(tempfile.mkdtemp(prefix='geo039-yaml-')).resolve();node=shutil.which('node');assert node
runtime=subprocess.check_output([node,'--version'],text=True).strip();observations=[]
for label in ['config-invalid','product-invalid','queries-invalid','valid-literal','valid-escaped','valid-bom']:
 case=root/label;shutil.copytree(repo/'examples',case)
 config=case/'.geo/config.yaml';product=case/'.geo/product.yaml';queries=case/'.geo/queries.yaml'
 if label=='config-invalid':config.write_bytes(config.read_bytes()+b'\n# Supplied note: \xff\n')
 if label=='product-invalid':product.write_bytes(product.read_bytes().replace(b'claim: Save daily journal entries.',b'claim: Save \xff daily journal entries.'))
 if label=='queries-invalid':queries.write_bytes(queries.read_bytes().replace(b'query: How can I keep daily journal entries?',b'query: How can I \xff keep daily journal entries?'))
 if label in ['valid-literal','valid-bom']:product.write_text(product.read_text().replace('claim: Save daily journal entries.','claim: Save \ufffd \U0001f600 e\u0301 daily journal entries.'))
 if label=='valid-escaped':product.write_text(product.read_text().replace('claim: Save daily journal entries.','claim: "Save \\uFFFD daily journal entries."'))
 if label=='valid-bom':
  for path in [config,product,queries]:path.write_bytes(b'\xef\xbb\xbf'+path.read_bytes())
 original={str(path):hashlib.sha256(path.read_bytes()).hexdigest() for path in [config,product,queries]}
 output=case/'results';command=[node,str(installed/'dist/src/cli.js'),'plan','--config',str(config),'--output',str(output)]
 result=subprocess.run(command,cwd=root,capture_output=True)
 receipt={'command':command,'cwd':str(root),'exitCode':result.returncode,'runtime':runtime,'at':datetime.datetime.now(datetime.timezone.utc).isoformat()}
 for suffix,data in [('receipt.json',(json.dumps(receipt,indent=2)+'\n').encode()),('stdout.txt',result.stdout),('stderr.txt',result.stderr)]:
  (receipts/(label+'.'+suffix)).write_bytes(data)
 assert result.returncode==0,(label,result.stderr)
 report=json.loads((output/'plan.json').read_bytes());opportunity=report['data']['opportunities'][0]
 assert report['example'] is True and report['summary']=={'pass':1,'fail':0,'unknown':0}
 for path in [config,product,queries]:
  assert hashlib.sha256(path.read_bytes()).hexdigest()==original[str(path)]
  shutil.copyfile(path,receipts/(label+'.'+path.name))
 for name in ['plan.json','plan.md']:shutil.copyfile(output/name,receipts/(label+'.'+name))
 actual_claim=opportunity['facts'][0]['claim'];actual_query=opportunity['query']
 if label=='product-invalid':assert actual_claim=='Save \ufffd daily journal entries.'
 if label=='queries-invalid':assert actual_query=='How can I \ufffd keep daily journal entries?'
 if label in ['valid-literal','valid-bom']:assert actual_claim=='Save \ufffd \U0001f600 e\u0301 daily journal entries.'
 if label=='valid-escaped':assert actual_claim=='Save \ufffd daily journal entries.'
 observations.append({'label':label,'exitCode':result.returncode,'sourceSha256BeforeConsumption':original,'claim':actual_claim,'query':actual_query,'summary':report['summary'],'note':'Malformed config comment accepted; no consumed field text changed in this case.' if label=='config-invalid' else 'Observed parsed content only; original input files remain unchanged.'})
probe=[node,'--input-type=module','--eval',"import { isUtf8 } from 'node:buffer'; import { readFileSync } from 'node:fs'; for(const p of process.argv.slice(1)){ const b=readFileSync(p); console.log(JSON.stringify({path:p,validUtf8:isUtf8(b),hasDecodedReplacement:b.toString('utf8').includes('\\ufffd')}));}"]+[str(root/label/'.geo'/name) for label,name in [('config-invalid','config.yaml'),('product-invalid','product.yaml'),('queries-invalid','queries.yaml'),('valid-literal','product.yaml'),('valid-escaped','product.yaml'),('valid-bom','product.yaml')]]
r=subprocess.run(probe,cwd=root,capture_output=True);assert r.returncode==0
(receipts/'native-probe.stdout.txt').write_bytes(r.stdout);(receipts/'native-probe.stderr.txt').write_bytes(r.stderr);(receipts/'native-probe.receipt.json').write_text(json.dumps({'command':probe,'cwd':str(root),'exitCode':r.returncode,'runtime':runtime},indent=2)+'\n')
parsed=[json.loads(line) for line in r.stdout.splitlines()];assert [x['validUtf8'] for x in parsed]==[False,False,False,True,True,True]
(receipts/'observations.json').write_text(json.dumps({'main':'ea594befaf0827c1b03b264a646abc13df623946','root':str(root),'runtime':runtime,'execution':'Unchanged immutable T038 installed CLI:25installed/47main-source identities verified','cases':observations,'limits':['Fictional local plan commands, not product measurements','Config malformed bytes were in an ignored comment; product/query cases visibly replace text','Source files unchanged; no original byte-loss or raw-rewrite claim','UTF8-only core path, not full YAML Unicode-encoding conformance']},indent=2)+'\n')
shutil.copyfile(__file__,receipts/'discovery-harness.py')
print(json.dumps({'root':str(root),'runtime':runtime,'actualCLIOutcomes':len(observations),'nativeProbeExit':r.returncode,'claims':[{'label':x['label'],'claim':x['claim'],'query':x['query']} for x in observations]},indent=2))
