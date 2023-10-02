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

### Usuário

1. **Listar todos os usuários**
```bash
curl -X GET http://localhost:3000/users
```

2. **Obter um usuário específico pelo ID**
```bash
curl -X GET http://localhost:3000/users/1
```

3. **Adicionar um novo usuário**
```bash
curl -X POST http://localhost:3000/users \
     -H "Content-Type: application/json" \
     -d '{
           "name": "John Doe",
           "email": "john.doe@example.com",
           "password": "secret123"
         }'
```

4. **Atualizar um usuário específico pelo ID**
```bash
curl -X PUT http://localhost:3000/users/1 \
     -H "Content-Type: application/json" \
     -d '{
           "name": "Jane Doe",
           "email": "jane.doe@example.com"
         }'
```

5. **Deletar um usuário específico pelo ID**
```bash
curl -X DELETE http://localhost:3000/users/1
```

### Login
```bash
curl --request POST \
  --url http://localhost:3000/users/login \
  --header 'Content-Type: application/json' \
  --data '{
	"email": "john.doe@example.com",
  "password": "secret123"
}'
```

### Estoque

1. **Listar todos os itens do estoque**
```bash
curl --request GET \
  --url http://localhost:3000/stock \
  --header 'authorization: Bearer <TOKEN>'
```

2. **Obter um item específico pelo ID**
```bash
curl --request GET \
  --url http://localhost:3000/stock/1 \
  --header 'authorization: Bearer <TOKEN>'
```

3. **Adicionar um novo item**
```bash
curl --request POST \
  --url http://localhost:3000/stock \
  --header 'Content-Type: application/json' \
  --header 'authorization: Bearer <TOKEN>' \
  --data '{
  "name": "Carne Bovina",
  "quantity": 10,
  "price": 50.00
}'
```

4. **Atualizar um item específico pelo ID**
```bash
curl --request PUT \
  --url http://localhost:3000/stock/1 \
  --header 'Content-Type: application/json' \
  --header 'authorization: Bearer <TOKEN>' \
  --data '{
  "name": "Frango",
  "quantity": 5,
  "price": 20.00
}'
```

5. **Deletar um item específico pelo ID**
```bash
curl --request DELETE \
  --url http://localhost:3000/stock/1 \
  --header 'authorization: Bearer <TOKEN>'
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