import express from "express"
import 'dotenv/config'
import logger from "../index.js"
import { getAgentDocker, getAgentConfig, getAgentScript } from "../handlers/AgentHandler.js";
import { getCollectorDocker, getPrometheus,getCollectorConfig, getCollectorScript, getGrafanaProvision } from "../handlers/CollectorHandler.js";

const router = express.Router();

function validatePorts(req,res,next) {

    try{
        const queries = ['logs','metrics','traces','address','prometheus','elastic','dash','jaeger','ovapi','otlp']
        const keys = Object.keys(req.query)
        
        keys.forEach(key => {

            const regExp = /^[0-9]+$/;

            if(!queries.includes(key)){
                res.send(`Invalid query parameter '${key}'`)
                return
            }
            if(!regExp.test(req.query[key])){
                res.send(`Invalid value for port '${key}'. Provided ${req.query[key]}. Must not conntain any letters or special characters.`)
                return
            }
            if(req.query[key]<1 || req.query[key]>65535){
                res.send(`Invalid value for port '${key}'. Provided ${req.query[key]}. Must be in the range 1-65535`)
                return
            }
        })
        next(req,res)
    }
    catch(e) {console.log(e)}
    
}


router.get('/', (req,res) => {
    logger.debug(`'/' called by ${req.headers['x-forwarded-for'] || req.socket.remoteAddress}`)

    try{
        res.send("OpenVigile Wizard API ⚙")
    }
    catch(e) {console.log(e)}
    
})

router.get('/agent/docker', (req,res) => validatePorts(req,res,(req,res) => {
    logger.debug(`'/agent/docker' called by ${req.headers['x-forwarded-for'] || req.socket.remoteAddress}`)

    try{
        const logs = req.query.logs
        const metrics = req.query.metrics
        const traces = req.query.traces
        res.download(getAgentDocker(logs,metrics,traces,req.headers['x-forwarded-for'] || req.socket.remoteAddress))
    }
    catch(e) {console.log(e)}
}))

router.get('/agent/config', (req,res) => validatePorts(req,res,(req,res) => {
    logger.debug(`'/agent/config' called by ${req.headers['x-forwarded-for'] || req.socket.remoteAddress}`)

    try{
        const logs = req.query.logs
        const metrics = req.query.metrics
        const traces = req.query.traces
        const add = req.query.address

        res.download(getAgentConfig(logs,metrics,traces,add,req.headers['x-forwarded-for'] || req.socket.remoteAddress))
    }
    catch(e) {console.log(e)}
    
    console.log(logs,metrics,traces)
}))

router.get('/agent/script', (req,res) => validatePorts(req,res,(req,res) => {
    logger.debug(`'/agent/script' called by ${req.headers['x-forwarded-for'] || req.socket.remoteAddress}`)

    try{
        const logs = req.query.logs
        const metrics = req.query.metrics
        const traces = req.query.traces
        const add = req.query.address

        res.download(getAgentScript(logs,metrics,traces,add,req.headers['x-forwarded-for'] || req.socket.remoteAddress))
    }
    catch(e) {console.log(e)}
    
}))

router.get('/agent/status', async (req,res) => {
    logger.debug(`'/agent/status' called by ${req.headers['x-forwarded-for'] || req.socket.remoteAddress}`)

    setTimeout(()=>{res.send("Up and running!")},1000)
})

router.get('/collector/status', async (req,res) => {
    logger.debug(`'/collector/status' called by ${req.headers['x-forwarded-for'] || req.socket.remoteAddress}`)

    setTimeout(()=>{res.send("Up and running!")},1000)
    
})

router.get('/collector/docker', (req,res) => validatePorts(req,res,(req,res) => {
    logger.debug(`'/collector/docker' called by ${req.headers['x-forwarded-for'] || req.socket.remoteAddress}`)

    try{
        const otlp = req.query.otlp
        const prom = req.query.prometheus
        const elastic = req.query.elastic
        const ovapi = req.query.ovapi
        const jaeger = req.query.jaeger
        const dash = req.query.dash

        res.download(getCollectorDocker(otlp,prom,elastic,ovapi,jaeger,dash,req.headers['x-forwarded-for'] || req.socket.remoteAddress))
    }
    catch(e) {console.log(e)}
    
}))

router.get('/collector/prometheus', (req,res) => {
    logger.debug(`'/collector/prometheus' called by ${req.headers['x-forwarded-for'] || req.socket.remoteAddress}`)

    try{
        res.download(getPrometheus()) 
    }
    catch(e) {console.log(e)}
})

router.get('/collector/config', (req,res) => validatePorts(req,res,(req,res) => {
    logger.debug(`'/collector/config' called by ${req.headers['x-forwarded-for'] || req.socket.remoteAddress}`)

    try{
        const otlp = req.query.otlp
        const elastic = req.query.elastic

        res.download(getCollectorConfig(otlp,elastic,req.headers['x-forwarded-for'] || req.socket.remoteAddress))
    }
    catch(e) {console.log(e)}
    
}))

router.get('/collector/script', (req,res) => validatePorts(req,res,(req,res) => {
    logger.debug(`'/collector/script' called by ${req.headers['x-forwarded-for'] || req.socket.remoteAddress}`)

    try{
        const otlp = req.query.otlp
        const prom = req.query.prometheus
        const elastic = req.query.elastic
        const ovapi = req.query.ovapi
        const jaeger = req.query.jaeger
        const dash = req.query.dash

        res.download(getCollectorScript(otlp,prom,elastic,ovapi,jaeger,dash,req.headers['x-forwarded-for'] || req.socket.remoteAddress))
    }
    catch(e) {console.log(e)}
    

}))

router.get('/collector/grafana' , (req,res) => validatePorts(req,res,(req,res) => {
    logger.debug(`'/collector/grafana' called by ${req.headers['x-forwarded-for'] || req.socket.remoteAddress}`)
    
    try{
        const dash = req.query.dash
        const elastic = req.query.elastic
        const prom = req.query.prometheus


        res.download(getGrafanaProvision(dash,prom,elastic,req.headers['x-forwarded-for'] || req.socket.remoteAddress))
    }
    catch(e) {console.log(e)}
    
}))

export default router