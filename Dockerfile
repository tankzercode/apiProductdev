FROM node



WORKDIR /app

COPY package*.json /app/

RUN npm install --force

COPY . /app/



CMD [ "npm" , "run" , "start"]

