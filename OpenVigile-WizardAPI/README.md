# OpenVigile - WizardAPI 🖧

The Wizard API creates and delivers configuration and installation files necessary for the Single-Command and Interactive Wizard installation of the OpenVigile stack. It is capable of generating for bash scripts, docker-compose and config files for a wide range of use cases, with custom ports, signal types and other configuration choices. It is what provides a quick setup process to the rather complex structure of OpenVigile stack. The Wizard API complements the Wizard Frontend.

### Installation
It follows the standard NodeJS installation:

1. Install dependencies:
   ```sh
   npm i
   ```
2. Create a `.env` file taking reference from the `.env-sample` file
3. Start server
   ```sh
   node index.js
   ```

### Endpoints
| Endpoint | Request Type | Query Params | Description |
| --- | --- | --- | --- |
| `/agent/docker` | `GET` | logs, metrics, traces | Returns a `docker-compose.yml` with all the requested modifications for OpenVigile Agent provided in the query params |
| `/agent/config` | `GET` | logs, metrics, traces, add | Returns a `config.river` for OpenVigile Agent with all the requested modifications provided in the query params |
| `/agent/script` | `GET` | logs, metrics, traces, add | Returns a `install-agent.sh` installation script with all the requested modifications provided in the query params |
| `/agent/status` | `GET` |  | Returns if the API is ready for delivering agent files |
| `/collector/docker` | `GET` | otlp, prometheus, elastic, ovapi, jaeger, dash | Returns a `docker-compose.yml` with all the requested modifications for CollectorStack provided in the query params |
| `/collector/prometheus` | `GET` |  | Returns a `prometheus.yaml` for CollectorStack |
| `/collector/grafana` | `GET` | prom, elastic, dash | Returns a `openvigile.yaml` for provisioning data sources in Grafana |
| `/collector/config` | `GET` | otlp, elastic | Returns a `otelcol-config.yml` for CollectorStack with all the requested modifications provided in the query params |
| `/collector/script` | `GET` | otlp, prometheus, elastic, ovapi, jaeger, dash | Returns a `install-ovsh.sh` installation script with all the requested modifications provided in the query params |
| `/collector/status` | `GET` |  | Returns if the API is ready for delivering collector files |
