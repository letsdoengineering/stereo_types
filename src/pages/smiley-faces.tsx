import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import GenericLayout from '../components/layouts/GenericLayout/GenericLayout'
import SmileyFaces from '../components/sections/proj/SmileyFaces'

const IndexPage: React.FC = () => {
  const formFns = useForm()
  return (
    <FormProvider {...formFns}>
      <GenericLayout>
        <SmileyFaces />
      </GenericLayout>
    </FormProvider>
  )
}

export default IndexPage
