from pathlib import Path
import copy,datetime,hashlib,json,shutil,subprocess,tempfile
repo=Path('/Users/tsm0420/geo')
receipts=repo/'reports/candidates/TICKET-037';receipts.mkdir(parents=True,exist_ok=True)
pkg=json.loads((repo/'docs/verification/TICKET-036/package/manifest.json').read_text())
installed=Path(pkg['root'])/'consumer/node_modules/geo-growth-engine'
for f in pkg['installedFiles']:
 b=(installed/f['path']).read_bytes()
 assert len(b)==f['bytes'] and hashlib.sha256(b).hexdigest()==f['sha256'],f['path']
checked=json.loads((repo/'docs/verification/TICKET-036/checked-inputs.json').read_text())
for path,h in checked.items():
 b=(repo/path).read_bytes()
 assert len(b)==h['size'] and hashlib.sha256(b).hexdigest()==h['sha256'],path
 assert subprocess.check_output(['git','show','7d3655dbcf750ec057998855d743b9d316b4f927:'+path],cwd=repo)==b,path
root=Path(tempfile.mkdtemp(prefix='geo037-utility-')).resolve()
shutil.copytree(repo/'examples',root/'fixture')
base={'provider':'fictional-provider','surface':'api','model':'fictional-model-a','locale':'en-GB','observedAt':'2026-10-18T10:00:00Z','example':True}
qa='How can I save daily journal entries?';qb='Which journal supports sharing?';qc='Does it work offline?'
rows=[
 dict(base,id='a-success',query=qa,status='success',answer='Example Journal saves daily entries.',citations=['https://example.com/features/daily-notes']),
 dict(base,id='a-error',query=qa,status='error',error='Fictional collection timeout'),
 dict(base,id='b-success',query=qb,status='success',answer='Other Journal may be relevant.',citations=['https://other.example/features']),
 dict(base,id='c-error',query=qc,status='error',error='Fictional collection error'),
 dict(base,id='other-context-a',query=qa,status='success',answer='Other Journal may be relevant.',citations=[],model='fictional-model-b')]
swapped=copy.deepcopy(rows)
for row in swapped:
 if row['query']==qa:row['query']=qb
 elif row['query']==qb:row['query']=qa
raws={'baseline':''.join(json.dumps(x)+'\n' for x in rows).encode(),'swapped':''.join(json.dumps(x)+'\n' for x in swapped).encode(),'empty':b''}
initial={};reports={};commands=[]
node=shutil.which('node');assert node
runtime=subprocess.check_output([node,'--version'],text=True).strip()
for label,raw in raws.items():
 source=root/(label+'.jsonl');source.write_bytes(raw);initial[label]=hashlib.sha256(raw).hexdigest()
 output=root/(label+'-report')
 command=[node,str(installed/'dist/src/cli.js'),'visibility','--config',str(root/'fixture/.geo/config.yaml'),'--input',str(source),'--output',str(output)]
 r=subprocess.run(command,cwd=root,capture_output=True)
 receipt={'command':command,'cwd':str(root),'exitCode':r.returncode,'runtime':runtime,'at':datetime.datetime.now(datetime.timezone.utc).isoformat()}
 (receipts/(label+'.receipt.json')).write_text(json.dumps(receipt,indent=2)+'\n')
 (receipts/(label+'.stdout.txt')).write_bytes(r.stdout);(receipts/(label+'.stderr.txt')).write_bytes(r.stderr)
 assert r.returncode==0,(label,r.stderr)
 doc=json.loads((output/'visibility.json').read_bytes());reports[label]=doc
 assert doc['example'] is True
 assert (output/'evidence/responses.jsonl').read_bytes()==raw
 assert source.read_bytes()==raw and doc['data']['sha256']==initial[label]
 for filename in ['visibility.json','visibility.md']:
  shutil.copyfile(output/filename,receipts/(label+'.'+filename))
 (receipts/(label+'.jsonl')).write_bytes(raw);commands.append(receipt)
a=reports['baseline']['data'];b=reports['swapped']['data']
assert a['totals']==b['totals'] and a['groups']==b['groups']
assert a['totals']['attempted']==5 and a['totals']['successful']==3 and a['totals']['failed']==2
assert a['totals']['mentionRate']==a['totals']['citationRate']==1/3
assert len(a['groups'])==2 and set(a)=={'totals','groups','source','evidence','sha256'}
assert reports['empty']['data']['totals']['attempted']==0 and reports['empty']['data']['groups']==[]
assert reports['empty']['data']['totals']['mentionRate'] is None
observation={'main':'7d3655dbcf750ec057998855d743b9d316b4f927','runtime':runtime,'root':str(root),'execution':'Unchanged immutable T036 installed CLI; all 25 installed identities and all 35 current/main source inputs checked','inputDigestsBeforeConsumption':initial,'commands':commands,'baselineTotals':a['totals'],'baselineGroups':a['groups'],'baselineDataKeys':list(a),'questionLabelsSwapChangesAggregates':False,'inference':'Current aggregate output is correct. A user must manually inspect raw answers to discover which supplied question has owned-host citations, absent mentions, or only collection errors. A per-question breakdown could reduce that manual work.','limits':['Fictional inputs only; no market demand, live collection or growth claim','Swapped labels do not prove existing behavior is a defect','Question and collection context identities remain supplied, not independently authenticated']}
(receipts/'observations.json').write_text(json.dumps(observation,indent=2)+'\n')
shutil.copyfile(__file__,receipts/'discovery-harness.py')
print(json.dumps({'root':str(root),'runtime':runtime,'actualOutcomes':len(commands),'totals':a['totals'],'dataKeys':list(a),'aggregatesEqualAfterQuestionSwap':True},indent=2))
