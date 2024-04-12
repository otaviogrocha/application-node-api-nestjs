FROM node:latest

WORKDIR /usr/src

COPY . .

RUN npm install
EXPOSE
CMD ["npm", "run", "start:dev"]