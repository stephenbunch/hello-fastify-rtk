#!/bin/bash

docker buildx build --platform linux/amd64 -f Dockerfile.build -t hello-fastify-rtk .
docker tag hello-fastify-rtk stephenbunch/hello-fastify-rtk:latest
docker push stephenbunch/hello-fastify-rtk:latest
