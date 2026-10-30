# VYZO Studio — Site oficial e portfólio autoral

Repositório público do site oficial da VYZO Studio, disponível em:
https://vyzo-studio.github.io/portifolio-vyzo/

## Política de divulgação

Este site exibe **somente trabalhos próprios da VYZO e estudos conceituais claramente identificados**.
Projetos de clientes não são publicados sem autorização expressa de divulgação.
Não incluir marcas, nomes, imagens, capturas, apresentações comerciais, arquivos ou links de clientes sem essa permissão.

## Estrutura

- `index.html`: apresentação comercial, catálogo de serviços, portfólio autoral e briefing.
- `styles.css`: linguagem visual premium e layout responsivo.
- `data.js`: serviços, itens do portfólio e notas transparentes de cada case.
- `app.js`: filtros, modal com detalhes, menu, animações e briefing.
- `assets/`: identidade oficial da VYZO e previews gráficos próprios.
- `privacidade.html` / `termos.html`: páginas de informação ao visitante.
- `QA.md`: checklist e limitações de testes.

## Sobre os cases

- Identidade, campanha e website: projetos da própria VYZO.
- Apresentação visual: **estudo autoral demonstrativo**, não realizado para cliente.
- A prévia gráfica do website e a apresentação são ilustrativas, não screenshots nem indicadores reais.
- Não há depoimentos, estatísticas, certificações ou clientes inventados.

## Contato

O formulário prepara um resumo textual; o usuário o copia e abre o Instagram Direct.
Não existe envio automático a um servidor nem armazenagem de briefing pelo site.

## Publicação

O workflow `.github/workflows/pages.yml` publica o site estático da branch `main`.
GitHub Pages deve estar configurado para publicar via **GitHub Actions**.


## Evolução V5 — navegação e componentes

- Ponto de recuperação anterior à V5: commit `8b9029fcf7c8e9732a203d3ddd5f9245c8aaa380`.
- Serviços: carrossel manual com CSS scroll-snap, botões anteriores/próximos, indicadores, rolagem por toque e teclado. A opção de serviço continua preparando o briefing.
- Processo: mapa interativo das seis etapas com um único painel de descrição, sem carrossel e sem novas etapas.
- Briefing: removido permanentemente o campo de prazo; nenhum formulário envia dados ao servidor.
- Portfólio: imagens inteiras nos cards e nos detalhes; somente materiais próprios e estudos autorais identificados.
- Revelação cinematográfica: módulo independente preservado no index.html.

