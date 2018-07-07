#!/usr/bin/env bash

# Check ENV variable to ensure proper API configuration is used
[ -z "$APP_ENV" ] && echo "APP_ENV not set" && exit 1;

# check for config file
file="./src/Config/env.$APP_ENV.js"
if [ ! -f $file ]; then
    echo "File ($file) not found!"
fi

# copy proper config to location
cp $file src/Config/env.js
