import React, { useState } from 'react'
import GenericLayout from './components/layouts/GenericLayout/GenericLayout'
import LandingForm from './components/sections/LandingForm'
import CharacterQuestion from './components/sections/CharacterQuestion'
import QuizQuestions from './components/sections/QuizQuestions'
import SmileyFaces from './components/sections/SmileyFaces'
import DownloadSection from './components/sections/DownloadSection'

import './App.css'

function App() {
  const [view, setView] = useState('landingForm')
  return (
    <GenericLayout>
      {view === 'landingForm' && <LandingForm setView={setView} />}
      {view === 'characterChoice' && <CharacterQuestion setView={setView} />}
      {view === 'quizQuestions' && <QuizQuestions setView={setView} />}
      {view === 'smileyQuestions' && <SmileyFaces setView={setView} />}
      {view === 'downloadForm' && <DownloadSection setView={setView} />}
    </GenericLayout>
  )
}

export default App
