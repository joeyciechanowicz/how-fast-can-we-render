#!/bin/bash

$GOPATH/bin/bombardier -c 125 -n 100000 http://localhost:8080
