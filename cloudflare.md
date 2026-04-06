# Next.js no Cloudflare Workers (SSR) — Resumo prático

## 🧠 O que é

Rodar um app Next.js **sem `output: 'export'`** usando SSR dentro do Cloudflare Workers.

👉 Em vez de:

- gerar HTML estático (SSG)

👉 Você passa a:

- gerar HTML por request (SSR)
- rodar lógica no edge (Workers)

---

## ⚙️ Como funciona

Fluxo:

Next build
→ OpenNext (adapter)
→ transforma build
→ Cloudflare Workers executa SSR

---

## 🔧 Como migrar (passo a passo)

### 1. Remover static export

```js
// next.config.js
// ❌ remover isso
output: 'export'
2. Instalar dependências
npm install @opennextjs/cloudflare
npm install -D wrangler
3. Criar config do OpenNext
// open-next.config.ts
import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig();
4. Criar config do Wrangler
// wrangler.jsonc
{
  "name": "meu-app",
  "main": ".open-next/worker.js",
  "compatibility_date": "2026-04-05",
  "assets": {
    "directory": ".open-next/assets"
  }
}
5. Scripts no package.json
{
  "scripts": {
    "build": "next build",
    "deploy": "opennextjs-cloudflare build && wrangler deploy"
  }
}
6. Deploy
npx wrangler login
npm run deploy
🧪 Teste de SSR
export default async function Page() {
  return <div>{new Date().toISOString()}</div>;
}

👉 Se mudar a cada request → SSR funcionando

⚠️ O que muda
❌ Não pode usar
fs
path
child_process
⚠️ Pode quebrar
libs Node-only
ORMs pesados
libs com socket direto
⚙️ Limites do runtime
CPU limitada por request
sem processos longos
sem background jobs contínuos
✅ O que NÃO muda
componentes React
estrutura do Next (app/pages)
hooks
UI
maior parte do código frontend

👉 ~80–90% do código continua igual

⚖️ Quando vale a pena
✅ Use SSR no Workers se:
precisa de edge/global
precisa de SSR leve
quer reduzir latência global
❌ Evite se:
app pesado (CPU)
depende muito de Node
quer simplicidade
```
