# OpenVigile - CollectorStack 📚

OpenVigile CollectorStack is a well thought out and architected cluster of frameworks and tools that aid in observing large scale systems. It has been designed on the premises of a deep mapping of industry frameworks based on their performance in handling different telemetry signals, their strengths and weakness, with an ultimate goal of delivering high performance signal retrievals, visualizations and analytics.

### [Installation](https://github.com/devAyushDubey/OpenVigile-COS#installation)

### Components of Collector Stack:
- [OpenTelemetry Collector](https://github.com/open-telemetry/opentelemetry-collector-contrib):
[Logs, Metrics, Traces]
OTel Collector and its features form the basis of the collector stack. Collector stack is based on the `contrib` release of the OpenTelemetry Collector, which is developed as an industry standard for handling OpenTelemetry signals through OTLP protocols. It provides the stack with pipelines from ingestion, to processing and transformations to the expedetion of the data signals.

- [OpenVigile CollectorStackAPI](https://github.com/devAyushDubey/OpenVigile-COS/tree/main/OpenVigile-CollectorStackAPI):
[Logs, Metrics, Traces]
With separate handling of Logs, Metrics and Traces for better performance, we are introduced with three different APIs with three different endpoints for accessing data. CollectorStackAPI focuses exactly on this issue. It provides a single interface by aggregating all the other API endpoints and providing a common address for the three. This also has future prospects of taking up the role of an API gateway.

- [Prometheus](https://prometheus.io/):
[ Metrics ]
Prometheus is a leading open-source metrics monitoring and alerting framework. It offers a TimeStamp Database (TSDB), which is what makes it so suitable for storing and retreiving large chunks metrics data in real time. PromQL which is the query language for the TSDB has remarkable response times and data handling capabilities.

- [Elasticsearch](https://www.elastic.co/):
[ Logs ]
Elasticsearch is inherently a search engine based on the Lucene library, but due to its unparalleled indexing and sharding abilities it had profoundly found applications in a wide range of systems. Elastic APM which is an application monitoring solution utilizes elasticsearch in storing and retreiving observability data. It has a perfect place for storing logs in OpenVigile Collector Stack.

- [Jaeger](https://www.jaegertracing.io/):
[ Traces ]
Distributed tracing observability platforms, such as Jaeger, are essential for modern software applications that are architected as microservices. Jaeger maps the flow of requests and data as they traverse a distributed system. These requests may make calls to multiple services, which may introduce their own delays or errors. Jaeger connects the dots between these disparate components, helping to identify performance bottlenecks, and troubleshoot errors.

- [Grafana](https://grafana.com/):
[Logs, Metrics, Traces]
Collector Stack provides a single dashboard and graphical entry point viz. Grafana. Grafana is an extremely powerful and optimized data vizualization platform with ready-made operational dashboards and a wide range of data injestion support. Prometheus, Jaeger and Elasticsearch are datasources to Grafana in the Collector Stack.
