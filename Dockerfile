FROM node:16 as base
# هكتب هنا الكوماند اللي عوزاها تتنفذ سواء ديفلوبمنت  او برودكشن


FROM base as development
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 4000
CMD ["npm","run","start-dev"]

# FROM node:16 as production
FROM base as production
WORKDIR /app
COPY package.json .
RUN npm install --only=production
COPY . .
EXPOSE 4000
CMD ["npm","start"]