#!/bin/bash

if [ "$#" -ne 1 ]; then
	echo "Illegal number of parameters"
	exit 1
fi

VERSION="$1"

read -p "Are you sure? (Version: $VERSION) (y/N)" -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
	[[ "$0" = "$BASH_SOURCE" ]] && exit 1 || return 1
fi

echo Building...

docker build -t vanflux/rm-agent agent
docker build -t vanflux/rm-api api
docker build -t vanflux/rm-web web

docker tag vanflux/rm-agent "vanflux/rm-agent:$VERSION"
docker tag vanflux/rm-api "vanflux/rm-api:$VERSION"
docker tag vanflux/rm-web "vanflux/rm-web:$VERSION"

echo Pushing...

docker push "vanflux/rm-agent:$VERSION"
docker push "vanflux/rm-api:$VERSION"
docker push "vanflux/rm-web:$VERSION"

docker push vanflux/rm-agent
docker push vanflux/rm-api
docker push vanflux/rm-web

echo Cleaning...

docker image rm "vanflux/rm-agent:$VERSION" || true
docker image rm "vanflux/rm-api:$VERSION" || true
docker image rm "vanflux/rm-web:$VERSION" || true

echo Finish
