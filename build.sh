#!/bin/bash

#
# Simple script to aggregate all required resources for the extension
#

build() {
    # Build the core extension files
    npx tsc

    if [ -d "dist" ];
    then
        # Copy all required files to the dist/ directory
        cp -r public/* dist/
    fi
}

build
