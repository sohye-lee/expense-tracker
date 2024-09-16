import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import FormTitle from "@/components/form/FormTitle";
import SubmitButton from "@/components/form/SubmitButton";
import { createProfileAction } from "@/utils/actions";
import { useEffect, useState } from "react";

function CreateProfilePage() {
  
  return (
      <section className="max-w-2xl mx-auto">
          <FormTitle title="Create Your Profile" />
          <div>
              <FormContainer action={createProfileAction} className="flex flex-col gap-2">
                  <div className="grid grid-cols-2 space-x-2">
                    <FormInput required type="text" name="firstName" label="First Name"  />
                    <FormInput required type="text" name="lastName" label="Last Name" />
                  </div>
                    <FormInput required type="text" name="username" label="Username" />
        
                  <SubmitButton className="mt-3" />
              </FormContainer>
          </div>
    </section>
  )
}

export default CreateProfilePage