# OpenVigile - CollectorStackAPI 🖧

With separate handling of Logs, Metrics and Traces for better performance, we are introduced with three different APIs with three different endpoints for accessing data. CollectorStackAPI focuses exactly on this issue. It provides a single interface by aggregating all the other API endpoints and providing a common address for the three. This also has future prospects of taking up the role of an API gateway.

### Installation
This API is Dockerized and the Image available can be pulled from docker hub:
```sh
docker pull devayushdubey/openvigile:openvigileapi
```
**CollectorStackAPI is already included in CollectorStack and does not need to be installed separately.**
For development:
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
| Endpoint | Request Type | Description |
| --- | --- | --- |
| `/metrics*` | `GET` | Tunnels to the `api/v1` endpoint of Prometheus API. Everyting provided after `/metrics` is appended to the prometheus `api/v1` endpoint. For eg: `http://localhost:6300/metrics/query?query=up` returns results from `http://localhost:9090/api/v1/query?query=up`|
| `/logs*` | `GET` | Tunnels to the `/` endpoint of Elasticsearch API. Everyting provided after `/logs` is appended to the elasticsearch `/` endpoint. For eg: `http://localhost:6300/logs/_cat/indices` returns results from `http://localhost:9200/_cat/indices`|
| `/traces*` | `GET` | Tunnels to the `/` endpoint of Jaeger UI API. Everyting provided after `/traces` is appended to the jaeger `/` endpoint. |
