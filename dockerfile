FROM node:8-slim

COPY ./ ./
RUN npm i
RUN npm run build

CMD ["node", "./dist/server.js"]
EXPOSE 3000