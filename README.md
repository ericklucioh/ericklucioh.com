# ericklucioh.com

Portfólio pessoal construído com Next.js e export estático. O site concentra
apresentação profissional, projetos em MDX, blog técnico bilíngue e uma página
de links para compartilhamento rápido.

## Stack

- Next.js App Router
- React + TypeScript
- Tailwind CSS
- MDX com componentes customizados
- Export estático (`output: "export"`)

## Estrutura

- `src/app`: rotas e layouts do site
- `src/components`: interface, layout e componentes MDX
- `src/lib`: i18n, metadata, leitura de conteúdo e compilação MDX
- `content/posts`: posts do blog em PT/EN
- `content/projects`: case studies de projetos em PT/EN
- `public`: assets estáticos, PDFs e imagens OG

## Rodando localmente

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Qualidade

```bash
npm run lint
npm run build
```

## Build estático

O projeto gera saída estática em `out/`.

```bash
npm run build
npm run preview
```

`npm run preview` sobe um servidor local apontando para `out/`, que é a forma
certa de validar o build exportado.

## Conteúdo

Os posts e projetos ficam em MDX, separados por idioma:

- `content/posts/<slug>/pt.mdx`
- `content/posts/<slug>/en.mdx`
- `content/projects/<slug>/pt.mdx`
- `content/projects/<slug>/en.mdx`

Cada arquivo define frontmatter com metadados e usa componentes reutilizáveis
como `Callout`, `MetricGrid`, `Figure` e `Mermaid`.

## Deploy

O site foi configurado para export estático, então pode ser publicado em
ambientes simples de hosting estático, CDN ou edge storage sem runtime Node.
