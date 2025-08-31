(function(){
  const { $, log, play } = window.SC_UTILS;
  const { fetchOdds, renderOdds } = window.SC_ODDS;

  window.addEventListener('DOMContentLoaded', () => {
    const btnOdds=$('btnOdds'),league=$('league'),oddsTable=$('oddsTable');
    const tgToggle=$('tgToggle'),processToggle=$('processToggle');
    const sugToggle=$('sugToggle');

    btnOdds.addEventListener('click', async ()=>{
      btnOdds.disabled=true; btnOdds.textContent='Carregando...';
      try{
        const data=await fetchOdds(league.value);
        renderOdds(oddsTable,data||[]);
        log('ODDS: carregadas', (data||[]).length, 'eventos');
      } finally {
        btnOdds.disabled=false; btnOdds.textContent='Carregar Odds';
      }
    });

    tgToggle.addEventListener('change', e=>{
      window.SC_TG.setEnabled(e.target.checked);
      log('Telegram:', e.target.checked?'ON':'OFF');
    });

    processToggle.addEventListener('change', e=>{
      window.SC_ROULETTE.setProcessing(e.target.checked);
      log('Processar Entradas:', e.target.checked?'ON':'OFF');
    });

    // >>> NOVO: toggle global de sugestões no Telegram
    (function initSugToggle(){
      try{
        const def = !!(window.SC_ENV && window.SC_ENV.SUGGEST_TG_DEFAULT);
        if (typeof def === 'boolean') sugToggle.checked = def;
      }catch(e){}
      sugToggle.addEventListener('change', e=>{
        window.SC_SUG && window.SC_SUG.setTG(e.target.checked);
        log('Sugestões no Telegram:', e.target.checked?'ON':'OFF');
      });
      // inicializa estado no boot
      window.SC_SUG && window.SC_SUG.setTG(!!sugToggle.checked);
    })();

    $('playClick').addEventListener('click', ()=>play('sndClick'));
    $('playAlert').addEventListener('click', ()=>play('sndAlert'));

    log('App pronto.');
  });
})();
