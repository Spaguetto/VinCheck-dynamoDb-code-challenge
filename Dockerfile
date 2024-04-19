FROM amd64/node:18-alpine

RUN mkdir /app
WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./
COPY .env ./
COPY src ./src


RUN npm cache clean --force
RUN rm -rf node_modules
RUN npm set progress=false && npm install --force && npm run build

EXPOSE 3000

CMD npm run start