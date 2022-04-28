# FROM node:alpine as build
# RUN mkdir -p /build
# WORKDIR /app

# COPY package.json /app/
# RUN  npm install

# COPY . /app/

# RUN npm run build  --prod

# FROM nginx:alpine

# COPY --from=build /app/dist/smarthouse /usr/share/nginx/html



#CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'


# FROM trion/ng-cli as builder
# WORKDIR /app
# COPY package.json package.json
# COPY package-lock.json package-lock.json
# RUN npm ci  --debug 
# COPY . .
# RUN npm run build  --prod


# FROM nginx:1.17.5
# COPY default.conf.template /etc/nginx/conf.d/default.conf.template
# COPY nginx.conf /etc/nginx/nginx.conf
# COPY --from=builder  /app/dist/my-first-app /usr/share/nginx/html 
# CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'


# FROM node:14.1-alpine AS builder
# WORKDIR /opt/web
# COPY package.json package-lock.json ./
# RUN npm install
# ENV PATH="./node_modules/.bin:$PATH"
# COPY . ./
# RUN ng build --prod
# FROM nginx:1.17-alpine
# COPY nginx.config /etc/nginx/conf.d/default.conf
# COPY --from=builder /opt/web/dist/smarthouse /usr/share/nginx/html




# FROM node:16-alpine AS builder

# WORKDIR /opt/web
# COPY package.json package-lock.json ./
# RUN npm install

# ENV PATH="./node_modules/.bin:$PATH"

# COPY . ./
# RUN ng build --prod

# FROM nginx:1.17-alpine
# RUN apk --no-cache add curl
# RUN curl -L https://github.com/a8m/envsubst/releases/download/v1.1.0/envsubst-`uname -s`-`uname -m` -o envsubst && \
#     chmod +x envsubst && \
#     mv envsubst /usr/local/bin
# COPY ./nginx.config /etc/nginx/nginx.template
# CMD ["/bin/sh", "-c", "envsubst < /etc/nginx/nginx.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
# COPY --from=builder /opt/web/dist/smarthouse /usr/share/nginx/html


FROM node:alpine as build
RUN mkdir -p /build
WORKDIR /app

COPY package.json /app/
RUN  npm install

COPY . /app/

RUN npm run build  --prod

FROM nginx:alpine

RUN curl -L https://github.com/a8m/envsubst/releases/download/v1.1.0/envsubst-`uname -s`-`uname -m` -o envsubst && \
    chmod +x envsubst && \
    mv envsubst /usr/local/bin
COPY ./nginx.config /etc/nginx/nginx.template
CMD ["/bin/sh", "-c", "envsubst < /etc/nginx/nginx.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]

COPY --from=build /app/dist/smarthouse /usr/share/nginx/html