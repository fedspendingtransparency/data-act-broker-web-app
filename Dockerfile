# Base Container
FROM node:16.14.2 as frontend_base


RUN mkdir /node-workspace
COPY package.json /node-workspace 
COPY package-lock.json /node-workspace
WORKDIR /node-workspace

RUN npm install --verbose -g npm@8.5.1
RUN npm ci

RUN mkdir /test-results

# Add frontend code to container
FROM frontend_base
WORKDIR /node-workspace
COPY . /node-workspace
