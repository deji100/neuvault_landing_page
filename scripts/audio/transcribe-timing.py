"""Local timing pass; audio stays on this machine. Requires faster-whisper."""
import json, sys, time
from pathlib import Path
from faster_whisper import WhisperModel
source=Path(sys.argv[1]); output=Path(sys.argv[2])
print('Loading English timing model...',flush=True)
model=WhisperModel('base.en',device='cpu',compute_type='int8',cpu_threads=4,download_root='/tmp/neuvault-whisper-models',use_auth_token=False)
print('Model ready. Reading supplied audio locally...',flush=True)
segments,info=model.transcribe(str(source),language='en',beam_size=1,word_timestamps=True,vad_filter=True,condition_on_previous_text=False,initial_prompt='Reality Life with Kate Casey. UConn Huskies. Geno Auriemma. Paige Bueckers. Matthew Hamachek. Erika Sashin.')
words=[]; last=0; started=time.monotonic()
for segment in segments:
 for word in segment.words or []:
  words.append({'text':word.word,'start':round(word.start,3),'end':round(word.end,3),'probability':round(word.probability,3)})
 if segment.end-last>=60:
  last=segment.end;print(f'{segment.end:.0f}/{info.duration:.0f}s aligned; {len(words)} words; {time.monotonic()-started:.0f}s elapsed',flush=True)
  output.write_text(json.dumps({'duration':info.duration,'words':words}))
output.write_text(json.dumps({'duration':info.duration,'words':words}))
print(f'Finished: {len(words)} timed words for {info.duration:.2f}s.',flush=True)
