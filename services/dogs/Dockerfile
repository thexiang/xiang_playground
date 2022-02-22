FROM node:16-slim
RUN apt-get update
RUN apt-get install -y openssl

# Create app directory
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json .
COPY prisma ./prisma/
RUN npm install

# Bundle app source
COPY . .

EXPOSE 8080
#ENTRYPOINT ["tail", "-f", "/dev/null"]

CMD [ "npm", "start" ]