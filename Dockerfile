FROM node:16-alpine AS front

WORKDIR /app

# COPY ./FrontendDiwali2021/package.json .


COPY ./FrontendDiwali2021/ .

RUN rm -rf node_modules

RUN npm i

RUN npm run build

FROM node:lts-alpine

WORKDIR /app

COPY ./BackendDiwali2021Working/package.json .

RUN npm i

COPY ./BackendDiwali2021Working/ .

COPY --from=front /app/build/* ./frontend/

EXPOSE 8085

EXPOSE 27017

CMD [ "node",  "index.js" ]

