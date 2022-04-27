FROM node:alpine as build
RUN mkdir -p /build
WORKDIR /app

COPY package.json /app/
RUN  npm install

COPY . /app/

RUN npm run build  --prod

FROM nginx:alpine
COPY --from=build /app/dist/smarthouse /usr/share/nginx/html

