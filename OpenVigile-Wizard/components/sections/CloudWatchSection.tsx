export default function CloudWatchSection() {

    return(
        <section>
            <h5 className="bd-wizard-step-title">Step 4</h5>
            <h2 className="section-heading">Setup AWS CloudWatch Metric Stream</h2>
            <p>CloudWatch stream enables access to realtime infrastructure performance and health metric data through APIs which also support OTLP format.</p>
            <p>There are multiple steps involved in setting up a stream we will only do the essential ones, complete guide can be found here.</p>
            <p>To set up a CloudWatch metric stream follow the following steps:</p>
            <ol>
                <li>To create and manage metric streams, you must be logged on to an account that has the <code>CloudWatchFullAccess</code> policy and the <code>iam:PassRole permission</code>, or you can use an admin account just for testing the implementation</li>
                <li>In the navigation pane, choose Metrics, Streams. Then choose Create metric stream</li>
                <li>Choose the CloudWatch metric namespaces to include in the metric stream.
                <ul>
                    <li>To include all or most of your metric namespaces in the metric stream, choose All namespaces. Then, if you want to exclude some metric namespaces from the stream, choose Exclude metric namespaces and select the namespaces to exclude. If you specify a namespace in Exclude metric namespaces, all metrics in that namespace are excluded from the stream.</li>
                    <li>To include only a few metric namespaces in the metric stream, choose Selected namespaces and then select the namespaces to include.</li>
                </ul>
                </li>
                <li>Under Configuration, choose Select an existing Firehose owned by your account. The Kinesis Data Firehose delivery stream must be in the same account. The default format for this option is OpenTelemetry, but you can change the format later in this procedure.<br />Then select the Kinesis Data Firehose delivery stream to use under Select your Kinesis Data Firehose delivery stream.</li>
                <li>Later, under Change Output Format, select JSON</li>
                <li>Lastly, create a metric stream name</li>
                <li>And, good to go, wait for the stream to be created and check the your Kinesis Firehose delivery stream's (created in Step 3.1) monitoring tab for a confirmation of recieving metric stream data</li>
            </ol>
        </section>
    )
}