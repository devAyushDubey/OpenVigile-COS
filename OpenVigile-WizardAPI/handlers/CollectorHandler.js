import fs, { readFileSync } from  'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import yaml from 'yaml'
import 'dotenv/config'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getCollectorDocker(otlp,prom,elastic,ovapi,jaeger,dash,id) {

    try{
        const compose = yaml.parse(readFileSync(path.resolve(__dirname,'../assets/collectorFiles/docker-compose.yml'),'utf-8'))

        compose.services.otelcol.ports[compose.services.otelcol.ports.indexOf('OTLP_PORT')] = otlp?`${otlp}:${otlp}`:'4318:4318'
        compose.services.prometheus.ports[compose.services.prometheus.ports.indexOf('PROM_PORT')] = prom?`${prom}:${prom}`:'9090:9090'
        compose.services.prometheus.command[compose.services.prometheus.command.indexOf('--web.listen-address=:PROM_PORT')] = prom?`--web.listen-address=:${prom}`:'--web.listen-address=:9090'
        compose.services.jaeger.command[compose.services.jaeger.command.indexOf('http://prometheus:PROM_PORT')] = prom?`http://prometheus:${prom}`:'http://prometheus:9090'
        compose.services.elasticsearch.ports[compose.services.elasticsearch.ports.indexOf('ELASTIC_PORT')] = elastic?`${elastic}:${elastic}`:'4200:4200'
        compose.services.elasticsearch.environment[compose.services.elasticsearch.environment.indexOf('http.port=ELASTIC_PORT')] = elastic?`http.port=${elastic}`:'http.port=4200'
        compose.services.openvigileapi.environment[compose.services.openvigileapi.environment.indexOf('API_PORT=OV_API_PORT')] = ovapi?`API_PORT=${ovapi}`:'API_PORT=6300'
        compose.services.jaeger.ports[compose.services.jaeger.ports.indexOf('JAEGER_PORT')] = jaeger?`${jaeger}:16686`:'16686:16686'
        compose.services.grafana.ports[compose.services.grafana.ports.indexOf('DASH_PORT')] = dash?`${dash}:${dash}`:'3000:3000'
        compose.services.grafana.environment[compose.services.grafana.environment.indexOf('GF_SERVER_HTTP_PORT=DASH_PORT')] = dash?`GF_SERVER_HTTP_PORT=${dash}`:'GF_SERVER_HTTP_PORT=3000'

        console.log(compose)

        const sub = id.split('.')
        id = sub.join('_')
        fs.mkdirSync(path.resolve(__dirname,`../assets/collector/compose/${id}`),{ recursive: true })
        fs.writeFileSync(path.resolve(__dirname,`../assets/collector/compose/${id}/docker-compose.yml`),yaml.stringify(compose))

        return path.resolve(__dirname,`../assets/collector/compose/${id}/docker-compose.yml`)
    }
    catch(e) {console.log(e)}
    
}

function getPrometheus() {

    return path.resolve(__dirname,`../assets/collectorFiles/prometheus-config.yml`)
}

function getCollectorConfig(otlp,elastic,id) {

    try{
        const config = yaml.parse(readFileSync(path.resolve(__dirname,'../assets/collectorFiles/otelcol-config.yml'),'utf-8'))

        config.receivers.otlp.protocols.http.endpoint = otlp?`localhost:${otlp}`:'localhost:4318'
        config.exporters['elasticsearch/log'].endpoints[0] = elastic?`http://elasticsearch:${elastic}`:'http://elasticsearch:9200'

        console.log(config)

        const sub = id.split('.')
        id = sub.join('_')
        fs.mkdirSync(path.resolve(__dirname,`../assets/collector/config/${id}`),{ recursive: true })
        fs.writeFileSync(path.resolve(__dirname,`../assets/collector/config/${id}/otelcol-config.yml`),yaml.stringify(config))

        return path.resolve(__dirname,`../assets/collector/config/${id}/otelcol-config.yml`)
    }
    catch(e) {console.log(e)}
    
}

function getCollectorScript(otlp,prom,elastic,ovapi,jaeger,dash,id){

    try{
        let script = readFileSync(path.resolve(__dirname,'../assets/collectorFiles/install-ovcs.sh'),'utf-8')

        let docker = `${process.env.BASE_URL}/collector/docker`
        let config = `${process.env.BASE_URL}/collector/config`
        let promConfig = `${process.env.BASE_URL}/collector/prometheus`
        let grafana = `${process.env.BASE_URL}/collector/grafana`

        if(otlp || prom || elastic || ovapi || jaeger || dash) docker = docker + '?'

        if(otlp || elastic) config = config + '?'

        if(otlp) {
            docker = docker + `otlp=${otlp}`
            config = config + `otlp=${otlp}`
        }
        if(prom){
            if(otlp) docker = docker + `&prometheus=${prom}`
            else docker = docker + `prometheus=${prom}`
        }
        if(elastic){
            if(otlp) config = config + `&elastic=${elastic}`
            else config = config + `elastic=${elastic}`

            if(otlp || prom) docker = docker + `&elastic=${elastic}`
            else docker = docker + `elastic=${elastic}`
        }
        if(ovapi){
            if(otlp || prom || elastic) docker = docker + `&ovapi=${ovapi}`
            else docker = docker + `ovapi=${ovapi}`
        }
        if(jaeger){
            if(otlp || prom || elastic || ovapi) docker = docker + `&jaeger=${jaeger}`
            else docker = docker + `jaeger=${jaeger}`
        }
        if(dash){
            if(otlp || prom || elastic || ovapi || jaeger) docker = docker + `&dash=${dash}`
            else docker = docker + `dash=${dash}`
        }

        grafana = grafana + docker.split(`${process.env.BASE_URL}/collector/docker`)[1]

        script = script.replace('BASEURL/collector/prometheus',promConfig)
        script = script.replace('BASEURL/collector/docker',docker)
        script = script.replace('BASEURL/collector/config',config)
        script = script.replace('BASEURL/collector/grafana',grafana)
        script = script.replace('OTLPPORTS', `http://localhost:${otlp?otlp:4318}`)

        const sub = id.split('.')
        id = sub.join('_')
        fs.mkdirSync(path.resolve(__dirname,`../assets/collector/script/${id}`),{ recursive: true })
        fs.writeFileSync(path.resolve(__dirname,`../assets/collector/script/${id}/install-ovcs.sh`),script)

        console.log(script)

        return path.resolve(__dirname,`../assets/collector/script/${id}/install-ovcs.sh`)
    }
    catch(e) { console.log(e)}
    

}

function getGrafanaProvision(dash,prom,elastic,id) {

    try{
        let script = yaml.parse(readFileSync(path.resolve(__dirname,'../assets/collectorFiles/openvigile.yml'),'utf-8'))

        script.datasources[0].url = prom?`http://prometheus:${prom}`:'http://prometheus:9090'
        script.datasources[0].jsonData.exemplarTraceIdDestinations[1].url = dash?`http://localhost:${dash}` + "/explore?orgId=1&left=%5B%22now-1h%22,%22now%22,%22Jaeger%22,%7B%22query%22:%22$${__value.raw}%22%7D%5D":"http://localhost:3000/explore?orgId=1&left=%5B%22now-1h%22,%22now%22,%22Jaeger%22,%7B%22query%22:%22$${__value.raw}%22%7D%5D"
        script.datasources[2].url = elastic?`http://elasticsearch:${elastic}`:'http://elasticsearch:9200'

        const sub = id.split('.')
        id = sub.join('_')
        fs.mkdirSync(path.resolve(__dirname,`../assets/collector/script/${id}`),{ recursive: true })
        fs.writeFileSync(path.resolve(__dirname,`../assets/collector/script/${id}/openvigile.yml`), yaml.stringify(script))

        console.log(script)

        return path.resolve(__dirname,`../assets/collector/script/${id}/openvigile.yml`)
    }
    catch(e) {console.log(e)}
    
}

export {getCollectorDocker,getPrometheus,getCollectorConfig,getCollectorScript,getGrafanaProvision}
