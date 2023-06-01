FROM node:18-alpine AS builder

RUN mkdir /app && chown -R node:node /app && mkdir /app/data

COPY . /app

WORKDIR /app

RUN npm install && npm run build

FROM node:18-alpine

RUN mkdir /app && mkdir /app/data

COPY --from=builder /app/build /app/build

COPY --from=builder /app/package.json /app/package-lock.json /app/

WORKDIR /app

RUN npm install && npm cache clean --force

CMD ["node", "build/index.js"]

EXPOSE 3000
