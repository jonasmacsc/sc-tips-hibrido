(function(){
  const { log, play } = window.SC_UTILS;
  const BASE=[2,12,22,32], PROT=[0];
  const state={active:false,ttlSpins:0,greens:0,reds:0,lastOutcome:'-'};
  const terminal = n => n%10;

  function uiRender(){
    const box=document.getElementById('strat-elite2x'); if(!box) return;
    box.querySelector('[data-f=active]').textContent=state.active?'ON':'OFF';
    box.querySelector('[data-f=ttl]').textContent=state.ttlSpins;
    box.querySelector('[data-f=greens]').textContent=state.greens;
    box.querySelector('[data-f=reds]').textContent=state.reds;
    box.querySelector('[data-f=last]').textContent=state.lastOutcome;
    box.querySelector('[data-f=nums]').textContent=[...BASE,...PROT].join(', ');
  }
  function resetWindow(){ state.active=false; state.ttlSpins=0; state.lastOutcome='-'; uiRender(); }

  function onSpin(number){
    if(terminal(number)===4||terminal(number)===5){ state.active=true; state.ttlSpins=3; play('sndAlert'); log('[Elite2X] Gatilho'); }
    if(state.active){
      if(BASE.includes(number)||PROT.includes(number)){ state.greens++; state.lastOutcome='GREEN'; play('sndGreen'); resetWindow();}
      else{ state.ttlSpins--; if(state.ttlSpins<=0){ state.reds++; state.lastOutcome='RED'; play('sndRed'); resetWindow(); } }
    }
    uiRender();
  }
  window.SC_STRATS=window.SC_STRATS||{}; window.SC_STRATS.elite2x={onSpin};
})();
