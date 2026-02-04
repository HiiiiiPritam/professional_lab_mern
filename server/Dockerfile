FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN chmod +x wait-for-db.sh

EXPOSE 5000

CMD ["sh", "wait-for-db.sh"]
