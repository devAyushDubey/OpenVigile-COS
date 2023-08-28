# OpenVigile - COS 🔭
> Made for Contentstack's TechSurf 2023 <br> 
> Problem Statement-3 : A Scalable Log Aggregator Service <br>
> By Ayush Dubey (GSoC' 23 @ 52 North)

![OpenVigile](https://github.com/devAyushDubey/OpenVigile-COS/assets/33064931/e22bd382-4eed-4bf7-8eba-46ec512e492c)

OpenVigile is a vendor-agnostic Comprehensive Observability Stack that streamlines system, application and infrastructure observability. It incorporates an industry standard frameworks, a unique performance based architecture and a suite of interactive tools.

### OpenVigile COS offers:
- Observability for all telemetry signal types: Logs, Metrics and Traces
- Vendor Independent Signal Injestion
- Industry standard OpenTelemetry based observability pipelines
- High scalability, as it is curated entirely on cloud native microservices architecture
- A Single extremely powerfull dashboard for all data sources
- A highly interactive GUI setup environment
- Best-in-class query handling due to it's unique performance centric architecture
- Easy single-step setup option
- Single aggregated API to manage all signal types
- A highly flexible config based approach

## Hands-On:
OpenVigile Setup Wizard: http://openvigile.site

OpenVigile Demo: http://demo.openvigile.site

OpenVigile Wizard API: http://api.openvigile.site

## Installation

One of the highlights of OpenVigile is it's easy setup and installation process. It offers 2 methods, based on specific use cases:
- Single Command Setup: Fixed ports and frameworks. Less Flexibility.
- Setup Wizard and API (Recommended): Custom ports and use-case specific architecture. More Flexibility.
- Manual Setup: Custom ports and custom archiecture. Config based setup offers best flexibility.

### Pre-requisites:
1. Docker and Docker Compose
2. Sudo Privileges
3. In case of AWS CloudWatch:<br>
   The instance that will host OpenVigile Collector Stack must have SSL certificates for injesting CloudWatch metrics and logs streams as per the AWS policies.
4. In case of application observability:
   As OpenVigile is based on OpenTelemetry, for it to observe an application it must be Intrumented to emit signals in OpenTelemetry formats and protocols. [See how you can instrument your application](https://opentelemetry.io/docs/instrumentation/)

### 1. Single Command Setup
1. In your Instrumented application, change the publish port of the OpenTelemetry (OTLP) signals to 4318.
2. On your instance that hosts the instrumented application, run the following command:
   ```sh
   source <(curl -s http://api.openvigile.site/agent/script)
   ```
   Replace `OV_COLLECTOR_ADDRESS` with the instance's address where you wish to host OpenVigile Collector Stack. Example: http://142.95.32.XXX:4318 <br>
   This will download and install Grafana Agent with a pre-baked configuration provided by OpenVigile that listens for OTLP signals on port 4318. The agent will communicate with the OpenVigile Collector Stack on your provided address. See architectural details here.
3. On the instance where you wish to host OpenVigile Collector Stack, run the following command:
   ```sh
   source <(curl -s http://api.openvigile.site/collector/script)
   ```
   This will install the OpenVigile Collector Stack applications and good to go. You can access its features on the following default ports:

   1. Grafana Dashboard (logs, metrics, traces): 3000
   2. OpenVigile API (logs, metrics, traces): 6300
   3. Prometheus Dashboard & API (metrics): 9090
   4. Elasticsearch API (logs): 9200
   5. Jaeger Dashboard (traces): 16686

### 2. Setup Wizard and API
Setup wizard is the recommended go-to, simple and fast way of setting up OpenVigile. It provides an interactive graphical interface for getting OpenVigile Stack up and running.

OpenVigile Setup Wizard: http://openvigile.site

While the wizard is simple and interactive, the API is simpler, with short endpoints and query params.

OpenVigile Wizard API: http://api.openvigile.site

### 3. Manual Setup
Manual setup is the same verbose and traditional method.

#### Agent:

1. Clone the repository
   ```sh
   git clone https://github.com/devAyushDubey/OpenVigile-COS.git
   ```
2. Copy OpenVigile-Agent to the target instance where the instrumented application is hosted
3. Enter directory:
   ```sh
   cd OpenVigile-Agent
   ```
4. If needed for your use case, perform your modifications to the config files in the folder and finally run
   ```sh
   docker compose up -d
   ```
   Do not forget to change to your desired port and enter you OpenVigile Collector Stack's address in the cofiguration files.

#### Collector Stack:

1. Clone the repository
   ```sh
   git clone https://github.com/devAyushDubey/OpenVigile-COS.git
   ```
2. Copy OpenVigile-CollectorStack to the target instance where it will be hosted
3. Enter directory:
   ```sh
   cd OpenVigile-CollectorStack
   ```
4. If needed for your use case, perform your modifications to the config files in the folder and finally run
   ```sh
   docker compose up --no-build -d
   ```
   You can now access the services that you included and on the ports you mentioned in the config files and compose.

## Architecture
![Blank diagram (1)](https://github.com/devAyushDubey/OpenVigile-COS/assets/33064931/b014c95a-c8b6-4733-a132-3dc27d948c33)
