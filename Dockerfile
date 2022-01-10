ARG BASE_CONTAINER=frontend_base

# Base Container
FROM centos:centos7.9.2009 as frontend_base
ARG NODE_VERSION_ARG=10.16.0
# install node version manager
RUN yum update -y
RUN yum install -y wget git
RUN wget https://nodejs.org/dist/v$NODE_VERSION_ARG/node-v$NODE_VERSION_ARG-linux-x64.tar.xz
RUN mkdir -p /usr/local/lib/nodejs
RUN tar -xJvf node-v$NODE_VERSION_ARG-linux-x64.tar.xz -C /usr/local/lib/nodejs
RUN chown -R root /usr/local/lib/nodejs
RUN ln -s /usr/local/lib/nodejs/node-v$NODE_VERSION_ARG-linux-x64/bin/node /bin/node
RUN ln -s /usr/local/lib/nodejs/node-v$NODE_VERSION_ARG-linux-x64/bin/npm /bin/npm
RUN ln -s /usr/local/lib/nodejs/node-v$NODE_VERSION_ARG-linux-x64/bin/npx /bin/npx
RUN mkdir /node-workspace
COPY package.json /node-workspace 
COPY package-lock.json /node-workspace
WORKDIR /node-workspace
RUN npm ci
RUN mkdir /test-results

# Add frontend code to container
FROM $BASE_CONTAINER as frontend_code
WORKDIR /node-workspace
COPY . /node-workspace