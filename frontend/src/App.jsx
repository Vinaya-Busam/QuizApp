import { useState } from 'react'
import { useEffect } from 'react';
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import api from "./services/api";
import './App.css'

function App() {

    useEffect(() => {

        api.get("/api/getAllQuizzes")
            .then(response => {
                console.log("Quizzes:", response.data);
            })
            .catch(error => {
                console.error("API Error:", error);
            });

    }, []);

    return (
        <div>
            <h1>Quiz App</h1>
            <p>Frontend connected to React.</p>
        </div>
    );
}

export default App;
