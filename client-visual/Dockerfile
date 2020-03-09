FROM mhart/alpine-node:12 AS builder
WORKDIR /app
COPY . .
RUN yarn global add react-scripts
RUN yarn add typescript
RUN yarn run build

FROM mhart/alpine-node:12
RUN yarn global add serve
WORKDIR /app
COPY --from=builder /app/build .
CMD ["serve", "-p", "80", "-s", "."]