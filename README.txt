NEXBYTE — TECH STORE

Projeto demonstrativo em HTML, CSS e JavaScript puro. Não requer Node.js/npm.

COMO ABRIR
1. Extraia a pasta.
2. Abra index.html no navegador (ou utilize um servidor local simples).

PÁGINAS
- index.html: página inicial e destaques
- catalogo.html: catálogo com busca, filtros laterais e ordenação
- produto.html: detalhes e especificações (?id=...)
- login.html: página personalizável de login/cadastro demonstrativo
- carrinho.html: carrinho demonstrativo
- sobre.html: informações da loja

PERSONALIZAÇÃO
- js/store-config.js: nome, slogan, descrição, cores e URL da API
- js/products.js: produtos, preços, imagens, marcas, especificações e estoque preview
- css/styles.css: identidade visual, componentes e responsividade

CATÁLOGO / API
- js/catalog-api.js: camada adaptadora do catálogo.
- Sem endpoint configurado, o catálogo lê PRODUCTS em js/products.js.
- Para conectar uma API real, informe STORE_CONFIG.productsApiUrl em js/store-config.js.
- A API deve responder JSON como um array de produtos ou { "products": [...] }.
- Os objetos devem conter ao menos id, name, category, brand, price, image, shortDescription e stock.
- O layout foi inspirado em padrões comuns de grandes lojas de hardware: filtros por categoria, faixa de preço, disponibilidade, busca e ordenação. Não utiliza API, marca, imagens ou código proprietário da Pichau.

ESTOQUE DE PREVIEW
Produtos, preços e quantidades locais são fictícios para demonstração.
Não existe integração com fornecedores, ERP, pagamento, frete ou estoque real.
O login e o carrinho utilizam localStorage e não são adequados para produção.
As imagens atuais são URLs externas e exigem conexão com a internet.

FUNCIONALIDADES
- Busca por nome, marca, categoria e especificações
- Filtros de categoria, faixa de preço e disponibilidade
- Ordenação por relevância, preço, nome e quantidade
- Página de detalhes com especificações
- Login/cadastro demonstrativo e carrinho local
- Layout responsivo para desktop e dispositivos móveis

TEMA VISUAL FUTURISTA
- Fundo preto/azul noite, superfícies azul-marinho, azul elétrico e rosa neon em detalhes.
- Login com animação de entrada, fundos luminosos, alternância mostrar/ocultar senha, medidor visual de força no cadastro e microinteração de movimento do cartão.
- Respeita a preferência do sistema por movimento reduzido.
