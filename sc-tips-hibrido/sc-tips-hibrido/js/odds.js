// Integração The Odds API (https://the-odds-api.com/)
(function(){
  const { log } = window.SC_UTILS;
  const env = window.SC_ENV || {};

  async function fetchOdds(leagueKey){
    if(!env.ODDS_API_KEY){
      log('ODDS: defina ODDS_API_KEY em js/env.js');
      return [];
    }
    const url = `https://api.the-odds-api.com/v4/sports/${leagueKey}/odds/?regions=eu&markets=h2h&oddsFormat=decimal&apiKey=${env.ODDS_API_KEY}`;
    const res = await fetch(url);
    if(!res.ok){
      log('ODDS: erro HTTP', res.status);
      return [];
    }
    return await res.json();
  }

  function renderOdds(table, data){
    const tbody = table.querySelector('tbody');
    tbody.innerHTML = '';
    data.forEach(evt => {
      const comm = evt.bookmakers?.[0];
      const mk = comm?.markets?.find(m => m.key === 'h2h');
      const [home, away] = evt.home_team && evt.away_team ? [evt.home_team, evt.away_team] : ['-', '-'];
      const [oH, oD, oA] = mk?.outcomes || [];
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${home} vs ${away}</td>
        <td>${oH?.price ?? '-'}</td>
        <td>${oD?.price ?? '-'}</td>
        <td>${oA?.price ?? '-'}</td>
        <td>${evt.commence_time ? new Date(evt.commence_time).toLocaleString() : '-'}</td>`;
      tbody.appendChild(tr);
    });
  }

  window.SC_ODDS = { fetchOdds, renderOdds };
})();
