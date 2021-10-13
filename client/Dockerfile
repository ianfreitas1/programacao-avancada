FROM node:16-alpine3.11

WORKDIR /app

COPY package.json .

COPY package-lock.json .

RUN npm install

RUN npm install react-scripts@latest

COPY /client .

CMD ["npm", "start"]