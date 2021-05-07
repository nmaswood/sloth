FROM node:14-slim as builder

ENV YARN_CACHE_FOLDER /yarn-cache
RUN yarn set version berry

WORKDIR /app

COPY .yarn/plugins ./.yarn/plugins/
COPY .yarn/releases ./.yarn/releases/

COPY package.json yarn.lock .yarnrc.yml ./
COPY tsconfig tsconfig
COPY packages packages

RUN --mount=type=cache,target=/yarn-cache yarn install

WORKDIR packages/leaf-api

RUN yarn build

FROM builder as final

COPY --from=builder /app/node_modules /final/node_modules
COPY --from=builder /app/packages/leaf-api/node_modules /final/leaf-api/node_modules
COPY --from=builder /app/packages/leaf-api/dist /final/leaf-api/dist

WORKDIR /final/leaf-api

ENV PORT 8081
ENV HOST 0.0.0.0
EXPOSE 8081
CMD node dist/index.js
