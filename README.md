# CODE6 QUIZ — CP3 | Entrega final

Projeto acadêmico desenvolvido para a disciplina de **Desenvolvimento Front-end para Web**, como entrega final do grupo. O CODE6 QUIZ é um quiz interativo sobre fundamentos de desenvolvimento web, com perguntas carregadas de um arquivo JSON, feedback explicativo, pontuação e ranking da sessão.

## Integrantes

- Nataly Barros Cavalcanti
- Leticia Toledo Fernandes
- Samuel Bole
- Cayo Felix de Sousa
- Lucas Matos Gomes
- Kelwin Gama de Souza

## Tema e objetivo

O projeto utiliza um quiz para revisar e praticar conteúdos de HTML, CSS, JavaScript e ferramentas do desenvolvimento web. 
A proposta é apresentar perguntas objetivas e após cada resposta, mostrar uma explicação e uma fonte para consulta.

## Funcionalidades

- Carregamento assíncrono das 15 perguntas em `data/perguntas.json`, usando Fetch API.
- Validação da estrutura dos dados antes de iniciar a partida.
- Solicitação do nome do jogador.
- Exibição de uma pergunta por vez.
- Validação de alternativa, indicação textual de acerto ou erro e explicação.
- Link para a fonte de referência de cada pergunta.
- Cálculo e exibição da pontuação final e do percentual de acertos.
- Ranking dos cinco melhores resultados da sessão, armazenado em `sessionStorage`.
- Opção de jogar novamente sem recarregar a página.
- Navegação por teclado, foco visível e mensagens para tecnologias assistivas.
- Layout responsivo para desktop e dispositivos móveis.
- Menu principal fixo durante a rolagem e botão de retorno ao topo.

## Conteúdos abordados

As perguntas cobrem:

- HTML: estrutura semântica, elemento principal, links e atributo `alt`.
- CSS: cor, espaçamento interno, media queries e Flexbox.
- JavaScript: variáveis, seleção de elementos do DOM e eventos.
- JSON e Fetch API.
- Web Storage: `sessionStorage`.
- Git: envio de commits ao repositório remoto.

## Regras do quiz

1. O jogador informa o nome antes de iniciar.
2. As perguntas são apresentadas individualmente.
3. O jogador seleciona uma alternativa por pergunta.
4. Após a seleção, o sistema bloqueia novas respostas para aquela pergunta e apresenta o resultado e a explicação.
5. Ao final, o sistema mostra a pontuação e atualiza o ranking da sessão.
6. O jogador pode iniciar uma nova partida pelo botão **Jogar novamente**.

O ranking utiliza `sessionStorage`: permanece disponível enquanto a sessão da aba estiver ativa e não é um ranking compartilhado entre dispositivos ou usuários.

## Estrutura do projeto

```text
cp3-entrega-grupo03/
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

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- JSON
- Fetch API
- DOM e eventos
- Web Storage (`sessionStorage`)
- Git e GitHub Pages

## Verificações de qualidade e acessibilidade

O grupo deve conferir, antes da apresentação:

- Contraste entre texto, fundo, botões e estados de resposta.
- Foco visível ao navegar com Tab e Shift + Tab.
- Ativação dos controles com Enter ou Espaço.
- Texto alternativo (`alt`) na imagem do logotipo e descrição acessível para a ilustração.
- Feedback de acerto e erro que não dependa somente de cores.
- Ausência de rolagem horizontal em desktop e dispositivos móveis.
- Fluxo completo: nome → perguntas → feedback → pontuação → ranking → replay.
- Carregamento do JSON na versão publicada, e não apenas no Live Server.

## Entrega final

- Repositório GitHub: https://github.com/Cavalcanti75/CP-Grupo03-code6-quiz
- Site publicado: https://cavalcanti75.github.io/CP-Grupo03-code6-quiz/
- Dia da Entrega **11/11/2026 — Apresentação dia 17/11/2026 - Aula 13**.
