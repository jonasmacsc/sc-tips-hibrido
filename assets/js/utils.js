(function(){
  const $ = (id) => document.getElementById(id);
  const logEl = () => $('log');

  function log(...args){
    try{
      const line = args.map(a => typeof a==='string' ? a : JSON.stringify(a)).join(' ');
      logEl().textContent += line + "\n";
      logEl().scrollTop = logEl().scrollHeight;
      console.log('[SC][LOG]', ...args);
    }catch(e){}
  }

  function fmtTime(ts){ try { return new Date(ts).toLocaleString(); } catch(e){ return '–'; } }
  function play(id){ const el = document.getElementById(id); if(el) el.play().catch(()=>{}); }
  function setText(id, txt){ const el = document.getElementById(id); if(el) el.textContent = txt; }
  function prependHistory(n){
    const box = document.getElementById('history'); if(!box) return;
    const tag = document.createElement('div');
    tag.className = 'badge';
    tag.textContent = n;
    box.prepend(tag);
    while(box.children.length>24){ box.removeChild(box.lastChild); }
  }

  window.SC_UTILS = { $, log, fmtTime, play, setText, prependHistory };
})();
