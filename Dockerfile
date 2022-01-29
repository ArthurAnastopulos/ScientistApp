FROM node:latest

# Create app directory
WORKDIR /src/app

# Install app dependencies
# A wildcard "*" is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install -g npm@8.4.0

# Bundle app source
COPY . .

# ENV PORT=3000
# EXPOSE $PORT

CMD [ "npm", "start" ]