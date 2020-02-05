FROM node:latest

COPY package.json ./

COPY app.js ./

COPY public ./public

COPY routes ./routes

COPY bin  ./bin

RUN npm install

EXPOSE 3000

CMD [ "./bin/www" ]



