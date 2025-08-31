(function(){
  const { log, setText, fmtTime, prependHistory, play } = window.SC_UTILS;
  let process = true;

  function onTick(data){
    if(!process) return;
    const { number, platform, dealer, at } = data;
    if (typeof number !== 'number') return;
    setText('lastNumber', String(number));
    setText('dealer', dealer || '–');
    setText('platform', platform || '–');
    setText('updated', fmtTime(at || Date.now()));
    prependHistory(number);
    play('sndClick');
    log('[ROULETTE]', data);
  }
  function setProcessing(v){ process = !!v; }

  window.addEventListener('SC_LIVE_UPDATE', (e)=> onTick(e.detail));
  try { new BroadcastChannel('sc-live').addEventListener('message', (e)=> onTick(e.data)); }catch(e){}
  window.SC_ROULETTE = { onTick, setProcessing };
})();

// Estratégias no fluxo
(function(){
  function onSpinForStrategies(n){
    if (window.SC_STRATS && window.SC_STRATS.elite2x){
      window.SC_STRATS.elite2x.onSpin(n);
    }
  }
  const _origOnTick = window.SC_ROULETTE.onTick;
  window.SC_ROULETTE.onTick = function(data){
    _origOnTick.call(window.SC_ROULETTE, data);
    if (typeof data?.number === 'number') onSpinForStrategies(data.number);
  };
})();
