// Listener de roleta — recebe do Userscript via BroadcastChannel e CustomEvent
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

    // Sons/alerts básicos: customize conforme estratégias
    play('sndClick');

    // Exemplo de alerta Telegram opcional (descomente para usar sempre)
    // window.SC_TG.sendTG(`🎲 ${platform?.toUpperCase() || 'ROULETTE'} • Nº ${number}${dealer ? ' • ' + dealer : ''}`);

    log('[ROULETTE]', data);
  }

  function setProcessing(v){ process = !!v; }

  // Hooks de entrada
  window.addEventListener('SC_LIVE_UPDATE', (e)=> onTick(e.detail));
  try {
    const chan = new BroadcastChannel('sc-live');
    chan.addEventListener('message', (e)=> onTick(e.data));
  } catch(e){ log('BroadcastChannel indisponível'); }

  window.SC_ROULETTE = { onTick, setProcessing };
})();
