import React, { useContext } from 'react'
import "./App.css"
import jeetu from "./assets/jeetu2.0.jpg"
import { CiMicrophoneOn } from 'react-icons/ci'
import { UserContext } from './context/UserContext'
import speakGif from "./assets/speak.gif"
import gif from "./assets/aiVoice.gif"


function App() {
  const {
    recognition,
    speaking,
    setSpeaking,
    prompt,
    response,
    setPrompt,
    setResponse,
    isAuthenticated
  } = useContext(UserContext)
  
  return (
    <div className='main'>
      <img src={jeetu} alt='' id='jeetu'/>
      <span>I'm Jeetu2.0, Your Advanced Virtual Assistant</span>
      
     
        <>
          {!speaking ? 
            <button onClick={() => {
              setPrompt("listening...")
              setSpeaking(true)
              setResponse(false)
              recognition.start()
            }}>
              Click here <CiMicrophoneOn/></button>
          :
            (
            <div className='response'>
              {!response?
              <img src={speakGif} alt="S" id="speaking" />
            :
            <img src={gif} alt="" id="gif" />}
              
              <p>{prompt}</p>
            </div>
          )}
        </>
      

    
    </div>
  )
}

export default App
