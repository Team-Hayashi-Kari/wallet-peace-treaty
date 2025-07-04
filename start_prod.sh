#!/usr/bin/env sh
set -e
docker compose -f docker-compose.yml -f docker-compose-prod.yaml up --build -d