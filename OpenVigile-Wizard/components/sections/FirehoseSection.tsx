
export default function FirehoseSection() {

    return (
        <section>
        <h5 className="bd-wizard-step-title">Step 3</h5>
        <h2 className="section-heading">Setup AWS Kinesis Data Firehose Delivery Stream</h2>
        <p>CloudWatch is an infrastructure monitoring tool by Amazon Web Services.</p>
        <p>A typical implementation of CloudWatch as a telemetry source in OpenVigile stack looks like:</p>
        <p>Pre-Requisites:</p>
        <ul>
            <li>An instance (EC2, Droplet, etc.) with SSL certificates (HTTPS)</li>
            <li>A domain pointing to that instance</li>
            <li>A reverse-proxy (like nginx) to direct HTTPS (:443) traffic to a desired port for OTLP collector</li>
        </ul>
        <p>Kinesis Firehose Delivery Streams can be used to send CloudWatch data streams to desired remote endpoints. We will utilize them to send our infrastructure metrics data to our OpenVigile stack's OpenTelemetry collector OTLP endpoint.</p>
        <p>We'll only be covering the essential steps to get our data streams going, all other options can be explored here.</p>
        <p>To setup a simple Firehose delivery stream follow the following steps:</p>
        <ol>
            <li>Make sure you have the required IAM permissions (check here), or you can use an admin account just for testing the implementation.</li>
            <li>Create an S3 bucket for storing dropped data during transmission in a backup</li>
            <li>Go to https://console.aws.amazon.com/firehose/</li>
            <li>Select Direct PUT as a source</li>
            <li>Select HTTP Endpoint as a destination</li>
            <li>Give your stream a name</li>
            <li>Under Destination Settings, enter an HTTP endpoint URL pointing to the instance where you wish to setup OpenVigile stack.<br /> <blockquote>URL should not be your instance's IP but a domain. SSL must be configured on the instance for that domain and a reverse-proxy to direct HTTPS traffic to a desired port where OpenVigile would recieve the data.</blockquote></li>
            <li>Under Backup Settings, select your S3 bucket or enter the URI</li>
            <li>Click on Create delivery stream and wait for the Firehose stream to be created.</li>
        </ol>
        </section>
    )
}