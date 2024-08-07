FROM node:alpine AS build

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

FROM node:alpine

WORKDIR /app

COPY --from=build /app/build ./build
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./
COPY --from=build /app/*.env ./

CMD ["node", "build/app/index.js"]