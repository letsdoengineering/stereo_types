import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import GenericLayout from '../components/layouts/GenericLayout/GenericLayout'
import Survey from '../components/sections/proj/survey'

const IndexPage: React.FC = () => {
  const formFns = useForm()
  return (
    <FormProvider {...formFns}>
      <GenericLayout>
        <Survey />
      </GenericLayout>
    </FormProvider>
  )
}

export default IndexPage
