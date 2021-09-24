FROM node:12.18.1

ENV NODE_ENV=production

WORKDIR /app

COPY . .

RUN npm install --production

CMD ["npx" "sequelize" "db:create"]

CMD ["sleep", "20"]

CMD ["node", "app.js"]

EXPOSE 8082
