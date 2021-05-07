FROM node:14-slim  as react-build

ENV YARN_CACHE_FOLDER /yarn-cache
RUN yarn set version berry

WORKDIR /app

COPY .yarn/plugins ./.yarn/plugins/
COPY .yarn/releases ./.yarn/releases/

COPY package.json yarn.lock .yarnrc.yml ./
COPY tsconfig tsconfig
COPY packages packages

RUN --mount=type=cache,target=/yarn-cache yarn install

WORKDIR packages/leaf-app

RUN yarn build

FROM nginx:alpine

COPY packages/leaf-app/nginx.conf /etc/nginx/conf.d/configfile.template
COPY --from=react-build /app/packages/leaf-app/build /usr/share/nginx/html

ENV PORT 8080
ENV HOST 0.0.0.0
EXPOSE 8080
CMD sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"
