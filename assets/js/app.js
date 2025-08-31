(function(){
  const { $, log, play } = window.SC_UTILS;
  const { fetchOdds, renderOdds } = window.SC_ODDS;

  window.addEventListener('DOMContentLoaded', () => {
    const btnOdds=$('btnOdds'),league=$('league'),oddsTable=$('oddsTable');
    const tgToggle=$('tgToggle'),processToggle=$('processToggle');

    btnOdds.addEventListener('click', async ()=>{
      btnOdds.disabled=true; btnOdds.textContent='Carregando...';
      const data=await fetchOdds(league.value); renderOdds(oddsTable,data||[]);
      btnOdds.disabled=false; btnOdds.textContent='Carregar Odds';
    });
    tgToggle.addEventListener('change', e=>{ window.SC_TG.setEnabled(e.target.checked); });
    processToggle.addEventListener('change', e=>{ window.SC_ROULETTE.setProcessing(e.target.checked); });
    $('playClick').addEventListener('click', ()=>play('sndClick'));
    $('playAlert').addEventListener('click', ()=>play('sndAlert'));
    log('App pronto.');
  });
})();

// Estratégias no fluxo
(function(){
  function onSpinForStrategies(n){
    if (window.SC_STRATS){
      if (window.SC_STRATS.elite2x) window.SC_STRATS.elite2x.onSpin(n);
      if (window.SC_STRATS.q4d)     window.SC_STRATS.q4d.onSpin(n);   // ← NOVA LINHA
    }
  }
  const _origOnTick = window.SC_ROULETTE.onTick;
  window.SC_ROULETTE.onTick = function(data){
    _origOnTick.call(window.SC_ROULETTE, data);
    if (typeof data?.number === 'number') onSpinForStrategies(data.number);
  };
})();
