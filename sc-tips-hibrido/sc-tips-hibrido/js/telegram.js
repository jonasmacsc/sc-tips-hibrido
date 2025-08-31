(function(){
  const { log } = window.SC_UTILS;
  const env = window.SC_ENV || {};
  let enabled = !!env.TELEGRAM_ENABLED_DEFAULT;

  async function sendTG(text){
    if(!enabled) return;
    if(!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID){
      log('TG: faltando BOT_TOKEN/CHAT_ID em env.js');
      return;
    }
    const url = `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`;
    try{
      const res = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, text })
      });
      if(!res.ok) log('TG: falha HTTP', res.status);
    }catch(e){ log('TG: erro', e.message); }
  }

  function setEnabled(v){ enabled = !!v; }

  window.SC_TG = { sendTG, setEnabled };
})();
