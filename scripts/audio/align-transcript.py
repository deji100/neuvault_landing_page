"""Align the supplied wording to ASR-derived word timestamps; preserve every character."""
import difflib, json, re, sys
from pathlib import Path
root=Path(__file__).resolve().parents[2]
target=root/'components/specific/home/capture/audioTranscript.json'
doc=json.loads(target.read_text())
timing=json.loads(Path(sys.argv[1]).read_text())
normalize=lambda text: ''.join(c for c in text.casefold() if c.isalnum())
provided=[]
for block in doc['blocks']:
 block['words']=[{'text':m.group(),'start':None,'end':None} for m in re.finditer(r'\S+\s*',block['text'])]
 provided.extend(block['words'])
spoken=[w for w in timing['words'] if normalize(w['text'])]
matcher=difflib.SequenceMatcher(None,[normalize(w['text']) for w in provided],[normalize(w['text']) for w in spoken],autojunk=False)
exact=0; replacements=0; unresolved=[]
for tag,a,b,c,d in matcher.get_opcodes():
 if tag=='equal':
  for i,j in zip(range(a,b),range(c,d)):
   provided[i]['start']=spoken[j]['start'];provided[i]['end']=max(spoken[j]['end'],spoken[j]['start']+.015);provided[i]['timing']='matched'
   exact+=1
 elif tag=='replace' and b-a<=8 and d-c<=8 and d>c:
  # Small spelling/name variants are still the same spoken phrase. Bound the
  # replacement to the actual acoustic words, without stretching across silence.
  for k,i in enumerate(range(a,b)):
   first=c+int(k*(d-c)/(b-a));last=c+max(int((k+1)*(d-c)/(b-a))-1,int(k*(d-c)/(b-a)))
   provided[i]['start']=spoken[first]['start'];provided[i]['end']=max(spoken[last]['end'],spoken[first]['start']+.015);provided[i]['timing']='phrase-aligned'
   replacements+=1
 elif b>a:
  unresolved.append({'words':b-a,'text':''.join(w['text'] for w in provided[a:b])[:200]})
for block in doc['blocks']:
 timed=[w for w in block['words'] if w['start'] is not None]
 block['start']=min((w['start'] for w in timed),default=None)
 block['end']=max((w['end'] for w in timed),default=None)
 assert ''.join(w['text'] for w in block['words'])==block['text']
doc['duration']=timing['duration']
doc['timingSource']='Local faster-whisper base.en acoustic word timestamps, matched to the supplied transcript. Unmatched words retain null timing.'
doc['alignment']={'words':len(provided),'matched':exact,'phraseAligned':replacements,'untimed':len(provided)-exact-replacements}
target.write_text(json.dumps(doc,ensure_ascii=False,separators=(',',':'))+'\n')
print(json.dumps(doc['alignment']))
print('Untimed spans:',json.dumps(unresolved[:15],ensure_ascii=False))
