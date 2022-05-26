import React from 'react'
// import { useForm, FormProvider } from 'react-hook-form'
import GenericLayout from '../components/layouts/GenericLayout/GenericLayout'
import LandingForm from '../components/sections/proj/landingForm'

const IndexPage: React.FC = () => {
  // const formFns = useForm()
  return (
    // <FormProvider {...formFns}>
    <GenericLayout>
      <LandingForm />
    </GenericLayout>
    // </FormProvider>
  )
}

export default IndexPage
