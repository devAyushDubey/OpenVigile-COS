
export default function InstrumentSection() {

    return(
        <section>
            <h5 className="bd-wizard-step-title">Step 3</h5>
            <h2 className="section-heading mb-5">Instrument application with OpenTelemetry<br />(pre-requisite)</h2>
            <p>In order to make a system observable, it must be instrumented: That is, code from the system's components must emit traces, metrics, and logs.</p>
            <p>With OpenTelemetry you can instrument applications without being required to modify the source code using automatic instrumentation. If you previously used an APM agent to extract telemetry from your application, Automatic Instrumentation gives you a similar out of the box experience.</p>
            <p>To facilitate the instrumentation of applications even more, you can manually instrument your applications by coding against the OpenTelemetry APIs.</p>
            <p>OpenTelemetry code instrumentation is supported for most of the popular programming languages and frameworks.</p>
            <p>To instrument your applicaion follow the below guides:</p>
            <ul>
            <li><h5 className="font-weight-bold">Automatic (Recommended):</h5> Quick and Easy</li>
            <li><h5 className="font-weight-bold mt-3">Manual:</h5> For special cases</li>
            </ul>
        </section>
    )
}