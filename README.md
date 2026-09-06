# Para Alissa

Site romântico em formato de história vertical, pensado primeiro para celular e inspirado nos templates enviados.

## Como colocar suas fotos

Crie a pasta `assets/images/` e coloque estes arquivos:

- `foto-capa.jpg` — foto da tela da senha
- `foto-01.jpg` — início da história
- `foto-02.jpg`, `foto-03.jpg`, `foto-04.jpg` — galeria
- `foto-05.jpg`, `foto-06.jpg`, `foto-07.jpg` — colagem
- `foto-08.jpg` — foto grande
- `foto-final.jpg` — foto antes do pedido
- `foto-success.jpg` — foto da última página

Os arquivos podem ser `.png` ou `.webp`, mas nesse caso altere a extensão correspondente em `script.js`.

## Vídeo

Crie `assets/videos/` e adicione `video-01.mp4`. A página 8 está preparada para receber a cena em vídeo; para ativar a reprodução do arquivo, substitua o bloco `.video` dessa página por um elemento `<video controls playsinline src="assets/videos/video-01.mp4"></video>`.

## Música

Crie `assets/music/` e coloque `nossa-musica.mp3`. O botão da página 9 controla a reprodução.

## Senha

A senha inicial é `19/07/2026`. A validação aceita também `19072026`.

## Personalização

Os textos das 20 páginas ficam no array `pages` de `script.js`, então é fácil trocar frases, datas e legendas sem alterar o layout.
