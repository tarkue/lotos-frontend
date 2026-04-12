FROM node:lts-alpine
RUN apk add --no-cache libc6-compat
WORKDIR /home/nextjs/app

COPY package*.json ./
RUN npm install
RUN npx browserslist@latest --update-db

COPY . .

RUN npm run build

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV NODE_ENV=production

CMD [ "npm", "start" ]