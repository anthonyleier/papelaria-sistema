# Sistema de Papelaria

## Notas

Realizei o desenvolvimento desse projeto em 2 dias, algumas coisas foram simplificadas para atender ao tempo do desafio. Tive um problema ao utilizar serializer de produtos, não estava conseguindo obter as informações do ItemVenda associado ao produto. Portanto fiz uma conexão direta com o banco de dados para consultar essa informação. Não é a forma mais correta, mas para não perder muito tempo, foi necessária. Deixei a interface por última etapa também, e por falta de tempo, não teve o refinamento necessário.

## Desenvolvimentos Futuros

Como desenvolvimentos futuros para esta aplicação, gostaria de implantar a parte de frontend em NextJS, pois facilitaria o desenvolvimento, além de deixar mais robusto e organizado para novas funcionalidades. Além disso, implantar testes no frontend e realizar a melhoria de interface em alguns aspectos que não ficaram como eu gostaria. Por fim, gostaria de unificar os componentes de criar e atualizar Venda em um único componente.

# Instalação

Para a instalação, recomendo ter o Docker instalado na sua máquina. Caso deseje executar manualmente, será necessário ter o Python e o NodeJS instalado.

## Docker

O projeto foi desenvolvido e pensado para ser executado com Docker Compose, onde subirá 3 containers, sendo o de frontend, backend e banco de dados PostgreSQL. Para começar, podemos executar o comando docker compose -d up, para subir os containers das aplicações.

`docker compose up -d`

## Django

Para executar o projeto Django manualmente, sem precisar do Docker, podemos seguir os seguintes comandos:

`cd backend`

`cp .env-example .env `

Caso aqui, queiram executar com sqlite3, é possível alterar o .env, com DATABASE_ENGINE para 'django.db.backends.sqlite3' e DATABASE_NAME para o nome do arquivo, pode ser 'db.sqlite3', e deixar as outras variáveis de banco vazias.

`python -m venv venv`

Para ativar o venv, em ambiente Linux, utilizar `source ./venv/bin/activate` e em Windows utilizar `./venv/Scripts/Activate.ps1`

`pip install -r requirements.txt`

`python manage.py migrate`

`python manage.py runserver`

## ReactJS

Para executar o projeto ReactJS manualmente, sem precisar do Docker, podemos seguir os seguintes comandos:

`cd frontend `

`npm install `

`npm start `

## URLs

Com as aplicações rodando, elas estarão disponíveis no localhost, na porta 8000 para o Django e 3000 para o ReactJS.

`http://localhost:8000/admin`
`http://localhost:3000`

## Descrição da Atividade

Nós, da [AMCom](https://www.amcom.com.br/), atuamos no mercado de tecnologia da informação há mais de 20 anos e fornecemos soluções inovadoras para empresas de diversos segmentos. Inovamos com tecnologias emergentes e metodologias e práticas ágeis, cocriando produtos que atendem às demandas específicas de cada negócio, impulsionando a eficiência operacional desde a produção até o pós-venda.

Nossas equipes de desenvolvimento são compostas por desenvolvedores que amam o que fazem. Nossos processos de desenvolvimento ágeis e nossa busca por melhores práticas de desenvolvimento proporcionam um ótimo ambiente para profissionais que gostam de criar software de qualidade em boa companhia.

Estamos sempre à procura de bons programadores que gostam de melhorar sempre.

## Objetivo

Este repositório contém um problema usado para avaliar as habilidades dos candidatos no desenvolvimento do backend, usando Python e Django e do frontend, usando JavaScript e React.

É importante notar que a resolução satisfatória do problema é apenas uma parte do que será avaliado. Também consideramos outras disciplinas de programação, como documentação, testes, histórico de commits, design e boas práticas de engenharia de software.

Pontos que serão avaliados:

- Habilidade de criar uma API Rest utilizando Python/django.
- Habilidade de utilizar React/Javascript ao interagir com APIs.
- Conhecimentos em criar e implementar um serviço básico e uma interface básica, utilizando boas práticas para oferecer uma boa experiência aos usuários.
- Experiência para criar um codigo limpo, legível e performático.

**Palavras-chave**
Funcionalidade | Formatação | Estrutura do Projeto | Escalabilidade | Manutenção | Boas práticas de mercado

## Recomendações

- Leia atentamente a especificação para entender todo o problema e os requisitos antes de começar e, caso não entenda algo, nos pergunte;
- Apreciamos a simplicidade;
- Por favor, escreva testes;
- Aplique boas prácticas de programação
- Ponha em prática os conceitos do [The Twelve-Factor App](https://12factor.net/pt_br/);
- Use os princípios do [SOLID](https://pt.wikipedia.org/wiki/SOLID)
- Use [boas práticas de git](https://www.git-tower.com/learn/git/ebook/en/command-line/appendix/best-practices), com mensagem claras;

# Especificação

## Contextualização

1. O nosso cliente é uma papelaria hipotética que gostaria de registrar suas vendas e calcular a comissão de seus vendedores com base nas vendas feitas em dado período e nos percentuais de comissão cadastrados nos produtos vendidos.
2. Um produto deve ter as seguintes informações: código, descrição, valor unitário e percentual de comissão, que pode variar entre 0 e 10%.
3. Uma venda tem número da nota fiscal, data/hora, cliente, vendedor e uma lista de um ou mais produtos e suas quantidades vendidas.
4. Clientes e vendedores têm nome, e-mail e telefone.
5. O cálculo da comissão é feito aplicando-se o percentual cadastrado no produto ao valor total da venda do produto (qtd \* valor unitário).
6. Em alguns dias da semana, o percentual de comissão tem limites mínimos e máximos. Isso pode mudar com alguma frequência, por isso esses parâmetros devem ser configuráveis.

- Exemplo: Segundas-Feiras Min: 3% Max: 5%. Nesse caso uma venda nesse dia, de um produto de comissão 10% pagaria uma comissão de 5%. Já a venda de um produto de comissão 2% pagaria 3%.

7. O total de comissão da venda é o total das somas das comissões dos itens da venda.

## Importante

O uso de bibliotecas externas (Axios, Redux, etc) ou de interface (Bootstrap, Material, etc) é liberado.
Apenas faça bom uso delas, a dica é não esquecer que esse espaço é para mostrar **o que você sabe fazer**.

## Suas tarefas

### A. Desenvolver uma aplicação Python/Django que atenda os critérios a seguir

- [x] Permitir, via Django admin, cadastrar produtos, clientes e vendedores
- [x] Permitir, via Django admin, configurar os dias da semana e os mínimos e máximos de comissão.
- [x] Expor uma API que possibilite CRUD de produtos, clientes, vendedores e vendas.
- [x] Expor uma API que permita obter a lista de vendedores com o valor total de comissões a ser pago a cada um pelas vendas de dado período.
- [x] Criar testes unitários

### B. Desenvolver uma aplicação em React.js que atenda os critérios a seguir:

- [x] Usar a API desenvolvida na tarefa A
- [x] Apresentar um menu com duas funcionalidades: Vendas e Comissões
- A funcionalidade de vendas deve:
  - [x] Apresentar a lista de vendas registradas exibindo data/hora, cliente, vendedor e valor total
  - [x] Permitir incluir/editar/excluir vendas
- A funcionalidade de comissões deve:
  - [x] Pedir uma faixa de datas
  - [x] Apresentar a lista de vendedores e o valor total de comissões a pagar para cada vendedor, com base nas vendas do período
  - [x] Apresentar total geral de comissões
- [x] Atender os protótipos criados pela equipe de UX, disponíveis nos links abaixo:
  - [Protótipo navegável](https://www.figma.com/proto/LrQFIRtrRJq1GVzofm07qU/Teste-Python-DEV?page-id=69%3A5896&node-id=830%3A2&viewport=1335%2C779%2C0.5&scaling=min-zoom&starting-point-node-id=830%3A124) - Dá uma visão de como seria a App funcionando.
  - [Protótipo aberto](https://www.figma.com/file/LrQFIRtrRJq1GVzofm07qU/Teste-Python-DEV?node-id=69%3A5896) - Apresenta as páginas da App como idealizadas pelo UX.

## O que vamos avaliar?

- Uso correto do gerenciamento de state
- Boa navegação entre as funcionalidades
- Componentização
- Boas práticas nas chamadas de API e tratamento de dados
- Separação de responsabilidades das lógicas das regras de negócio e interface

## Ponto extras

- Testes unitários no frontend
- Uso de Typescript
- Disponibilizar a aplicação rodando em algum servidor remoto.
- Filtros, ordenação e paginação são sempre bem-vindos.
- Um resumo de como foi feito o desenvolvimento, bem como um plano para as implementações que gostaria de ter feito.

## Como entregar

O seu projeto deve estar acessível para download em algum repositório git remoto, e deve conter no README instruções detalhadas para instalação e execução.
