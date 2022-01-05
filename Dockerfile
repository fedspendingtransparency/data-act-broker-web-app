FROM centos:centos7.9.2009

ARG node_version_arg=10.16.0

ENV NODE_VERSION=${node_version_arg}

# install node version manager
RUN yum update -y
RUN yum install -y wget git
RUN wget https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.xz
RUN mkdir -p /usr/local/lib/nodejs
RUN tar -xJvf node-v$NODE_VERSION-linux-x64.tar.xz -C /usr/local/lib/nodejs
RUN ln -s /usr/local/lib/nodejs/node-v$NODE_VERSION-linux-x64/bin/node /bin/node
RUN ln -s /usr/local/lib/nodejs/node-v$NODE_VERSION-linux-x64/bin/npm /bin/npm
RUN ln -s /usr/local/lib/nodejs/node-v$NODE_VERSION-linux-x64/bin/npx /bin/npx

RUN mkdir /node-workspace
COPY package.json /node-workspace 
COPY package-lock.json /node-workspace

WORKDIR /node-workspace

RUN npm ci

COPY . /node-workspace

VOLUME /node-workspace

RUN mkdir /test-results
