import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import SubmitButton from "@/components/form/SubmitButton";
import H2 from "@/components/titles/H2";
import { createCategory, fetchCategories } from "@/utils/actions";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode } from "react";

async function CategoriesPage() {
  const categoryData: any =  await fetchCategories();
  const categories = categoryData?.ok ? categoryData?.categories : null;
  



  return (
      <main>
        <FormContainer title="Create Category" action={createCategory}>
          <FormInput formType="input" type="text" name="name" required />
          <FormInput formType="textarea" name="description" required={false}  />
          <FormInput formType="input" type="number" name="order" required={false} className="max-w-24" defaultValue={0} />
          <SubmitButton className="mt-3" text='Create'  />
        </FormContainer>
      <hr className="my-12 max-w-2xl mx-auto" />
      <div className="max-w-2xl mx-auto">

        <H2 content="All Categories" />
        <div className="flex flex-col gap-2">
        {categories && categories.length > 0 ? categories.map((c:any) => {
          return <div key={c.id}>{c.name}</div>
        }): <p>No category yet.</p>}
        </div>
        </div>
      </main>
    );
  }
  
export default CategoriesPage;
  