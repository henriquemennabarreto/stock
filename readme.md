# Projeto Estoque API

## Requisitos

- Node.js >= 14.0.0
- npm >= 6.0.0
- Docker (opcional)

## Para desenvolver (node local)

1. Instale as dependências:

```bash
npm install
```

2. Crie a estrutura de banco de dados:

```bash
./node_modules/.bin/knex --knexfile ./src/config/knexfile.js migrate:latest
```

3. Execute os testes

```bash
npm test
```

4. Inicie o servidor:

```bash
npm start
```

## Requests

```bash
curl --request GET \
  --url http://localhost:3000/stock \
  --header 'User-Agent: insomnia/8.0.0'
```

```bash
curl --request GET \
  --url http://localhost:3000/stock/1 \
  --header 'User-Agent: insomnia/8.0.0'
```

```bash
curl --request POST \
  --url http://localhost:3000/stock \
  --header 'Content-Type: application/json' \
  --data '{
  "name": "Carne Bovina",
  "quantity": 10,
  "price": 50.00
}'
```

```bash
curl --request PUT \
  --url http://localhost:3000/stock/1 \
  --header 'Content-Type: application/json' \
  --data '{
  "name": "Frango",
  "quantity": 5,
  "price": 20.00
}'
```

```bash
curl --request DELETE \
  --url http://localhost:3000/stock/1
```

## Docker

Você pode executar a aplicação usando o Docker. Certifique-se de ter o Docker instalado em seu ambiente.

1. Construa as imagens e inicie os containers:

```bash
docker-compose up -d
```

2. Acesse a API em `http://localhost:3000`.

3. Execute os testes:

```bash
docker exec -it stock-app npm test
```