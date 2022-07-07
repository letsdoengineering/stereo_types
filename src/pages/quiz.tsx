import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import GenericLayout from '../components/layouts/GenericLayout/GenericLayout'
import QuizQuestions from '../components/sections/proj/QuizQuestions'

const IndexPage: React.FC = () => {
  const formFns = useForm()
  return (
    <FormProvider {...formFns}>
      <GenericLayout>
        <QuizQuestions />
      </GenericLayout>
    </FormProvider>
  )
}

export default IndexPage
