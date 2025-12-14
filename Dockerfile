FROM node:lts-alpine

RUN apk add --no-cache libc6-compat
RUN npm i -g npm

# Установите TypeScript глобально
RUN npm install -g typescript

EXPOSE 3000

ENV PORT=3000
ENV NODE_ENV=production

WORKDIR /home/nextjs/app

COPY package*.json ./

RUN npm install
RUN npx browserslist@latest --update-db

# need to install linux specific swc builds
RUN npm install -D @swc/cli @swc/core
RUN npm install --save-exact --save-dev typescript

COPY . .

RUN npm run build

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

USER nextjs

CMD [ "npm", "start" ]