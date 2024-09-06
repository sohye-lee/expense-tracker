

const createProfileAction = async (formData: FormData) => {
    'use server';
    const firstName = formData.get('firstName') as string;
    console.log(firstName);
}

function CreateProfilePage() {
  return (
      <section>
          <h1 className="text-2xl"></h1>
    </section>
  )
}

export default CreateProfilePage