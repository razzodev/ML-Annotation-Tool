FROM ubuntu:18.04
MAINTAINER Algo LTD

ENV NODE_VERSION 13.8.0

RUN rm /var/lib/apt/lists/* -vf

RUN apt-get update && apt-get -y upgrade

RUN apt-get install -y \
	apt \
	vim \
	git \
	curl \
	wget \
	python3.6 \
	python3-pip \
	python3-venv \
	nodejs \
	npm \
	--fix-missing

RUN rm -rf /var/lib/apt/lists/* \
	apt-get clean
#Installing npm packages
RUN npm install pm2 -g


WORKDIR /

ADD . /root/

WORKDIR /root/

# install python & npm dependencies
RUN pip3 install -r requirements.txt
#RUN npm install -g fs-extra 
RUN npm install -g npm@6.13.6
#RUN cd $(npm root -g)/npm && sed -i -e s/graceful-fs/fs-extra/ -e s/fs.rename/fs.move/ ./lib/utils/rename.js

RUN npm install

EXPOSE 5000 3000

ENTRYPOINT ["bash", "docker-load.sh"]


