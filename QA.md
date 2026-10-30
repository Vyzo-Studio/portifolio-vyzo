# VYZO Studio — Checklist editorial e técnico

## Revisão de conteúdo desta atualização

- O portfólio público utiliza exclusivamente ativos VYZO e estudos autorais claramente rotulados.
- As imagens dos projetos privados/de terceiros anteriormente disponíveis foram excluídas da árvore de arquivos atual.
- A vitrine de destaque apresenta exclusivamente o próprio website VYZO.
- O estudo de apresentação utiliza gráficos decorativos; não há métricas nem clientes atribuídos.
- Nenhum trabalho de cliente deve ser divulgado sem autorização expressa.

## Funcionalidades a verificar

- Navegação do cabeçalho e menu mobile;
- Filtros do portfólio (todos, design, web e apresentações);
- Modais de projetos: abrir/fechar, galeria, links e foco do teclado;
- Fluxo do briefing: validação, cópia do texto e link do Instagram;
- Tamanhos 320, 390, 768, 1024, 1440 e 1920 px;
- Preferência de movimento reduzido; contraste; ausência de rolagem horizontal;
- Carregamento das imagens próprias e SVGs;
- Publicação do GitHub Pages.

## Transparência de validação

A atualização remove referências de clientes e reorganiza a vitrine; aprovações de testes
só devem ser registradas depois de executadas. A publicação pelo GitHub Pages e a
renderização visual precisam ser verificadas na versão resultante.

## Privacidade

O formulário não envia dados automaticamente para um backend; o usuário copia o briefing
e decide se deseja encaminhá-lo pelo Instagram.


## Evolução V5 — checklist de regressão

- Baseline antes das alterações: `8b9029fcf7c8e9732a203d3ddd5f9245c8aaa380`
- [x] Carrossel: 4 itens, setas, indicadores, teclado, limites e pré-seleção do serviço. (Arraste: suportado nativamente por CSS, sem teste automatizado de gesto físico.)
- [x] Processo: 6 seletores com painel comum, clique e setas de teclado.
- [x] Briefing: prazo inexistente em HTML, JS e resumo; validação, geração de texto e link do Direct verificados. (A API de transferência real da área de transferência não foi exercitada.)
- [x] Portfólio: filtros, modal, abertura e fechamento verificados. A exibição completa de imagens foi ajustada em CSS; inspeção visual por capturas não incluída na suíte.
- [x] Animação: módulo cinematográfico preservado; teste de revelação única ao voltar ao topo aprovado.
- [x] Mobile/responsividade: 320, 360, 375, 390, 430, 768, 1024, 1366, 1440 e 1920 px sem overflow horizontal nem erros JavaScript detectados.
- [x] Política: sem nomes de clientes não autorizados nos arquivos de código inspecionados nesta atualização.
- [x] GitHub Pages: workflow de publicação conferido no GitHub Actions.


### Evidência de execução V5

- GitHub Actions: [Verificação visual e funcional VYZO](https://github.com/Vyzo-Studio/portifolio-vyzo/actions/runs/40995019307), 16 testes Chromium aprovados (19 s de execução).
- O teste usa um servidor estático local com os arquivos atuais do próprio commit no GitHub Actions.
- Restrições: não prova métricas comerciais, aprovação de design por clientes, impressão em dispositivos físicos nem inspeção do endereço público em navegador remoto. As animações também obedecem a preferência do sistema por movimento reduzido, salvo ativação explícita.
