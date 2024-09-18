import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import FormTitle from "@/components/form/FormTitle";
import SubmitButton from "@/components/form/SubmitButton";
import { createProfileAction, hasProfile } from "@/utils/actions";
 

async function CreateProfilePage() {
  const alreadyExists:any = await hasProfile();
  const profile = alreadyExists?.ok ? alreadyExists?.profile : null;
  const title = alreadyExists?.ok && alreadyExists?.profile ? "Update" : "Create";

  return (
      <section className="max-w-2xl mx-auto">
          <FormTitle title={`${title} Your Profile`} />
          <div>
              <FormContainer action={createProfileAction} className="flex flex-col gap-2">
                  <div className="grid grid-cols-2 space-x-2">
                    <FormInput required type="text" name="firstName" label="First Name" defaultValue={profile?.firstName ?? ""}  />
                    <FormInput required type="text" name="lastName" label="Last Name" defaultValue={profile?.lastName || ''}  />
                  </div>
                    <FormInput required type="text" name="username" label="Username" defaultValue={profile?.username || ''}  />
        
                  <SubmitButton className="mt-3" text={`${title} Profile`}  />
              </FormContainer>
          </div>
    </section>
  )
}

export default CreateProfilePage