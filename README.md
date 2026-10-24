# VYZO Studio — Site oficial de portfólio

Site comercial responsivo, desenvolvido com HTML, CSS e JavaScript sem etapa de compilação.

## Executar

Abra `index.html` no navegador ou hospede a pasta em qualquer servidor estático:

```bash
python -m http.server 8080
```

Acesse `http://localhost:8080`.

## Funcionalidades

- Navegação responsiva, menu mobile e seções integradas.
- Direção visual baseada na logomarca oficial anexada, com cores violeta e azul.
- Catálogo interativo de quatro frentes de serviços.
- Seis entradas de portfólio: GNG, HAUS Barber, Luence Space, identidade da VYZO, apresentação comercial GNG e campanha VYZO.
- Filtros de projetos; modal com escopo, imagens e links oficiais quando disponíveis.
- Timeline de processo e vitrine funcional de solução digital.
- Formulário com validação local, resumo copiável e acesso ao Instagram Direct (não envia dados automaticamente).
- Privacidade e termos de uso, SEO básico, acessibilidade de teclado, opção de movimento reduzido.

## Atualizar conteúdo

Em `data.js`, ajuste `services`, `projects`, `process` ou `benefits` sem repetir informação no HTML. O caminho de cada imagem e cada link externo estão por projeto.

## Publicação

Para uma presença oficial, utilize um repositório independente (como `vyzo-studio-site`) e habilite o GitHub Pages na branch principal, usando a pasta raiz. Como a aplicação é estática, não precisa de Vite, Node nem banco de dados.

## Transparência

As capturas da GNG vieram de uma apresentação comercial anterior de propriedade do usuário e podem representar uma versão anterior do site. Os projetos HAUS e Luence usam mídias públicas originais publicadas pelos respectivos projetos, não capturas de tela simuladas. Alguns recursos remotos dependem de acesso à internet. Nenhuma taxa de conversão, avaliação, depoimento ou resultado financeiro de clientes foi inventado.