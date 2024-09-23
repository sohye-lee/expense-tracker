import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import FormTitle from "@/components/form/FormTitle";
import SubmitButton from "@/components/form/SubmitButton";
import { upsertProfile, hasProfile } from "@/utils/actions";
 

async function CreateProfilePage() {
  const alreadyExists:any = await hasProfile();
  const profile = alreadyExists?.ok ? alreadyExists?.profile : null;
  const title = alreadyExists?.ok && alreadyExists?.profile ? "Update" : "Create";

  return (
    <FormContainer action={upsertProfile} className="flex flex-col gap-2" title={`${title} Your Profile`}>
        <div className="grid grid-cols-2 space-x-2">
          <FormInput formType="input" required type="text" name="firstName" label="First Name" defaultValue={profile?.firstName ?? ""}  />
          <FormInput formType="input" required type="text" name="lastName" label="Last Name" defaultValue={profile?.lastName || ''}  />
        </div>
        <FormInput formType="input" required type="text" name="username" label="Username" defaultValue={profile?.username || ''}  />
        <div>
          <SubmitButton className="mt-3" text={`${title} Profile`}  />
        </div>
    </FormContainer>
  )
}

export default CreateProfilePage