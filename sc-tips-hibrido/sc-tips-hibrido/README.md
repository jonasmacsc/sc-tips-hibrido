# SC Tips — Pacote Híbrido (Futebol + Roleta)

Este pacote entrega:
- **Futebol/Odds** via *The Odds API* (config em `js/env.js`).
- **Roleta (Evolution/Pragmatic)** via **BroadcastChannel**/`SC_LIVE_UPDATE` (Userscript).
- **Telegram** opcional com toggle no painel (`js/telegram.js`).

## Estrutura
```
sc-tips-hibrido/
  index.html
  assets/
    style.css
    sounds/ (coloque seus MP3 aqui: green.mp3, red.mp3, alert.mp3, click.mp3)
  js/
    env.js          (preencha suas chaves e IDs)
    app.js          (bootstrap geral + UI)
    odds.js         (integração The Odds API)
    roulette.js     (listener da roleta em tempo real)
    telegram.js     (envio de alertas para Telegram)
    utils.js        (funções auxiliares)
  README.md
```

## Passos rápidos
1. Edite `js/env.js` e **preencha**:
   - `ODDS_API_KEY` (The Odds API)
   - `TELEGRAM_BOT_TOKEN` (opcional)
   - `TELEGRAM_CHAT_ID` (opcional)

2. Coloque os audios em `assets/sounds/` com estes nomes:
   - `green.mp3`, `red.mp3`, `alert.mp3`, `click.mp3`

3. Abra `index.html` no navegador (ou publique no Vercel).

4. Instale o **Tampermonkey** e adicione o Userscript (já fornecido na conversa). Ao abrir a mesa (EVO/Pragmatic), os números serão enviados ao **BroadcastChannel** `sc-live` e o painel vai atualizar automaticamente.

## Dica de Vercel
- Crie um projeto novo → importe este diretório.
- `index.html` será a página inicial.
- Se quiser, defina variáveis em `env.js` a partir de secrets, mas para estático basta editar o arquivo.

## Observação
- `The Odds API` possui *free tier* limitada. Use ligas/mercados específicos e cache local se necessário.
