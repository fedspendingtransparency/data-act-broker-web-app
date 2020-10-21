FROM node:10.16.0

RUN mkdir /node-workspace
COPY package.json /node-workspace 
COPY package-lock.json /node-workspace

WORKDIR /node-workspace

RUN npm ci

COPY . /node-workspace

VOLUME /node-workspace

RUN mkdir /test-results
