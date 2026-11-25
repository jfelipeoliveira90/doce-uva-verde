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
├── cardapio.html       # cardápio de docinhos de festa, com filtros por linha
├── sobre.html          # história da marca, valores e processo
├── contato.html        # canais de contato, formulário de pedido e FAQ
├── assets/
│   ├── css/style.css   # design system e layout (tokens no topo do arquivo)
│   ├── js/main.js      # menu mobile, animações, filtros, FAQ, formulário → WhatsApp
│   ├── fonts/          # Cormorant Garamond, Parisienne e Jost (self-hosted)
│   └── img/            # logo, favicon, ilustrações SVG e fotos do cardápio
└── README.md
```

## O que trocar antes de publicar

1. **WhatsApp (obrigatório).** Em `assets/js/main.js`, no topo:

   ```js
   const BRAND = {
     whatsapp: "5511969677316",       // 55 + DDD + número, só dígitos
     whatsappLabel: "(11) 96967-7316", // como aparece no site
     instagram: "https://www.instagram.com/doceuvaverde/",
   };
   ```

   Todos os botões `data-wa` do site usam esses valores automaticamente.

2. **Preços do cardápio.** Em `cardapio.html`, cada linha tem um bloco
   `menu-item__price` com o valor do cento. Os valores atuais vieram do arquivo
   `Cardápio Docinhos de Festa.pdf` (Tradicional R$ 200, Especial R$ 230,
   Personalizados R$ 260, Premium R$ 290). Ajuste aqui quando a tabela mudar.

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
- Fotos reais dos docinhos extraídas do cardápio em PDF, combinadas com as ilustrações SVG da marca.
- Todos os CTAs levam ao WhatsApp com mensagem pré-preenchida (e mensagem
  específica por produto no cardápio).
- Formulário de pedido monta a mensagem no WhatsApp (nome, contato, ocasião,
  data, nº de pessoas, detalhes). Nada é enviado sem o cliente confirmar.
- Filtros por linha no cardápio, com link direto (`cardapio.html#tradicional`, `#especial`, `#personalizados`, `#premium`).
- FAQ com acordeão, animações de entrada e respeito a `prefers-reduced-motion`.
- SEO básico: títulos, descrições, Open Graph, favicon.

## Publicação

O site é estático — funciona em qualquer hospedagem:

- **Netlify / Vercel / Cloudflare Pages:** arraste a pasta ou conecte o repo
  (sem build command; publish directory = raiz).
- **GitHub Pages:** publique a pasta em um repositório e ative Pages.
- **Hospedagem tradicional:** envie os arquivos por FTP para `public_html`.

## Observação sobre imagens

As ilustrações são vetores (SVG) desenhados para esta marca. As fotos das linhas
(`assets/img/menu-*.webp`) foram extraídas do PDF do cardápio, recortadas em
círculo; para trocar, mantenha o mesmo nome e proporção quadrada. O layout já
recorta em arco nos cards e no bloco de história.
