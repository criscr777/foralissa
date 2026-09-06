# Para Alissa

Site romântico mobile-first, inspirado no template enviado: 16 páginas visuais em formato de livro, cada uma ocupando a tela inteira e avançando com rolagem vertical `scroll-snap`, seguidas de uma página final de pedido de namoro.

## Fluxo

1. Abra a raiz do site.
2. Digite a data secreta configurada em `entrada-especial/script.js` (`19072026` por padrão).
3. Toque em **abrir nossa história**.
4. Deslize para baixo para passar pelas páginas.
5. Na última tela, responda ao pedido de namoro.

## Trocar as fotos

As páginas ficam em `entrada-especial/memories.html`. Cada imagem possui um `src` visível e comentável no código. Substitua a URL por um arquivo seu, por exemplo:

```html
<img src="../assets/images/foto-01.jpg" alt="Descrição da foto" />
```

O diretório `assets/images/` já está preparado. As imagens atuais são placeholders remotos para que o layout continue visível antes de você inserir as fotos reais.

## Trocar a data secreta

Edite apenas esta linha em `entrada-especial/script.js`:

```js
const SPECIAL_DATE = '19072026';
```

## Rodar localmente

```bash
python3 -m http.server 4173
```

Depois abra `http://localhost:4173`.

## Arquivos principais

- `entrada-especial/index.html` — entrada e teclado da data
- `entrada-especial/entry.css` — visual mobile da entrada
- `entrada-especial/script.js` — validação e desbloqueio
- `entrada-especial/memories.html` — as 16 páginas visuais e o pedido final
- `entrada-especial/styles.css` — composição original do template
- `entrada-especial/book-polish.css` — ajustes finais de legibilidade e responsividade
- `entrada-especial/book.js` — animação de entrada das páginas e resposta do pedido
