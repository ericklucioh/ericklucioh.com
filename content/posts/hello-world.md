---
title: "Hello, Markdown"
date: "2026-04-06"
excerpt: "Primeiro post em Markdown, gerado no build e exportado como HTML estático."
tags:
  - nextjs
  - markdown
  - gfm
---

# Introdução

Esse post vive em `content/posts` e é convertido para HTML durante o build (SSG + `output: "export"`).

Link de exemplo: [ericklucioh.com](https://ericklucioh.com)

**Negrito**, *itálico*, ~~riscado~~ e `inline code`.

## Code block

```ts
export function greet(name: string) {
  return `Hello, ${name}`;
}
```

```bash
echo "shell"
```

```json
{ "ok": true, "count": 3 }
```

### Listas

- Item 1
- Item 2
- Item 3

* Item com asterisco 1
* Item com asterisco 2

1. Primeiro
2. Segundo
3. Terceiro

- [x] Task done
- [ ] Task todo

### Quote e separador

> Isso é um blockquote.
> Segunda linha do quote.

---

### Tabela (GFM)

| Coluna | Valor |
|-------:|:------|
| A      | 1     |
| B      | 2     |

#### Subheading

Texto depois do h4.
