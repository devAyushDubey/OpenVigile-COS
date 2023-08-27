import express from "express"
import 'dotenv/config'
import logger from "../index.js"

const router = express.Router();

router.get('/', (req,res)=>{
    res.send("OpenVigile Collector Stack API: Access stored observability signals (logs,metrcs,traces) from ElasticSearch, Prometheus and Jaeger under single API.<br> Logs: /logs/    --ElasticSearch API  <br>  Metrics: /metrics/     --Prometheus API   <br>   Traces: /traces/    --Jaeeger API")
})

router.get('/metrics*', async (req,res)=>{

    const payload = req.url.split('/metrics')[1]

    const resp = await (await fetch(`http://prometheus:${process.env.METRICS || 9090}/api/v1` + payload)).json()

    console.log(resp)

    res.status(200).send(resp)
})

router.get('/logs*', async (req,res)=>{

    const payload = req.url.split('/logs')[1]

    const resp = await (await fetch(`http://elasticsearch:${process.env.LOGS || 9200}` + payload)).text()

    console.log(resp)

    res.set('content-type','text/plain')
    res.status(200).send(resp)
})

router.get('/traces*', async (req,res)=>{

    res.status(200).send("Jaeger Tracing does not provide any HTTP API. Explore traces through main Grafana dashboard (default: 3000) or Jaeger dashboard (default: 16686).")
})


export default router