import React, { createContext, useState } from 'react'
import generateAIResponse from '../gemini'

export const UserContext = createContext()

function UserContextProvider({children}) {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    let [speaking, setSpeaking] = useState(false)
    let [prompt, setPrompt] = useState("listening...")
    let[response,setResponse]=useState(false)

    const login = (email, password) => {
        // TODO: Implement actual authentication logic
        setUser({ email })
        setIsAuthenticated(true)
    }

    const logout = () => {
        setUser(null)
        setIsAuthenticated(false)
    }


    function speak(text){
        let text_speak = new SpeechSynthesisUtterance(text)
        text_speak.volume = 1;
        text_speak.rate = 1
        text_speak.pitch = 1
        text_speak.lang = "eng-US"
        
        const setVoice = () => {
            const voices = window.speechSynthesis.getVoices()
            const maleVoice = voices.find(voice => 
                voice.lang === "hi-GB" && 
                (voice.name.toLowerCase().includes("male") || 
                 voice.name.toLowerCase().includes("männlich") || 
                 voice.name.toLowerCase().includes("masculino"))
            )
            text_speak.voice = maleVoice || voices.find(voice => voice.lang === "hi-GB") || null
        }
        
        if (window.speechSynthesis.getVoices().length === 0) {
            window.speechSynthesis.onvoiceschanged = setVoice
        } else {
            setVoice()
        }
        
        window.speechSynthesis.speak(text_speak)
    }

    async function aiResponse(prompt){
        const text = await generateAIResponse(prompt);
        let newText = text
            .split("**").join("")
            .split("*").join("")
            .replace(/Gemini/gi, "Jeetu 2.0")
            .replace(/Google/gi, "Jeetendra Kumar");
        setPrompt(newText)
        speak(newText)
        setResponse(true)
    }

    let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    let recognition = new speechRecognition()
    recognition.onresult = (e) => {
        let currentIndex = e.resultIndex
        let transcript = e.results[currentIndex][0].transcript
        setPrompt(transcript)
        takeCommand(transcript.toLowerCase())
        setTimeout(()=>{
            setSpeaking(false)
        },10000)

        function takeCommand(command){ 
            if(command.includes("open")&& command.includes("youtube"))
                {
                    window.open("https://www.youtube.com/", "_blank");

                    speak("opening youtube..command byJeetu2.0")
                    setPrompt("opening youtube... Commmand by Jeetu2.0")
                    setTimeout(()=>{
                        setSpeaking(false)
                    },10000)
            }
            else{
                aiResponse(command)
            }
            if(command.includes("open")&& command.includes("instagram"))
                {
                    window.open("https://www.instagram.com/", "_blank");

                    speak("opening instagram..command byJeetu2.0")
                    setPrompt("opening instagram... Commmand by Jeetu2.0")
                    setTimeout(()=>{
                        setSpeaking(false)
                    },10000)
            }
            else{
                aiResponse(command)
            }
        }
        
    }

    let value = {
        user,
        isAuthenticated,
        login,
        logout,
        speak,
        recognition,
        aiResponse,
        speaking,
        setSpeaking,
        prompt,
        setPrompt,
        response,
        setResponse
    }


    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider
