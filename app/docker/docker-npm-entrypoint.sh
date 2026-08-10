#!/bin/sh
set -e

if [ "${1#-}" != "$1" ] || ([ "$1" != 'npm' ] && [ "$1" != 'npx' ] && [ "$1" != 'node' ]); then
	set -- npm "$@"
fi

exec docker-entrypoint.sh "$@"
