#!/bin/bash

# $GOPATH/bin/bombardier -c 125 -n 300000 http://localhost:8080
~/bombardier -c 125 -d 10s http://localhost:8080
