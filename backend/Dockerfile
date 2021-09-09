FROM node:12-alpine as builder
WORKDIR /app
COPY package*.json /app/
RUN apk --no-cache add --virtual builds-deps build-base python
RUN npm install -g @nestjs/cli
RUN npm install
COPY . /app
RUN npm run build
CMD ["node", "dist/main"]
# CMD "npm" "run" "start:prod"
EXPOSE 8080 
EXPOSE 1337
# FROM node:12-alpine
# WORKDIR /app
# COPY --from=builder /app/dist /app/
# COPY package.json /app/package.json
# RUN apk --no-cache add --virtual builds-deps build-base python
# RUN npm install
# USER node
# RUN node ./dist/main.js
