FROM node:alpine

WORKDIR /app

COPY package.json ./

COPY package-lock.json ./

RUN npm install

RUN npm install react-scripts@latest

COPY /client ./

EXPOSE 8080

CMD ["npm", "start"]