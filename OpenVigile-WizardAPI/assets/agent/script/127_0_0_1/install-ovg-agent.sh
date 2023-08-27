#!/bin/bash

mkdir "OpenVigile-Agent"
cd OpenVigile-Agent

echo "[1/3]Downloading docker-compose.yml..."
curl -o docker-compose.yml "http://localhost:8365/agent/docker?logs=4200&metrics=4500"

mkdir config

echo "[2/3]Downloading config.river..."
curl -o config/config.river "http://localhost:8365/agent/config?address=asdas&logs=4200&metrics=4500"

echo
echo "Download Done"
echo

echo "[3/3]Starting up agent container in detached mode..."
echo
docker compose up -d

echo
echo "OpenVigile Grafana Agent is successfully deployed."
echo "Listens for OTLP signals on ports"
echo "Logs:	4200
Metrics:	4500
Traces:	4318"
echo

