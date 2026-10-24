# VYZO Studio — Registro de validação

**Data:** 23/10/2026 (fuso Brasil)

## Testes realizados

- Análise sintática de `app.js` e `data.js` com Node.js: aprovados.
- Navegação de demonstração em Chromium com HTML/CSS/JS da implementação injetados em documento isolado.
- Verificações de largura em 320, 390, 768, 1024, 1440 e 1920 px: sem rolagem horizontal nas páginas verificadas.
- Filtro de sites: reduziu seis projetos a três, conforme esperado.
- Detalhamento: modal abre, mostra conteúdo e fecha com Escape.
- Formulário: validado com campos preenchidos e mensagem de briefing gerada no navegador, sem submissão HTTP.
- Menu mobile: abertura e fechamento após clique na navegação.
- Contagem do catálogo: quatro serviços e seis entradas de portfólio.
- Verificação estática dos IDs e âncoras da página: sem IDs duplicados nem âncoras internas quebradas.
- Em todos os viewports testados: nenhum erro JavaScript no console capturado pela simulação.

## Limitações que exigem checagem após publicação

- O ambiente de automação bloqueou a navegação por URL local e externa. Os testes executaram os arquivos em uma página isolada com o código injetado. Isso não equivale a testar o domínio GitHub Pages.
- Imagens remotas da HAUS e Luence não foram carregadas no ambiente isolado; devem ser conferidas no domínio público. O site mostra um fallback visual quando o conteúdo remoto não puder ser acessado.
- Links de Instagram Direct usam o formato oficial `https://ig.me/m/vyzo_std`, mas a experiência depende do aplicativo e pode variar em navegadores desktop. O perfil público é alternativa disponível.
- A cópia ao clipboard depende de contexto seguro/permissão do navegador; há alternativa com seleção manual.
- Não foram efetuados envios de mensagens reais nem testes de integração de agendamentos de sites de terceiros.
- Não foi conduzida auditoria completa WCAG com usuários reais.

## Transparência do portfólio

- O material visual da GNG foi extraído de apresentação existente e pode ser de uma versão anterior do projeto.
- Para a HAUS e a Luence, o site referencia mídias genuínas dos projetos publicados, não screenshots criadas artificialmente.
- As peças da própria VYZO estão identificadas como trabalhos internos da marca.
- Não há resultados comerciais, depoimentos, certificações ou premiações inventados.
