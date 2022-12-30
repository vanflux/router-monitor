#!/bin/bash

if [ "$#" -ne 1 ]; then
	echo "Usage: agent-updater.sh <command>"
	exit 1
fi

CMD="$1"

while true; do
  echo ''
  echo Checking...

  REMOTE_DIGEST=$(curl https://registry.hub.docker.com/v2/repositories/vanflux/rm-agent/tags/latest 2>/dev/null | grep digest | sed 's/.*"digest":"//' | sed 's/".*//')
  LOCAL_DIGEST=$(docker image inspect -f "{{ index .RepoDigests 0 }}" vanflux/rm-agent 2>/dev/null | sed 's/.*@//')

  if [[ "$REMOTE_DIGEST" = "" ]]; then
    echo Remote image doesnt exists, waiting 60s
    sleep 60
    continue
  fi

  echo Local digest: $LOCAL_DIGEST
  echo Remote digest: $REMOTE_DIGEST

  if [[ "$LOCAL_DIGEST" != "$REMOTE_DIGEST" ]]; then
    echo Local digest differs from remote digest
    echo Pulling new image...
    docker pull vanflux/rm-agent
    bash -c "$CMD"
  fi

  echo Waiting 60s
  sleep 60
done
