import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import FormTitle from "@/components/form/FormTitle";
import SubmitButton from "@/components/form/SubmitButton";



const createProfileAction = async (prevState: any, formData: FormData) => {
    'use server';
    const firstName = formData.get('firstName') as string;
    console.log(firstName);
    return { message: 'Profile created!'}
}

function CreateProfilePage() {
  return (
      <section className="max-w-2xl mx-auto">
          <FormTitle title="Create Your Profile" />
          <div>
              <FormContainer action={createProfileAction}>
                  <div className="grid grid-cols-2 gap-3">
                    <FormInput required type="text" name="firstName" label="First Name"  />
                    <FormInput required type="text" name="lastName" label="Last Name" />
                  </div>
                  <FormInput required type="text" name="username" label="Username" />
                  <SubmitButton />
              </FormContainer>
          </div>
    </section>
  )
}

export default CreateProfilePage