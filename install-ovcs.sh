#!/bin/bash

mkdir "OpenVigile-CollectorStack"
cd OpenVigile-CollectorStack

mkdir "prometheus"
echo "[1/5]Downloading prometheus-config.yaml..."
curl -o prometheus/prometheus-config.yaml "http://api.openvigile.site/collector/prometheus"


mkdir "otelcollector"
echo "[2/5]Downloading otelcol-config.yml..."
curl -o otelcollector/otelcol-config.yml "http://api.openvigile.site/collector/config"


mkdir "grafana/provisioning/datasources"
echo "[3/5]Downloading grafana provision openvigile.yml..."
curl -o grafana/provisioning/datasources/openvigile.yml "http://api.openvigile.site/collector/grafana"


echo "[4/5]Downloading docker-compose.yml..."
curl -o docker-compose.yml "http://api.openvigile.site/collector/docker"

echo
echo "Download Done"
echo

echo "[5/5]Starting up OpenVigile Collector Stack containers in detached mode..."
echo
docker compose up -d

echo
echo "OpenVigile Collector Stack is successfully deployed."
echo "Listens for OTLP signals on port http://localhost:4318"
echo

