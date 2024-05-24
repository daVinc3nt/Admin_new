FROM node:21

WORKDIR /usr/src/app

COPY . .

RUN npm install --progress=true

RUN npm i -g pm2

EXPOSE 3001

CMD ["pm2-runtime", "start", "npm", "--name","admin","--","run","dev","--","-p","3001"]