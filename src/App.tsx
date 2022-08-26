import React, { useEffect, useState } from 'react'
import GenericLayout from './components/layouts/GenericLayout/GenericLayout'
import LandingForm from './components/sections/LandingForm'
import CharacterQuestion from './components/sections/CharacterQuestion'
import QuizQuestions from './components/sections/QuizQuestions'
import SmileyFaces from './components/sections/SmileyFaces'
import SuccessPage from './components/sections/SuccessPage'
import ManageDownloads from './components/sections/ManageDownloads'

import './App.css'

export const VIEWS = {
  LANDING: 'landingForm',
  CHARACTER: 'characterChoice',
  QUIZ: 'quizQuestions',
  SMILEY: 'smileyQuestions',
  SUCCESS: 'successPage',
  MANAGE: 'manageDownloads',
}

const App: React.FC<null> = () => {
  const [view, setView] = useState(VIEWS.LANDING)
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [view])
  return (
    <GenericLayout>
      {view === VIEWS.LANDING && <LandingForm setView={setView} />}
      {view === VIEWS.CHARACTER && <CharacterQuestion setView={setView} />}
      {view === VIEWS.QUIZ && <QuizQuestions setView={setView} />}
      {view === VIEWS.SMILEY && <SmileyFaces setView={setView} />}
      {view === VIEWS.SUCCESS && <SuccessPage />}
      {view === VIEWS.MANAGE && <ManageDownloads />}
    </GenericLayout>
  )
}

export default App
