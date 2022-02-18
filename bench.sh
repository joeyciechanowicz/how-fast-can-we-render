#!/bin/bash

$GOPATH/bin/bombardier -c 125 -n 300000 http://localhost:8080

