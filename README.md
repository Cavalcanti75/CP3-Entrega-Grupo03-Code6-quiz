# CP2 — CODE6 QUIZ

Projeto acadêmico **CP2 — Desenvolvimento Front-end para Web**. O CODE6 QUIZ é um jogo de perguntas e respostas sobre HTML, CSS, JavaScript, DOM, JSON, Web Storage, Git e fundamentos de desenvolvimento web.

## Integrantes

- Nataly Barros Cavalcanti
- Leticia Toledo Fernandes
- Cayo Felix de Sousa
- Kelwin Gama de Souza
- Lucas Matos Gomes
- Samuel Bole

## Funcionalidades implementadas

- Perguntas carregadas dinamicamente de `data/perguntas.json` por meio de `fetch`.
- Solicitação do nome do jogador antes do início.
- Exibição de uma pergunta por vez e validação de resposta.
- Pontuação final e feedback textual com explicação para cada questão.
- Link da fonte de referência em cada explicação.
- Ranking com até cinco resultados armazenados em `sessionStorage`.
- Opção de jogar novamente sem recarregar a página.
- Navegação por teclado, foco visível e feedback que não depende apenas de cores.
- Layout responsivo para desktop e dispositivos móveis.
- Menu fixo durante a rolagem e botão de voltar ao topo.
- Publicação planejada pelo GitHub Pages com HTTPS.

## Conteúdos das perguntas

O arquivo JSON contém 15 questões sobre HTML semântico, links e imagens, CSS, espaçamento, media queries, Flexbox, variáveis JavaScript, DOM, eventos, JSON, Fetch API, sessionStorage e Git.

Cada objeto de pergunta possui `id`, `categoria`, `pergunta`, `alternativas`, `resposta` (índice começando em zero), `explicacao` e `fonte` (URL).

## Estrutura

```text
cp2-entreg-grupo3/
├── index.html
├── README.md
├── .gitignore
├── img/
│   └── code6-quiz-logo.png
├── data/
│   └── perguntas.json
├── css/
│   └── style.css
└── js/
    └── script.js
```

## Como executar localmente

Como o projeto carrega o JSON com `fetch`, não abra o `index.html` diretamente com `file://`. Execute por um servidor local, por exemplo a extensão **Live Server** do Visual Studio Code, ou acesse a versão publicada no GitHub Pages.

## Entrega CP2

Antes de enviar:
- [x] Testar o fluxo completo: nome → perguntas → pontuação → ranking → jogar novamente.
- [x] Testar a navegação usando somente Tab, Enter e Espaço.
- [x] Conferir o ranking em DevTools → Application → Session Storage.
- [x] Testar em janela anônima.
- [x] Publicar o site com HTTPS.
- [x] Criar e enviar a tag `cp2-entrega`.

Comandos da tag:

```bash
git tag -a cp2-entrega -m "Entrega CP2: lógica e interatividade"
git push origin cp2-entrega
```
