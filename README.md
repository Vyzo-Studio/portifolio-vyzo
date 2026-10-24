# VYZO Studio — Portfólio comercial interativo

Site oficial com identidade visual da VYZO Studio e portfólio de projetos reais.

## Publicação

Repositório: https://github.com/Vyzo-Studio/portifolio-vyzo

Endereço GitHub Pages (quando o deployment estiver concluído): https://vyzo-studio.github.io/portifolio-vyzo/

O workflow `.github/workflows/pages.yml` publica o conteúdo estático diretamente após alterações na branch `main`.

Se a primeira execução de GitHub Actions solicitar habilitação do Pages: `Settings → Pages → Build and deployment → Source: GitHub Actions`. O arquivo YAML já está configurado para isso.

## Estrutura

- `index.html`: página principal com serviços, portfólio, cases e briefing.
- `styles.css`: design system, layout responsivo e animações.
- `data.js`: lista editável de projetos e serviços.
- `app.js`: interações, filtros, detalhes e fluxo de briefing.
- `assets/`: logo oficial fornecida e imagens preservadas.
- `privacidade.html` e `termos.html`: informações legais.
- `QA.md`: testes realizados, verificações e limitações.

## Alterações de conteúdo

Atualize os objetos de projetos e serviços em `data.js`. Não há backend de envio de mensagens: o formulário prepara um resumo que a pessoa copia e envia pelo Instagram Direct.

Requisitos locais: navegador moderno; não precisa Node.js nem bibliotecas de build.

## Observações

Não foram adicionadas métricas inventadas nem depoimentos. Os projetos HAUS, GNG e Luence são referenciados pelos links públicos dos projetos.
