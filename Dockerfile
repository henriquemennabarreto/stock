FROM node:14

RUN apt-get update && apt-get install -y jq

WORKDIR /app

COPY package.json package-lock.json /app/

RUN npm install

COPY . /app/

CMD ["npm", "start"]
