# Sistema de Papelaria

O projeto é um sistema de papelaria simples, com controle de clientes, vendedores, produtos, vendas e comissões. Algumas funcionalidades estão no frontend, outras podem ser acessadas via Django Admin ou através de API. A estrutura desse projeto foi baseada em Python v3.11 para o backend em Django e NodeJS v18.18 para o frontend em ReactJS. Todo o desenvolvimento do projeto buscou utilizar os conceitos de SOLID, The Twelve-Factor App, bem como mensagens claras e outras boas práticas de versionamento GIT.

## Insomnia

A aplicação fornece uma API para interagir com os modelos, é possível realizar o CRUD de clientes, vendedores, produtos e vendas, assim como consultar a comissão calculada pelo sistema para cada vendedor em um período de datas.

Elaborei exemplos no Insomnia que podem ser utilizados através da importação do `insomnia.json`

# Instalação

Para a instalação, recomendo ter o Docker instalado na sua máquina. Caso deseje executar manualmente, será necessário ter o Python e o NodeJS instalado, conforme versões acima.

## Docker

O projeto foi desenvolvido e pensado para ser executado com Docker Compose, onde subirá 3 containers, sendo o de frontend, backend e banco de dados PostgreSQL. Para começar, podemos executar o comando docker compose -d up, para subir os containers das aplicações.

`docker compose up -d`

## Django

Para executar o projeto Django manualmente, **sem o uso do Docker**, podemos seguir os seguintes comandos:

`cd backend`

`cp .env-example .env`

Caso aqui, queiram executar com sqlite3, é possível alterar o .env, com DATABASE_ENGINE para 'django.db.backends.sqlite3' e DATABASE_NAME para o nome do arquivo, pode ser 'db.sqlite3', e deixar as outras variáveis de banco vazias.

`python -m venv venv`

Para ativar o venv, em ambiente Linux, utilizar `source ./venv/bin/activate` e em Windows utilizar `./venv/Scripts/Activate.ps1`

`pip install -r requirements.txt`

`python manage.py migrate`

`python manage.py runserver`

## ReactJS

Para executar o projeto ReactJS manualmente, **sem precisar do Docker**, podemos seguir os seguintes comandos:

`cd frontend`

`npm install`

`npm start`

## URLs

Com as aplicações rodando, elas estarão disponíveis no localhost, na porta 8000 para o Django e 3000 para o ReactJS.

`http://localhost:8000/admin`
`http://localhost:3000`

## Testes

O projeto em Django contém testes automatizados que podem ser testados com o comando test.

`python manage.py test`

Caso esteja executando dentro do docker, pode executar o mesmo comando com a estrutura abaixo

`docker exec -it papelaria-sistema-backend-1 python manage.py test`
