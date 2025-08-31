(function(){
  const { $, log, play } = window.SC_UTILS;
  const { fetchOdds, renderOdds } = window.SC_ODDS;

  window.addEventListener('DOMContentLoaded', () => {
    const btnOdds = $('btnOdds');
    const league = $('league');
    const oddsTable = $('oddsTable');
    const tgToggle = $('tgToggle');
    const processToggle = $('processToggle');

    btnOdds.addEventListener('click', async () => {
      btnOdds.disabled = true; btnOdds.textContent = 'Carregando...';
      try {
        const data = await fetchOdds(league.value);
        renderOdds(oddsTable, data || []);
        log('ODDS: carregadas', (data||[]).length, 'eventos');
      } finally {
        btnOdds.disabled = false; btnOdds.textContent = 'Carregar Odds';
      }
    });

    tgToggle.addEventListener('change', (e)=> {
      window.SC_TG.setEnabled(e.target.checked);
      log('Telegram:', e.target.checked ? 'ON' : 'OFF');
    });

    processToggle.addEventListener('change', (e)=> {
      window.SC_ROULETTE.setProcessing(e.target.checked);
      log('Processar Entradas:', e.target.checked ? 'ON' : 'OFF');
    });

    $('playClick').addEventListener('click', ()=> play('sndClick'));
    $('playAlert').addEventListener('click', ()=> play('sndAlert'));

    log('App pronto.');
  });
})();
