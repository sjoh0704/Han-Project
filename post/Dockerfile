FROM node:12.18.1

ENV NODE_ENV=production

WORKDIR /app

COPY . .

RUN npm install --production

ENTRYPOINT ["/bin/bash", "run.sh"]

EXPOSE 8082
