#! /usr/bin/env bash

### Compiles the main.less stylesheet

cd $(dirname "$0")/../public

/usr/bin/env lessc --include-path="." \
    stylesheets/main.less > stylesheets/main.css

