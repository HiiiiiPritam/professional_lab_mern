FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD ["sh", "-c", "node setup.js && node migrate_budgets.js && npm run dev"]
