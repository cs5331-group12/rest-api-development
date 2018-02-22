#!/bin/bash

if [ "$EUID" -ne 0 ]
  then echo "Please run as root"
  exit
fi

TEAMID=`md5sum README.md | cut -d' ' -f 1 | awk '{print $1 "_dev"}'`
docker kill $(docker ps -q)
docker rm $(docker ps -a -q)
docker build . -t $TEAMID -f Dockerfile.dev
docker run -p 80:80 -p 8080:8080 -v $(pwd)/src/html:/var/www/html -v $(pwd)/src/service:/service -t $TEAMID /bin/bash /service/start_services.sh
