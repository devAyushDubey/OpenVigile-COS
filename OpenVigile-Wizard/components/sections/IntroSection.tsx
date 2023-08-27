
export default function IntroSection() {

    return(
        <section>
            <h5 className="bd-wizard-step-title">Step 1</h5>
            <h2 className="section-heading mb-4">Welcome to OpenVigile Setup Wizard</h2>
            <h3 className="mb-3">Introduction</h3>
            <p>OpenVigile is an end-to-end <b>comprehensive observability stack</b> to streamline the monitoring, visualization, and analyzing of <b>OpenTelemetry-based</b> instrumented systems. It is Open-Source and developed as a part of <b>ContentStack's TechSurf 2023.</b></p>
            <p>It offers a reliable <b>vendor-agnostic</b> solution to signal aggregation with an impressive architecture that categorically handles metrics, logs, and traces through different specialized channels, that results in faster speeds, better flexibility, and scalability.</p>
            <p>Salient features of OpenVigile:</p>
            <ul>
            <li>Supports <b>all observability signals</b> (Logs, Metrics and Traces)</li>
            <li><b>Vendor-Agnostic</b>, can observe any OpenTelemetry intrumented application, infrastructure, cluster, etc.</li>
            <li><b>End-to-end</b> signal management from ingestion to storage to vizualization</li>
            <li><b>Faster</b> than existing solutions due to specialized handling of different signal types</li>
            <li><b>Highly scalable</b>, it is based of microservices architecture</li>
            <li><b>Industry standard</b> communication, as it is built upon OpenTelemetry</li>
            <li><b>Easy</b> configuration based setup</li>
            </ul>
            <p>To know more, GitHub</p>
            <p><b>This setup wizard guides you in setting up OpenVigile on your instance, to observe your target infrastrucure, application, etc. While this wizard eases out the setup process yet it is not the only way to get going, you can do manual setup as well, which provides a configuration based approach.</b></p>
        </section>
    )
}