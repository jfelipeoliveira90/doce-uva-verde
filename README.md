# Doce Uva Verde — site

Site institucional e de encomendas para a confeitaria artesanal **Doce Uva Verde**, feito em HTML, CSS e JavaScript puros (sem build, sem dependências). A inspiração de estrutura é o site da Magnolia Bakery: hero com chamada para pedido, destaques do cardápio, história da marca, como encomendar e contato/WhatsApp.

## Como abrir

Basta abrir `index.html` no navegador (duplo clique). Não precisa de servidor nem de `npm install`.

Para servir localmente (opcional):

```bash
python3 -m http.server 8080
# http://localhost:8080
```

## Estrutura

```
doce-uva-verde/
├── index.html          # home: hero, favoritos, história, como encomendar, kits, Instagram
├── cardapio.html       # cardápio com filtros por categoria
├── sobre.html          # história da marca, valores e processo
├── contato.html        # canais de contato, formulário de pedido e FAQ
├── assets/
│   ├── css/style.css   # design system e layout (tokens no topo do arquivo)
│   ├── js/main.js      # menu mobile, animações, filtros, FAQ, formulário → WhatsApp
│   ├── fonts/          # Cormorant Garamond, Parisienne e Jost (self-hosted)
│   └── img/            # logo (PNG com fundo transparente), favicon e ilustrações SVG
└── README.md
```

## O que trocar antes de publicar

1. **WhatsApp (obrigatório).** Em `assets/js/main.js`, no topo:

   ```js
   const BRAND = {
     whatsapp: "5511999999999",       // 55 + DDD + número, só dígitos
     whatsappLabel: "(11) 99999-9999", // como aparece no site
     instagram: "https://www.instagram.com/doceuvaverde/",
   };
   ```

   Todos os botões `data-wa` do site usam esses valores automaticamente.

2. **Preços do cardápio.** Em `cardapio.html`, cada item tem um bloco
   `menu-item__price` com valor de referência. Ajuste os valores (ou troque por
   "Sob orçamento"). O aviso de "valores de referência" já está no fim da página.

3. **Textos institucionais.** A história em `sobre.html` e a seção "Nossa
   história" da home foram escritas a partir do posicionamento do logo
   (confeitaria artesanal, uvas verdes). Revise para refletir a história real
   da marca — não há datas, prêmios ou depoimentos inventados.

4. **Horários e entrega.** "Segunda a sábado, 9h às 18h" e "entrega/retirada
   com hora marcada" aparecem no rodapé, no contato e na home. Ajuste conforme
   a operação real.

5. **Domínio / redes.** O link do Instagram já aponta para `@doceuvaverde`
   (como no logo). Se houver e-mail, adicione na página de contato.

## O que já está pronto

- Layout responsivo (desktop, tablet e celular), menu mobile acessível.
- Paleta e tipografia derivadas do logo: creme, terracota, verde-uva e rosa.
- Logo tratado: fundo branco/quadriculado removido, PNG com transparência.
- Ilustrações SVG originais dos doces (sem fotos genéricas de banco de imagens).
- Todos os CTAs levam ao WhatsApp com mensagem pré-preenchida (e mensagem
  específica por produto no cardápio).
- Formulário de pedido monta a mensagem no WhatsApp (nome, contato, ocasião,
  data, nº de pessoas, detalhes). Nada é enviado sem o cliente confirmar.
- Filtros de categoria no cardápio, com link direto (`cardapio.html#kits`).
- FAQ com acordeão, animações de entrada e respeito a `prefers-reduced-motion`.
- SEO básico: títulos, descrições, Open Graph, favicon.

## Publicação

O site é estático — funciona em qualquer hospedagem:

- **Netlify / Vercel / Cloudflare Pages:** arraste a pasta ou conecte o repo
  (sem build command; publish directory = raiz).
- **GitHub Pages:** publique a pasta em um repositório e ative Pages.
- **Hospedagem tradicional:** envie os arquivos por FTP para `public_html`.

## Observação sobre imagens

As ilustrações são vetores (SVG) desenhados para esta marca, o que mantém o site
leve e consistente. Quando houver fotos reais dos doces, basta substituir os
`<img src="assets/img/il-*.svg">` por fotos e manter as classes (o layout já
recorta em arco nos cards e no bloco de história).
