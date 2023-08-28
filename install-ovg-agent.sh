#!/bin/bash

mkdir "OpenVigile-Agent"
cd OpenVigile-Agent

echo "[1/3]Downloading docker-compose.yml..."
curl -o docker-compose.yml "http://api.openvigile.site/agent/docker"

mkdir config

echo "[2/3]Downloading config.river..."
curl -o config/config.river "http://api.openvigile.site/agent/config?address=undefined"

echo
echo "Download Done"
echo

echo "[3/3]Starting up agent container in detached mode..."
echo
docker compose up -d

echo
echo "OpenVigile Grafana Agent is successfully deployed."
echo "Listens for OTLP signals on ports"
echo "Logs:	4318
Metrics:	4318
Traces:	4318"
echo

