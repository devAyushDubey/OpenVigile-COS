"use client";

import 'bootstrap/dist/css/bootstrap.css'
import Head from "next/head";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import { styled } from '@mui/material/styles';
import StepLabel from '@mui/material/StepLabel';
import { StepIconProps } from '@mui/material/StepIcon';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import IntroSection from '@/components/sections/IntroSection';
import SelectionSection from '@/components/sections/SelectionSection';
import FirehoseSection from '@/components/sections/FirehoseSection';
import InstrumentSection from '@/components/sections/InstrumentSection';
import AgentSection from '@/components/sections/AgentSection';
import Button from '@mui/material/Button';
import { useState } from 'react';
import CloudWatchSection from '@/components/sections/CloudWatchSection';
import CollectorSection from '@/components/sections/CollectorSection';
import Alert from '@mui/material/Alert';


const steps = ['1', '2', '3','4','5'];


const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    width: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  }),
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <p className='stepLogo'>1</p>,
    2: <p className='stepLogo'>2</p>,
    3: <p className='stepLogo'>3</p>,
    4: <p className='stepLogo'>4</p>,
    5: <p className='stepLogo'>5</p>
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

let source: String = "aws"
let reason: String = "signal"

export default function Home() {

  
  const [section,setSection] = useState([<IntroSection />])
  const [errorSignal,setErrorSignal] = useState(false)
  const [check,setCheck] = useState(false)
  
  function setReason(rsn: string){
    reason=rsn
  }


  function addSection() {

    switch(section[section.length - 1].type.name){
      case "IntroSection":
        section.push(<SelectionSection updateChoice={(choice: String) => updateChoice(choice)}/>)
        setSection([...section])
        break
      case "SelectionSection":
        switch(source){
          case "aws":
            section.push(<FirehoseSection />)
            setSection([...section])
            break
          default:
            section.push(<InstrumentSection />)
            setSection([...section])
            break
        }
        break
      case "FirehoseSection":
        section.push(<CloudWatchSection />)
        setSection([...section])
        break
      case "InstrumentSection":
        section.push(<CollectorSection check={(status: boolean)=>setCheck(status)} setReason={(rsn: string)=>{setReason(rsn)}}/>)
        setSection([...section])
        break
      case "CollectorSection":
        if(check){
          setCheck(false)
          section.push(<AgentSection />)
          setSection([...section])
        }
        else{
          setErrorSignal(true)
          setTimeout(()=>{setErrorSignal(false)},5000)
        }
        break
    }
  }

  function removeSection() {
    section.pop()
    setSection([...section])
  }
  
  function updateChoice(choice: String) {
    source = choice
  }


  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>OpenVigile Setup Wizard</title>
        <link rel="icon" href="/OpenFav.svg" sizes="any" />
      </Head>
      <body>
        <header>
          <nav className="navbar navbar-expand-sm navbar-light bg-white">
            <div className="container">
              <a className="navbar-brand" href="#">
                <img src="/openvigilelogo.svg" alt="logo"/>
              </a>
              <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId"
                aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="collapsibleNavId">
                <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                  <li className="nav-item">
                    <a className="nav-link" href="#">Home</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">About</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">Contact</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
        {errorSignal?
            <Alert className='alerts' variant="filled" severity="error">
              Please select alteast one signal.
            </Alert>
            :null}
        <main className="d-flex align-items-center">
          <div className="container">
            <Stepper activeStep={section.length - 1} connector={<ColorlibConnector />} orientation='vertical' >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel StepIconComponent={ColorlibStepIcon}></StepLabel>
                </Step>
              ))}
            </Stepper>
            <div className="wizard">
              {section[section.length - 1]}
              <div className='actions'>
                {section.length>1?<Button variant="outlined" className='action-button' id='prev' onClick={removeSection}>Previous</Button>:null}
                <Button variant="contained" className='action-button' id='next' onClick={addSection}>Next</Button>
              </div>
            </div>
          </div>
        </main>
        <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
        <script src="public/steps.js"></script>
        <script src="public/wizard.js"></script>
      </body>
    </>
  )
}
