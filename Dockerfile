# Base Container
FROM node:20.18.2 as frontend_base


RUN mkdir /node-workspace
COPY package.json /node-workspace 
COPY package-lock.json /node-workspace
WORKDIR /node-workspace

RUN npm install --verbose -g npm@10.8.3
RUN npm ci --legacy-peer-deps

RUN mkdir /test-results

COPY . /node-workspace
