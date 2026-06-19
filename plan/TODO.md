# TODO — Portfolio ericklucioh.com

> Decisões: i18n em `/pt` e `/en`; linktree vira `/links`; blog fica pra depois.

## P0 — MVP (não parecer vazio + pronto pra contratar)

- [ ] Definir “cargo alvo” (uma linha): Backend | Backend+IA | Fullstack
- [ ] Definir CTAs principais: Email + LinkedIn (GitHub como opcional)
- [ ] Home (resumo) em `/pt` e `/en`
    - [ ] Headline + subheadline (2–3 linhas)
    - [ ] 3 cards “Highlights” (Backend/APIs, Dados, IA/RAG) com bullets específicos
    - [ ] CTA fixo no final (contato)
- [ ] About em `/pt/about` e `/en/about`
    - [ ] Reescrever para impacto (o que entregou / resultado), não só descrição
    - [ ] Skills agrupadas (Backend, Dados, Cloud, Observabilidade/DevOps)
    - [ ] “Disponível para” (remoto/híbrido, localização, tipo de vaga)
- [ ] Projects em `/pt/projects` e `/en/projects` (mesmo sem publicar ainda)
    - [ ] 3–6 cards placeholder (título + 1 linha problema + stack + status “em breve”)
    - [ ] Deixar espaço pra “case study” (rota futura `/projects/[slug]`)
- [ ] Links em `/pt/links` e `/en/links` (ex-linktree)
    - [ ] Ajustar menu pra apontar pra `/pt` e `/en` e pra `/links`
- [ ] CV para download
    - [ ] `public/cv/Erick-Lucio-CV-PT.pdf`
    - [ ] `public/cv/Erick-Lucio-CV-EN.pdf`
    - [ ] Botão “Baixar CV” no menu/hero (não como CTA #1)
- [ ] Menu / Navegação
    - [ ] Remover/ocultar itens não existentes (ex: blog/contato) ou criar placeholders claros
    - [ ] Adicionar toggle de idioma (pt/en) que preserva path quando existir
- [ ] SEO mínimo
    - [ ] `metadata` por idioma (title/description coerentes)
    - [ ] OpenGraph básico (site) e favicon ok

## P1 — “Prova” (aumenta confiança)

- [ ] 1 case study completo (mesmo de projeto interno/anônimo)
- [ ] Página de projeto `/projects/[slug]` (pt/en pelo menos no resumo)
- [ ] Seção “Experiência” mais escaneável (timeline/cards)
- [ ] “Stack” com 6–10 tecnologias (curado) + nível de uso real
- [ ] Ajustar detalhes visuais (acentos azuis consistentes, hover sutil, espaçamento)

## P2 — Blog (quando tiver 2–3 posts)

- [ ] Decidir formato: MDX local (recomendado) vs CMS
- [ ] Rotas `/pt/blog` e `/en/blog`
- [ ] Lista + página de post + tags
- [ ] RSS + sitemap

## Implementação — i18n (nota técnica)

- [ ] Estrutura recomendada: `src/app/(site)/[lang]/...` com `lang = pt | en`
- [ ] `generateStaticParams()` para export estático (pt/en)
- [ ] Se `lang` inválido → `notFound()`
- [ ] `/` redireciona para `/pt` (padrão)

## Checklist rápido (quando publicar projetos)

- [ ] Trocar placeholders por links (repo/demo)
- [ ] Adicionar métricas/impacto (mesmo aproximadas)
- [ ] Print/arquitetura (1 imagem) por projeto
