FROM node:20-alpine 

WORKDIR /home/app

COPY . ./

RUN npm i && npm i -D typescript@5.4.5

EXPOSE 3333

CMD ["npm", "run", "dev"]

