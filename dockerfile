FROM node:8-slim

RUN mkdir -p /api
WORKDIR /api/
COPY ./ ./
RUN mkdir -p /src/swagger
RUN npm i
RUN npm run build
CMD ["node", "dist/src/server.js"]
EXPOSE 3000