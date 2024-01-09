![OpenVigile](https://github.com/devAyushDubey/OpenVigile-COS/assets/33064931/e22bd382-4eed-4bf7-8eba-46ec512e492c)

OpenVigile is a vendor-agnostic Comprehensive Observability Stack for complex and distributed systems that streamlines systems, applications and infrastructure observability. It incorporates industry standard frameworks, a unique performance-based architecture and a suite of interactive tools.

### OpenVigile COS offers:
- Observability for all telemetry signal types: **Logs, Metrics and Traces**
- **Vendor Independent** Signal Ingestion
- **Industry standard OpenTelemetry** based observability pipelines
- **High scalability**, as it is curated entirely on cloud-native microservices architecture
- A Single extremely **powerful dashboard** for all data sources
- A highly interactive **GUI setup environment**
- Extremely **fast query handling** due to its unique performance centric architecture
- Easy **single-step setup** option
- Single **aggregated API** to manage all signal types
- A highly flexible **config based approach**

## [Demo](http://demo.openvigile.site)

#### OpenVigile Demo 🟢:  http://demo.openvigile.site
**Credentials are default grafana credentials.[Username: admin, Password: admin]**<br>
The demo provides a perspective to the working of OpenVigile. It rightfully represents the capabilities of OpenVigile and proves its high scalability due to its microservices inheritance.

![ov2_page-00012](https://github.com/devAyushDubey/OpenVigile-COS/assets/33064931/25d7b30b-41be-4c0a-9716-fbeaded4224f)

As a signal source we use a highly instrumented cluster of applications and services from OpenTelemetry, which can be [found here](https://github.com/open-telemetry/opentelemetry-demo).
With a kafka distributed messaging queue, we direct all these signals to a specific port which the OpenVigile Agent will listen to. Signals when received by the agent are published to the OpenVigile CollectorStack in real time. The CollectorStack is a curated collection of frameworks and platforms for ingesting, processing/transforming, visualizing and analyzing of the data. It provides a powerful API and Dashboard to access, retrieve or analyze data.



## Setup:

#### OpenVigile Setup Wizard 🟢: http://openvigile.site

#### OpenVigile Wizard API 🟢:  http://api.openvigile.site

## Installation 🛠

One of the unique proposition of OpenVigile is it's easy setup and installation process. It offers 2 methods, based on specific use cases:

- **Single Command Setup:** Fixed ports and frameworks. Less Flexibility.
  
- **Setup Wizard and API _(Recommended)_:** Custom ports and use-case specific architecture. More Flexibility.
  
- **Manual Setup:** Custom ports and custom architecture. Config-based setup offers the best flexibility.

### Pre-requisites:

1. Docker and Docker Compose
2. Sudo Privileges
3. **In case of AWS CloudWatch:**<br>
   The instance that will host OpenVigile Collector Stack must have SSL certificates for injesting CloudWatch metrics and logs streams as per the AWS policies.
4. **In case of application observability:**<br>
   As OpenVigile is based on OpenTelemetry, for it to observe an application it must be Instrumented to emit signals in OpenTelemetry formats and protocols. [See how you can instrument your application](https://opentelemetry.io/docs/instrumentation/)

### 1. Single Command Setup
1. In your Instrumented application, change the publish port of the OpenTelemetry (OTLP) signals to 4318.
2. On your instance that hosts the instrumented application, run the following command:
   ```sh
   source <(curl -s http://api.openvigile.site/agent/script?address=OV_COLLECTOR_ADDRESS)
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
   Do not forget to change to your desired port and enter your OpenVigile Collector Stack's address in the configuration files.

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
   You can now access the services that you included on the ports you mentioned in the config files and compose.

## Architecture
![Blank diagram (2)](https://github.com/devAyushDubey/OpenVigile-COS/assets/33064931/12ee1cc4-e367-43e8-9aae-bffa51561b9a)


## Tech Stack:

- ##### OpenVigile - Agent
   - Docker & Docker Compose
   - Grafana Agent
   - River Config

- ##### OpenVigile - CollectorStack
   - Docker & Docker Compose
   - OpenTelemetry Collector
   - Prometheus
   - Elasticsearch
   - Jaeger
   - Grafana Provisioning, Datasources and Dashboard

- ##### OpenVigile - CollectorStackAPI
   - ExpressJS
   - NodeJS
   - JavaScript
   - Docker and Dockerfile
   - OpenTelemetry Collector
   - YAML Parsing

- ##### OpenVigile - Wizard
   - NextJS
   - ReactJS
   - TypeScript
   - Material UI (MUI)
   - Bootstrap 5

- ##### OpenVigile - WizardAPI
   - Shell Script
   - ExpressJS
   - NodeJS
   - JavaScript
   - File System (fs)
   - YAML Parsing
