import fs, { readFileSync } from  'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import yaml from 'yaml'
import 'dotenv/config'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


function getAgentDocker(logs,metrics,traces,id) {

    try{
        const compose = yaml.parse(readFileSync(path.resolve(__dirname,'../assets/agentFiles/docker-compose.yml'),'utf-8'))

        const added = []

        let isFirst = true
        const ports = [logs,metrics,traces]

        for(let port of ports){
            if(port && port!='4318' && added.indexOf(port)<0){
                if(isFirst){
                    compose.services.agent.ports[compose.services.agent.ports.indexOf('4318:4318')] = `${port}:${port}`
                    isFirst = false
                    added.push(port)
                }
                else{
                    compose.services.agent.ports.push(`${port}:${port}`)
                    added.push(port)
                }
            } 
        }

        const sub = id.split('.')
        id = sub.join('_')
        fs.mkdirSync(path.resolve(__dirname,`../assets/agent/compose/${id}`),{ recursive: true })
        fs.writeFileSync(path.resolve(__dirname,`../assets/agent/compose/${id}/docker-compose.yml`),yaml.stringify(compose))

        return path.resolve(__dirname,`../assets/agent/compose/${id}/docker-compose.yml`)
    }
    catch(e) {console.log(e)}
    
}

function getAgentConfig(logs,metrics,traces,add,id) {
    
    try{
        const ports = []

        if(logs) ports.push({name:"logs",port:logs})
        if(metrics) ports.push({name:"metrics", port:metrics})
        if(traces) ports.push({name:"traces", port:traces})

        console.log(ports)

        let config = readFileSync(path.resolve(__dirname,'../assets/agentFiles/config.river'),'utf-8')

        switch(ports.length){
            case 0:
                config = config.replace('ADD',add)
                console.log(config)
                break
            case 1:
                config = readFileSync(path.resolve(__dirname,'../assets/agentFiles/config1.river'),'utf-8')
                config = config.replace('PORT',ports[0].port)
                config = config.replace('SIGNAL',ports[0].name)
                config = config.replace('ADD',add)
                console.log(config)
                break
            case 2:
                if(ports[0].port == ports[1].port){
                    config = readFileSync(path.resolve(__dirname,'../assets/agentFiles/config1.river'),'utf-8')
                    config = config.replace('PORT',ports[0].port)
                    config = config.replace('SIGNAL = [otelcol.exporter.otlphttp.default.input]',`${ports[0].name} = [otelcol.exporter.otlphttp.default.input]\n    ${ports[1].name} = [otelcol.exporter.otlphttp.default.input]`)
                    config = config.replace('ADD',add)
                    console.log(config)
                }
                else{
                    config = readFileSync(path.resolve(__dirname,'../assets/agentFiles/config2.river'),'utf-8')
                    config = config.replace('SIGNAL1',ports[0].name)
                    config = config.replace('SIGNAL1',ports[0].name)
                    config = config.replace('PORT1',ports[0].port)
                    config = config.replace('SIGNAL2',ports[1].name)
                    config = config.replace('SIGNAL2',ports[1].name)
                    config = config.replace('PORT2',ports[1].port)
                    config = config.replace('ADD',add)
                    console.log(config)
                }
                break
            case 3:
                if((ports[0].port == ports[1].port) && (ports[1].port == ports[2].port)){
                    config = readFileSync(path.resolve(__dirname,'../assets/agentFiles/config1.river'),'utf-8')
                    config = config.replace('PORT',ports[0].port)
                    config = config.replace('SIGNAL = [otelcol.exporter.otlphttp.default.input]',`${ports[0].name} = [otelcol.exporter.otlphttp.default.input]\n    ${ports[1].name} = [otelcol.exporter.otlphttp.default.input]\n    ${ports[2].name} = [otelcol.exporter.otlphttp.default.input]`)
                    config = config.replace('ADD',add)
                    console.log(config)
                }
                else if(ports[0].port == ports[1].port){
                    config = readFileSync(path.resolve(__dirname,'../assets/agentFiles/config2.river'),'utf-8')
                    config = config.replace('SIGNAL1',ports[0].name + "_" + ports[1].name)
                    config = config.replace('SIGNAL1 = [otelcol.exporter.otlphttp.default.input]',`${ports[0].name} = [otelcol.exporter.otlphttp.default.input]\n    ${ports[1].name} = [otelcol.exporter.otlphttp.default.input]`)
                    config = config.replace('PORT1',ports[0].port)
                    config = config.replace('SIGNAL2',ports[2].name)
                    config = config.replace('SIGNAL2',ports[2].name)
                    config = config.replace('PORT2',ports[2].port)
                    config = config.replace('ADD',add)
                    console.log(config)
                }
                else if(ports[1].port == ports[2].port){
                    config = readFileSync(path.resolve(__dirname,'../assets/agentFiles/config2.river'),'utf-8')
                    config = config.replace('SIGNAL1',ports[1].name + "_" + ports[2].name)
                    config = config.replace('SIGNAL1 = [otelcol.exporter.otlphttp.default.input]',`${ports[1].name} = [otelcol.exporter.otlphttp.default.input]\n    ${ports[2].name} = [otelcol.exporter.otlphttp.default.input]`)
                    config = config.replace('PORT1',ports[1].port)
                    config = config.replace('SIGNAL2',ports[0].name)
                    config = config.replace('SIGNAL2',ports[0].name)
                    config = config.replace('PORT2',ports[0].port)
                    config = config.replace('ADD',add)
                    console.log(config)
                }
                else if(ports[0].port == ports[2].port){
                    config = readFileSync(path.resolve(__dirname,'../assets/agentFiles/config2.river'),'utf-8')
                    config = config.replace('SIGNAL1',ports[0].name + "_" + ports[2].name)
                    config = config.replace('SIGNAL1 = [otelcol.exporter.otlphttp.default.input]',`${ports[0].name} = [otelcol.exporter.otlphttp.default.input]\n    ${ports[2].name} = [otelcol.exporter.otlphttp.default.input]`)
                    config = config.replace('PORT1',ports[0].port)
                    config = config.replace('SIGNAL2',ports[1].name)
                    config = config.replace('SIGNAL2',ports[1].name)
                    config = config.replace('PORT2',ports[1].port)
                    config = config.replace('ADD',add)
                    console.log(config)
                }
                else{
                    config = readFileSync(path.resolve(__dirname,'../assets/agentFiles/config3.river'),'utf-8')
                    config = config.replace('SIGNAL1',ports[0].name)
                    config = config.replace('SIGNAL1',ports[0].name)
                    config = config.replace('PORT1',ports[0].port)
                    config = config.replace('SIGNAL2',ports[1].name)
                    config = config.replace('SIGNAL2',ports[1].name)
                    config = config.replace('PORT2',ports[1].port)
                    config = config.replace('SIGNAL3',ports[2].name)
                    config = config.replace('SIGNAL3',ports[2].name)
                    config = config.replace('PORT3',ports[2].port)
                    config = config.replace('ADD',add)
                    console.log(config)
                }
                break
        }

        const sub = id.split('.')
        id = sub.join('_')
        fs.mkdirSync(path.resolve(__dirname,`../assets/agent/config/${id}`),{ recursive: true })
        fs.writeFileSync(path.resolve(__dirname,`../assets/agent/config/${id}/config.river`),config)

        return path.resolve(__dirname,`../assets/agent/config/${id}/config.river`)
    }
    catch(e) {console.log(e)}

    
}

function getAgentScript(logs,metrics,traces,add,id){

    try{
        let script = readFileSync(path.resolve(__dirname,'../assets/agentFiles/agent.sh'),'utf-8')

        let docker = `${process.env.BASE_URL}/agent/docker`
        let config = `${process.env.BASE_URL}/agent/config?address=${add}`

        if(logs || metrics || traces) {
            docker = docker + '?'
            config = config + '&'
        }

        if(logs) {
            docker = docker + `logs=${logs}`
            config = config + `logs=${logs}`
        }
        if(metrics){
            if(logs){ 
                docker = docker + `&metrics=${metrics}`
                config = config + `&metrics=${metrics}`
            }
            else {
                docker = docker + `metrics=${metrics}`
                config = config + `metrics=${metrics}`
            }
        }
        if(traces){
            if(logs || metrics) {
                docker = docker + `&traces=${traces}`
                config = config + `&traces=${traces}`
            }
            else {
                docker = docker + `traces=${traces}`
                config = config + `traces=${traces}`
            }
        }

        script = script.replace('BASEURL/agent/docker',docker)
        script = script.replace('BASEURL/agent/config',config)
        script = script.replace('OTLPPORTS', `Logs:\t${logs?logs:4318}\nMetrics:\t${metrics?metrics:4318}\nTraces:\t${traces?traces:4318}`)

        const sub = id.split('.')
        id = sub.join('_')
        fs.mkdirSync(path.resolve(__dirname,`../assets/agent/script/${id}`),{ recursive: true })
        fs.writeFileSync(path.resolve(__dirname,`../assets/agent/script/${id}/install-ovg-agent.sh`),script)

        // console.log(script)

        return path.resolve(__dirname,`../assets/agent/script/${id}/install-ovg-agent.sh`)
    }
    catch(e) {console.log(e)}
    

}

export {getAgentConfig,getAgentDocker,getAgentScript}