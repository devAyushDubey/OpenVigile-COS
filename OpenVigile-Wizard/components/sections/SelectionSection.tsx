
export default function SelectionSection({ updateChoice }: any) {


    return (
        <section>
            <h5 className="bd-wizard-step-title">Step 2</h5>
            <h2 className="section-heading">Select a telemetry source </h2>
            <p>A telemetry source is any application that emits signals or can be instrumented to emit signals. It is these signals that you wish to observe.</p>
            <div className="purpose-radios-wrapper">
                <div className="purpose-radio">
                    <input type="radio" name="purpose" id="branding" className="purpose-radio-input" value="Branding" defaultChecked/>
                    <label htmlFor="branding" className="purpose-radio-label" onClick={() => updateChoice("aws")}>
                        <span className="label-icon">
                            <img src="/icon_aws.png" alt="branding" className="label-icon-default aws" />
                            <img src="/icon_aws_blue.png" alt="branding" className="label-icon-active aws" />
                        </span>
                        <span className="label-text">AWS CloudWatch</span>
                    </label>
                </div>
                <div className="purpose-radio">
                <input type="radio" name="purpose" id="mobile-design" className="purpose-radio-input" value="Moile Design"/>
                <label htmlFor="mobile-design" className="purpose-radio-label" onClick={() => updateChoice("kafka")}>
                  <span className="label-icon">
                    <img src="/icon_kafka.png" alt="branding" className="label-icon-default kafka" />
                    <img src="/icon_kafka_blue.png" alt="branding" className="label-icon-active kafka" />
                  </span>
                  <span className="label-text">Kafka</span>
                </label>
              </div>
              <div className="purpose-radio">
                <input type="radio" name="purpose" id="web-design" className="purpose-radio-input" value="Web Design" />
                <label htmlFor="web-design" className="purpose-radio-label" onClick={() => updateChoice("js")}>
                  <span className="label-icon">
                    <img src="/icon_js.png" alt="branding" className="label-icon-default aws" />
                    <img src="/icon_js_blue.png" alt="branding" className="label-icon-active aws" />
                  </span>
                  <span className="label-text">JavaScript</span>
                </label>
              </div>
              <div className="purpose-radio">
                <input type="radio" name="purpose" id="python" className="purpose-radio-input" value="Python" />
                <label htmlFor="python" className="purpose-radio-label" onClick={() => updateChoice("python")}>
                  <span className="label-icon">
                    <img src="/icon_python.png" alt="branding" className="label-icon-default aws" />
                    <img src="/icon_python_blue.png" alt="branding" className="label-icon-active aws" />
                  </span>
                  <span className="label-text">Python</span>
                </label>
              </div>
              <div className="purpose-radio">
                <input type="radio" name="purpose" id="more" className="purpose-radio-input" value="more" />
                <label htmlFor="more" className="purpose-radio-label" onClick={() => updateChoice("more")}>
                  <span className="label-icon">
                    <img src="/icon_plus.png" alt="branding" className="label-icon-default aws" />
                    <img src="/icon_plus_blue.png" alt="branding" className="label-icon-active aws" />
                  </span>
                  <span className="label-text">More</span>
                </label>
              </div>
            </div>
        </section>
    )
}