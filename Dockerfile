FROM node:20-alpine

WORKDIR /app

COPY package.json ./

COPY index.html ./
COPY style.css ./
COPY script.js ./
COPY server.js ./

ENV PORT=3000

EXPOSE 3000

CMD ["npm", "start"]
