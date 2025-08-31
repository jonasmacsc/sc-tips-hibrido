// === Estratégias — Elite 2X + Quarta Dimensão ===
// Mostrar apenas números base (+ proteção 0). Vizinhos implícitos no Race.
// Ambas com janela padrão de 3 giros após gatilho.

(function(){
  const { log, play } = window.SC_UTILS;

  function makeTerminalStrategy(opts){
    const { id, label, base, prot, triggerTerminals, uiRootId, windowSpins=3 } = opts;
    const state = { active:false, ttlSpins:0, greens:0, reds:0, lastOutcome:'-' };

    const terminal = (n) => (typeof n==='number') ? (n % 10) : null;
    const hit = (n) => base.includes(n) || prot.includes(n);

    function uiRender(){
      const box = document.getElementById(uiRootId); if(!box) return;
      box.querySelector('[data-f=active]').textContent = state.active ? 'ON' : 'OFF';
      box.querySelector('[data-f=ttl]').textContent = String(state.ttlSpins);
      box.querySelector('[data-f=greens]').textContent = String(state.greens);
      box.querySelector('[data-f=reds]').textContent = String(state.reds);
      box.querySelector('[data-f=last]').textContent = state.lastOutcome;
      box.querySelector('[data-f=nums]').textContent = [...base, ...prot].join(', ');
    }
    function resetWindow(){ state.active=false; state.ttlSpins=0; state.lastOutcome='-'; uiRender(); }

    function onSpin(number){
      // 1) Gatilho por terminais
      const t = terminal(number);
      if (triggerTerminals.includes(t)){
        state.active = true;
        state.ttlSpins = windowSpins;
        play('sndAlert');
        log(`[${label}] Gatilho por terminal ${t} — janela ${state.ttlSpins}`);
      }

      // 2) Avaliação enquanto ativo
      if (state.active){
        if (hit(number)){
          state.greens++; state.lastOutcome='GREEN'; play('sndGreen');
          log(`[${label}] GREEN no número ${number}`);
          resetWindow(); // take imediato
        } else {
          state.ttlSpins--;
          if (state.ttlSpins <= 0){
            state.reds++; state.lastOutcome='RED'; play('sndRed');
            log(`[${label}] RED — encerrou janela sem acerto`);
            resetWindow();
          } else {
            log(`[${label}] Aguardando... TTL: ${state.ttlSpins}`);
          }
        }
      }
      uiRender();
    }

    function getSuggestion(){ return state.active ? { label, numbers: base, protection: prot } : null; }

    return { id, label, onSpin, getSuggestion, getState: () => ({...state}) };
  }

  // === Elite 2X === (gatilho: terminais 4/5; base 2,12,22,32; prot 0)
  const elite2x = makeTerminalStrategy({
    id:'elite2x',
    label:'Elite 2X',
    base:[2,12,22,32],
    prot:[0],
    triggerTerminals:[4,5],
    uiRootId:'strat-elite2x',
    windowSpins:3
  });

  // === Quarta Dimensão === (gatilho: terminais 1/3; base 4,14,24,34; prot 0)
  const quarta = makeTerminalStrategy({
    id:'quarta',
    label:'Quarta Dimensão',
    base:[4,14,24,34],
    prot:[0],
    triggerTerminals:[1,3],
    uiRootId:'strat-quarta',
    windowSpins:3
  });

  // Expor
  window.SC_STRATS = { elite2x, quarta };
})();
