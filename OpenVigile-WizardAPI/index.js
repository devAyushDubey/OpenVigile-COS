import express from 'express'
import winston from "winston"
import 'dotenv/config'
import router from './routes/index.js'
import cors from 'cors'

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "error.log", level: "warn" }),
    new winston.transports.File({ filename: "app.log", level: "debug" }),
  ],
});

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({
  origin: '*'
}));

app.use(router)

const PORT = process.env.PORT


app.listen(PORT , (err) => {
  if(err){
    logger.error(err.toString())
  }else{
    logger.info(`App is listening to port ` + PORT)
  }
});

export default logger