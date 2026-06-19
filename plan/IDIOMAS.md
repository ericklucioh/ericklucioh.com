# Idiomas (pt/en) — proposta prática

## Escopo mínimo

Traduzir:

- Home (headline, bullets, CTA)
- About (resumo, experiência, skills)
- Projects (títulos/descrições curtas)

Deixar em pt por enquanto:

- case studies longos (ou traduzir só 1 primeiro)

## Estrutura de rotas (recomendada)

- `src/app/[lang]/layout.tsx` define `<html lang=...>`
- `src/app/[lang]/page.tsx` (Home)
- `src/app/[lang]/about/page.tsx`
- `src/app/[lang]/projects/page.tsx`
- `src/app/[lang]/projects/[slug]/page.tsx`

Com `generateStaticParams()` em cada segmento que precisa export estático.

## Conteúdo

Modelo simples (por página):

- `const copy = { pt: {...}, en: {...} } as const;`
- Seleciona por `lang` e renderiza

Se crescer:

- mover pra `src/content/i18n/*.json` ou `src/content/i18n/*.ts`

## Toggle de idioma

Regras:

- manter o path: `/pt/about` ↔ `/en/about`
- fallback: se não existir equivalente, manda pra home do idioma
