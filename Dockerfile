FROM node:10.16.0

RUN mkdir /node-workspace
COPY package.json /node-workspace 

WORKDIR /node-workspace

RUN npm install --verbose

COPY . /node-workspace

VOLUME /node-workspace

RUN mkdir /test-results
