FROM node:12.18.1

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY . .

RUN npm install --production


CMD ["sleep", "20"]

CMD ["node", "app.js"]

EXPOSE 8083
