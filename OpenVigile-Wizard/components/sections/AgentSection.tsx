import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import LinearProgress from "@mui/material/LinearProgress";
import Radio, { RadioProps } from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField"
import { styled } from "@mui/material/styles";
import { useState } from "react"


const BpIcon = styled('span')(({ theme }) => ({
    borderRadius: '50%',
    width: 16,
    height: 16,
    boxShadow:
      theme.palette.mode === 'dark'
        ? '0 0 0 1px rgb(16 22 26 / 40%)'
        : 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: theme.palette.mode === 'dark' ? '#394b59' : '#f5f8fa',
    backgroundImage:
      theme.palette.mode === 'dark'
        ? 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))'
        : 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      backgroundColor: theme.palette.mode === 'dark' ? '#30404d' : '#ebf1f5',
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background:
        theme.palette.mode === 'dark' ? 'rgba(57,75,89,.5)' : 'rgba(206,217,224,.5)',
    },
  }));

const BpCheckedIcon = styled(BpIcon)({
    backgroundColor: '#137cbd',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: '#106ba3',
    },
  });

function BpRadio(props: RadioProps) {
return (
    <Radio
    disableRipple
    color="default"
    checkedIcon={<BpCheckedIcon />}
    icon={<BpIcon />}
    {...props}
    />
);
}

let endpoint: String

export default function AgentSection() {

    let [logs,setLogs] = useState(false)
    let [metrics,setMetrics] = useState(false)
    let [traces,setTraces] = useState(false)


    let [portsDone,setPortsDone] = useState(false)
    let [scriptReq,setScriptReq] = useState(false)
    let [scriptRes,setScriptRes] = useState(false)
    let [endpChoice,setEndpChoice] = useState('noDomain')
    let [url,setUrl] = useState('http://localhost:8365/agent/script?address=')

    let [logsPort,setLogsPort] = useState('4318')
    let [metricsPort,setMetricsPort] = useState('4318')
    let [tracesPort,setTracesPort] = useState('4318')

    const getScript = () => {
        setScriptReq(true)
        setScriptRes(false)

        
        let add = 'http://localhost:8365/agent/script?address=' + endpoint

        if(logsPort!='4318' || metricsPort!='4318' || tracesPort!='4318') add = add + '&'
    
        if(logsPort!='4318') add = add + `logs=${logsPort}`
        if(metricsPort!='4318'){
            if(logsPort!='4318') add = add + `&metrics=${metricsPort}`
            else add = add + `metrics=${metricsPort}`
        }
        if(tracesPort!='4318'){
            if(logsPort!='4318' || metricsPort!='4318') add = add + `&traces=${tracesPort}`
            else add = add + `traces=${tracesPort}`
        }

        setUrl(`${add}`)

        fetch('http://localhost:8365/agent/status')
        .then((res) => res.status)
        .then((status) => {
            if(status==200)
                setScriptRes(true)
        })
        .catch((err) => {
            console.log(err.message);
        });
        
        
    }

    function setPorts(signal: String,port: any) {
        setScriptReq(false)

        const regExp = /^[0-9]+$/;

        if(!regExp.test(port.toString()) && port!='')
            return
        
        if(Number(port) < 1)
            port = '1'

        if(Number(port) > 65535)
            port = '65535'

        switch(signal){
            case "logs":
                setLogsPort(port)
                break
            case "metrics":
                setMetricsPort(port)
                break
            case "traces":
                setTracesPort(port)
                break 
        }
    }

    function setEndpoint(endp: String) {
        endpoint = endp
    }

    return (
        <section>
            <h5 className="bd-wizard-step-title">Step 5</h5>
            <h2 className="section-heading mb-5">Setup OpenVigile Grafana Agent</h2>
            <p>Grafana Agent is a vendor-neutral, batteries-included telemetry collector with configuration inspired by Terraform. It is designed to be flexible, performant, and compatible with multiple ecosystems such as Prometheus and OpenTelemetry.</p>
            <p>OpenVigile offers a single command deployment of Grafana Agent with ready-made configurations and a user friendly UI to go up and running in seconds.</p>
            <p>OpenVigile Stack utilizes the powerful Grafana Agent to receive OTLP signals from instrumented applications, perform processing or transformations if needed and export them to OpenVigile Stack's OpenTelemetry Collectors. More specifically it provides vendor-neutral programmable observability pipelines.</p>
            <h5><b>Follow below steps to setup OpenVigile Grafana Agent on your instance:</b></h5>
            <ol className="mt-3">
                <li>
                    <p>Select signals to collect:</p>
                    <div className="form-check form-switch mt-2">
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
                    <p>Enter ports to listen for: <blockquote>Your instrumented application should send OTLP signals on these ports respectively</blockquote></p>
                    {logs?<TextField sx={{marginRight:"20px"}} required id="outlined-number" type="number" label="Logs" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} onChange={(e)=>{setPorts('logs',e.target.value)}} value={logsPort}/>:null}
                    {metrics?<TextField sx={{marginRight:"20px"}} required id="outlined-number" type="number" label="Metrics" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} onChange={(e)=>{setPorts('metrics',e.target.value)}} value={metricsPort}/>:null}
                    {traces?<TextField required id="outlined-number" type="number" label="Traces" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} onChange={(e)=>{setPorts('traces',e.target.value)}} value={tracesPort}/>:null}
                </li>
                :null}
                {(logs||metrics||traces)&&portsDone?
                <li>
                    <p>Enter OpenVigile Collector Stack endpoint:<blockquote>This is the address of the OpenVigile Collector Stack setup done in last step (Step 4). It is where the agent directs all the signals, which is listened by the collector's receivers. <br /> Eg:   <code>http://openvigile.com</code> <br /> If you don't have a domain that points to the port through a reverse-proxy, you can provide instance's IP with the port, just for testing, <br /> Like: <code>http://127.0.32.21:4318</code></blockquote></p>
                    <FormControl>
                        <RadioGroup defaultValue="noDomain" aria-labelledby="demo-customized-radios" name="customized-radios" onChange={(e)=>{console.log(e.target.value);setEndpChoice(e.target.value)}}>
                            <div>
                                <FormControlLabel value="noDomain" control={<BpRadio />} label="No domain, work with IP and ports" /> <br />
                                {endpChoice=='noDomain'?<TextField required id="outlined-required" label="HTTP Endpoint" onChange={(e)=>{setEndpoint(e.target.value)}}/>:null}
                            </div>
                            <div>
                                <FormControlLabel value="Domain" control={<BpRadio />} label="Have a domain that points to the collector OTLP port via reverse-proxy" /> <br />
                                {endpChoice=='Domain'?<TextField required id="outlined-required" label="HTTP Endpoint" onChange={(e)=>{setEndpoint(e.target.value)}}/>:null}
                            </div>
                        </RadioGroup>
                    </FormControl><br />
                    <Button variant="outlined" className='ports-button' id='ports' onClick={getScript}>Done</Button>
                </li>
                :null}
                {scriptReq?
                <li>
                    {scriptRes?<>
                    <p>Install the agent on your instance using the following command:</p>
                    <code className="codeBlock">curl {url}</code>
                    <p>Or,</p>
                    <p style={{display:"inline"}}>You can also download your shell script here:</p>
                    <Button variant="contained" className='download-button' id='ports' onClick={()=>{window.open(url,"_blank")}}>Download</Button>
                    </>
                    :
                    <div style={{padding:"0.7rem"}}>
                        <LinearProgress />
                    </div>}
                </li>
                :null}
            </ol>
            {scriptRes?<p><b>Wizard offers an easy single-command installation, but does not offer all the modifications and flexibility. Use the configuration approach for the flexibility and to utilize all the features of Grafana Agent.</b></p>:null}
        </section>
    )
}