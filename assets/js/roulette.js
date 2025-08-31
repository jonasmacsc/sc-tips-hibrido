// Estratégias no fluxo
(function(){
  function onSpinForStrategies(n){
    try{
      if (window.SC_STRATS){
        window.SC_STRATS.elite2x?.onSpin(n);
        window.SC_STRATS.quarta?.onSpin(n);

        // Exemplo: mandar sugestão quando houver janela ativa (descomentando abaixo)
        // const sug1 = window.SC_STRATS.elite2x?.getSuggestion?.();
        // const sug2 = window.SC_STRATS.quarta?.getSuggestion?.();
        // if (sug1) window.SC_TG?.sendTG?.(`🎯 ${sug1.label}: ${sug1.numbers.join(', ')} (prot:${sug1.protection.join(',')})`);
        // if (sug2) window.SC_TG?.sendTG?.(`🎯 ${sug2.label}: ${sug2.numbers.join(', ')} (prot:${sug2.protection.join(',')})`);
      }
    }catch(e){}
  }

  const _origOnTick = window.SC_ROULETTE.onTick;
  window.SC_ROULETTE.onTick = function(data){
    _origOnTick.call(window.SC_ROULETTE, data);
    if (typeof data?.number === 'number'){
      onSpinForStrategies(data.number);
    }
  };
})();
