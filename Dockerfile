FROM centos:7.9.2009

ARG node_version_arg=10.16.0

ENV NODE_VERSION=${node_version_arg}

# install node version manager
RUN yum install -y git make 
RUN curl -k -L https://git.io/n-install --output n-install
RUN chmod +x n-install
RUN yes y | bash ./n-install
RUN $HOME/n/bin/n $NODE_VERSION
RUN yum clean all
RUN echo "PATH=$PATH:$HOME/n/bin/n" >> /etc/environment

RUN mkdir /node-workspace
COPY package.json /node-workspace 
COPY package-lock.json /node-workspace

WORKDIR /node-workspace

RUN npm ci

COPY . /node-workspace

VOLUME /node-workspace

RUN mkdir /test-results
