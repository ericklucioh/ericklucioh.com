# Plano do site (portfolio)

Esta pasta é pra anotações e planejamento em Markdown.

## Objetivo

Converter visitas em contato/recrutador:

- clareza de posicionamento (o que você faz)
- prova (projetos + resultados)
- confiança (experiência, stack, links)
- CTA (contato) em todos os lugares

## Estrutura sugerida (MVP)

- `/` Home (curta, focada em conversão)
- `/about` About (texto + experiência + skills)
- `/projects` lista de projetos
- `/projects/[slug]` case study (1 página por projeto)
- `/contact` opcional (pode ser só CTA na home)

## Conteúdo que “vende”

- Headline: cargo alvo + especialidade + stack (1 linha)
- 2 CTAs: `Email` e `LinkedIn` (GitHub como 3º)
- 3–6 projetos curados com:
    - Contexto (o que era)
    - Sua contribuição (o que você fez)
    - Impacto (números quando tiver)
    - Stack
    - Tradeoffs/decisões (2–4 bullets)
- Experiência: bullets de entrega/impacto (não “tarefas”)
- Skills: agrupadas (Backend, Dados, Cloud, Observabilidade, DevOps)
- “Disponível para”: remoto/híbrido, tipo de vaga, localização, idiomas

## Idiomas (pt/en)

Como o site hoje é `output: 'export'`, o caminho mais simples e robusto é duplicar rotas por idioma:

- `/pt/...` (padrão)
- `/en/...`

Implementação recomendada (App Router):

- `src/app/[lang]/...` com `lang` = `pt` | `en`
- `generateStaticParams()` retornando `[{ lang: "pt" }, { lang: "en" }]`
- Um “dicionário” simples por página (objeto TS) ou arquivos JSON
- Toggle de idioma que troca a rota preservando o path quando existir

Alternativa ainda mais simples (sem `dynamic route`):

- pastas separadas `src/app/pt` e `src/app/en`

## Design/UX (o que reforça valor)

- Header fixo com: Home / About / Projects / Linktree + toggle tema + idioma
- “Project cards” com borda/gradiente azul sutil + tags + link
- Case study com seções padronizadas (fica fácil escrever)
- Performance/SEO:
    - metadata por página (título/descrição)
    - OpenGraph por projeto
    - sitemap/robots (se quiser depois)

## Próximos passos (ordem)

1. Definir cargo alvo (Backend / Backend+IA / Fullstack)
2. Escolher 3 projetos (mesmo internos; pode anonimizar)
3. Escrever 1 case study completo (template em `plan/templates/`)
4. Criar página `/projects` + cards
5. Criar Home curta com CTA e prova
6. Adicionar i18n (pt/en) e traduzir o essencial
