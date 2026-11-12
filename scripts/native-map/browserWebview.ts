// The desktop preview owns <webview>. In a website the Electron host is
// unavailable, so fill that host with the original live webpage.
// No map or preview React component is replaced by this adapter.
export function installBrowserWebview(){
 const connect=(host:HTMLElement)=>{
  if(host.dataset.tourWebview)return;
  host.dataset.tourWebview='true';
  const frame=document.createElement('iframe');
  frame.title=host.getAttribute('aria-label')||'Project reference';
  frame.src=host.getAttribute('src')||'about:blank';
  frame.referrerPolicy='strict-origin-when-cross-origin';
  frame.allow='fullscreen';
  frame.addEventListener('load',()=>host.dispatchEvent(new Event('did-finish-load')));
  host.append(frame);
 };
 const observer=new MutationObserver(records=>{
  for(const record of records)for(const node of record.addedNodes){
   if(!(node instanceof HTMLElement))continue;
   if(node.tagName.toLowerCase()==='webview')connect(node);
   node.querySelectorAll<HTMLElement>('webview').forEach(connect);
  }
 });
 observer.observe(document.documentElement,{childList:true,subtree:true});
 return()=>observer.disconnect();
}
