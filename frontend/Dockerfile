# FROM node:12-alpine as builder
# WORKDIR /app
# COPY package.json /app/package.json
# RUN npm install --only=prod
# COPY . /app
# RUN npm run build
# CMD [ "next", "start" ]
# # FROM nginx:1.16.0-alpine
# # COPY --from=builder /app/build /usr/share/nginx/html
# # EXPOSE 80
# # CMD ["nginx", "-g", "daemon off;"]
# EXPOSE 3000
FROM node:12

ENV PORT 3000

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json /usr/src/app/
RUN npm install

# Copying source files
COPY . /usr/src/app

# Building app
RUN npm run build
EXPOSE 3000

# Running the app
CMD "npm" "run" "dev"