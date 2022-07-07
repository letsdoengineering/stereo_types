import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import GenericLayout from '../components/layouts/GenericLayout/GenericLayout'
import CharacterQuestion from '../components/sections/proj/CharacterQuestion'

const IndexPage: React.FC = () => {
  const formFns = useForm()
  return (
    <FormProvider {...formFns}>
      <GenericLayout>
        <CharacterQuestion />
      </GenericLayout>
    </FormProvider>
  )
}

export default IndexPage
