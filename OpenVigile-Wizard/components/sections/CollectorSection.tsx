import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import LinearProgress from "@mui/material/LinearProgress"
import TextField from "@mui/material/TextField"
import { useState } from "react"


export default function CollectorSection({ check }: any) {

    let [logs,setLogs] = useState(false)
    let [metrics,setMetrics] = useState(false)
    let [traces,setTraces] = useState(false)
    let [port,setPort] = useState(false)

    let [scriptReq,setScriptReq] = useState(false)
    let [scriptRes,setScriptRes] = useState(false)
    let [url,setUrl] = useState('http://localhost:8365/collector/script')

    let [otlpPort,setOtlpPort] = useState('4318')
    let [ovPort,setOvPort] = useState('6300')
    let [promPort,setPromPort] = useState('9090')
    let [elasticPort,setElasticPort] = useState('9200')
    let [jaegerPort,setJaegerPort] = useState('16686')
    let [dashPort,setDashPort] = useState('3000')
    
    let [signalEr,setSignalEr] = useState('form-switch')

    function setPorts(name: String, portNo: String) {

        const regExp = /^[0-9]+$/;

        if(!regExp.test(portNo.toString()) && portNo!='')
            return
        
        if(Number(portNo) < 1)
            portNo = '1'

        if(Number(portNo) > 65535)
            portNo = '65535'

        switch(name) {
            case "otlp":
                setOtlpPort(`${portNo}`)
                break
            case "ov":
                setOvPort(`${portNo}`)
                break
            case "prom":
                setPromPort(`${portNo}`)
                break
            case "elastic":
                setElasticPort(`${portNo}`)
                break
            case "jaeger":
                setJaegerPort(`${portNo}`)
                break
            case "dash":
                setDashPort(`${portNo}`)
                break
        }
    }


    function getScript() {
        setScriptReq(true)
        setScriptRes(false)

        let turl = 'http://localhost:8365/collector/script'

        if(otlpPort!='4318' || ovPort!='6300' || promPort!='9090' || elasticPort!='9200' || jaegerPort!='16686' || dashPort!='3000'){
            turl = turl + '?'
            // console.log(url)
        }

        if(otlpPort!='4318') turl = turl + `otlp=${otlpPort}`
        if(ovPort!='6300'){
            if(otlpPort!='4318') turl = turl + `&ovapi=${ovPort}`
            else turl = turl + `ovapi=${ovPort}`
        }
        if(promPort!='9090'){
            if(otlpPort!='4318' || ovPort!='6300') turl = turl + `&prometheus=${promPort}`
            else turl = turl + `prometheus=${promPort}`
        }
        if(elasticPort!='9200'){
            if(otlpPort!='4318' || ovPort!='6300' || promPort!='9090') turl = turl + `&elastic=${elasticPort}`
            else turl = turl + `elastic=${elasticPort}`
        }
        if(jaegerPort!='16686'){
            if(otlpPort!='4318' || ovPort!='6300' || promPort!='9090' || elasticPort!='9200') turl = turl + `&jaeger=${jaegerPort}`
            else turl = turl + `jaeger=${jaegerPort}`
        }
        if(dashPort!='3000'){
            if(otlpPort!='4318' || ovPort!='6300' || promPort!='9090' || elasticPort!='9200' || jaegerPort!='16686') turl = turl + `&dash=${dashPort}`
            else turl = turl + `dash=${dashPort}`
        }

        setUrl(`${turl}`)

        fetch('http://localhost:8365/collector/status')
        .then((res) => res.status)
        .then((status) => {
            if(status==200)
                setScriptRes(true)
                check(true)
        })
        .catch((err) => {
            console.log(err.message);
        });

        console.log(url)

    }

    return (
        <section>
            <h5 className="bd-wizard-step-title">Step 4</h5>
            <h2 className="section-heading mb-5">Setup OpenVigile Collector Stack</h2>
            <p>OpenVigile Collector Stack is based out of OpenTelemetry Collector. It is pre-configured to listen for OTLP signals. It provides separate persistent storage to logs, metrics and traces which results in faster access, it provides APIs with plethora of filters and features, it visualizes and gives control of the signals through some really capable and powerful dashboards, all under one single roof.</p>
            <p>Here's what OpenVigile Collector Stack architecture looks like:</p>
            <p>Pre-Requisites:</p>
            <ul>
                <li>An instance (EC2, Droplet, etc.)</li>
                <li>Docker and Docker Compose</li>
                <li>Super User Privileges</li>
            </ul>
            <p><b>To setup OpenVigile Collector Stack on your instance follow the below steps:</b></p>
            <ol>
                <li>
                    <p>Select types of signals to receive:</p>
                    <div className={`form-check ${signalEr} mt-2`}>
                        <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={(e)=>{setLogs(e.target.checked)}}/>
                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Logs</label>
                    </div>
                    <div className="form-check form-switch mt-2">
                        <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={(e)=>{setMetrics(e.target.checked)}}/>
                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Metrics</label>
                    </div>
                    <div className="form-check form-switch mt-2">
                        <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={(e)=>{setTraces(e.target.checked)}}/>
                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Traces</label>
                    </div>
                </li>
                {logs||metrics||traces?
                <li>
                    <p>Enter port for receiving OTLP signals: <blockquote>The OpenVigile Grafana Agent should send OTLP signals on this port. Eg: http://{'<'}your-instance-ip{'>'}:PORT would be where the agent sends data.</blockquote></p>
                    <TextField sx={{marginRight:"20px"}} required id="outlined-number" type="number" label="Port" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} onChange={(e)=>{setPorts("otlp",e.target.value)}} value={otlpPort}/>
                </li>
                :null}
                {logs||metrics||traces?<>
                <li>
                    <p>Enter desired ports for APIs and Dashboard: </p>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        {logs||metrics||traces?<>
                        <Grid item xs={3}>
                            <p style={{display:"inline-block",paddingTop:"0.8rem",marginRight:"1rem"}}>OpenVigile API:</p>
                        </Grid>
                        <Grid item xs={9}>
                            <TextField sx={{marginRight:"20px"}} required id="outlined-number" type="number" label="Port" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} onChange={(e)=>{setPorts("ov",e.target.value)}} value={ovPort}/>
                        </Grid>
                        </>:null}
                        {metrics?<>
                        <Grid item xs={3}>
                            <p style={{display:"inline-block",paddingTop:"0.8rem",marginRight:"1rem"}}>Prometheus API & Dashboard:</p>
                        </Grid>
                        <Grid item xs={9}>
                            <TextField sx={{marginRight:"20px"}} required id="outlined-number" type="number" label="Port" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} onChange={(e)=>{setPorts("prom",e.target.value)}} value={promPort}/>
                        </Grid>
                        </>:null}
                        {logs?<>
                        <Grid item xs={3}>
                            <p style={{display:"inline-block",paddingTop:"0.8rem",marginRight:"1rem"}}>ElasticSearch API:</p>
                        </Grid>
                        <Grid item xs={9}>
                            <TextField sx={{marginRight:"20px"}} required id="outlined-number" type="number" label="Port" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} onChange={(e)=>{setPorts("elastic",e.target.value)}} value={elasticPort}/>
                        </Grid>
                        </>:null}
                        {traces?<>
                        <Grid item xs={3}>
                            <p style={{display:"inline-block",paddingTop:"0.8rem",marginRight:"1rem"}}>Jaeger API & Dashboard:</p>
                        </Grid>
                        <Grid item xs={9}>
                            <TextField sx={{marginRight:"20px"}} required id="outlined-number" type="number" label="Port" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} onChange={(e)=>{setPorts("jaeger",e.target.value)}} value={jaegerPort}/>
                        </Grid>
                        </>:null}
                    </Grid>
                    {/* <p style={{display:"inline-block",paddingTop:"0.8rem",marginRight:"1rem"}}>Prometheus API & Dashboard:</p><TextField sx={{marginRight:"20px"}} required id="outlined-number" type="number" label="Port" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}/> */}
                </li>
                <li>
                    <p>Enter desired port for Main Dashboard (Grafana): </p>
                    <TextField sx={{marginRight:"20px"}} required id="outlined-number" type="number" label="Port" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} onChange={(e)=>{setPorts("dash",e.target.value)}} value={dashPort}/>
                    <Button variant="outlined" className='ports-button' id='ports' onClick={()=>{getScript()}}>Done</Button>
                </li>
                </>:null}
                {(logs||metrics||traces)&&scriptReq?
                <li>
                    {scriptRes?<>
                    <p>Install OpenVigile Collector Stack on your instance using the following command:</p>
                    <code className="codeBlock">curl {url}</code>
                    <p>Or,</p>
                    <p style={{display:"inline"}}>You can also download your shell script here:</p>
                    <Button variant="contained" className='download-button' id='ports'>Download</Button>
                    </>
                    :
                    <div style={{padding:"0.7rem"}}>
                        <LinearProgress />
                    </div>}
                </li>
                :null}
            </ol>
            {scriptRes?<p><b>Wizard offers an easy single-command installation, but does not offer all the modifications and flexibility. Use the configuration approach for the flexibility and to utilize all the features of OpenVigile Collector Stack.</b></p>:null}
        </section>
    )
}