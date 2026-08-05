#!/bin/sh
set -e

if curl -s --fail http://localhost > /dev/null; then
	exit 0
fi

exit 1
