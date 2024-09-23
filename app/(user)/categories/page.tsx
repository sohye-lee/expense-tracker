'use client';
import FormInput from "@/components/form/FormInput";
import SubmitButton from "@/components/form/SubmitButton";
import H2 from "@/components/titles/H2";
import { createCategory, fetchCategories } from "@/utils/actions";
import { Category } from "@/utils/types";
import { MouseEvent, useEffect, useState } from "react";
import { Cross1Icon, PlusIcon } from "@radix-ui/react-icons"
import FormTitle from "@/components/form/FormTitle";
import { useToast } from "@/hooks/use-toast";
import CategoryItem from "./categoryItem";

const initialState = {
    message: '',
}


function CategoriesPage() {
  const { toast } = useToast();

  const [categories, setCategories] = useState<Category[]>();
  const [open, setOpen] = useState(false);
  
   const fetchData = async () =>  {
     const data = await fetchCategories();
     if (data && data?.categories) setCategories(data?.categories);
   }
  
  const addCategory = async (formData: FormData) => {
     const data = await createCategory(formData);
     if (data?.ok) {
       setOpen(false);
       await fetchData();
     }
    
    data?.message && toast({ description: data?.message });
  }
  
 
  // const [state, formAction] = useFormState(, initialState);
  const closeModal = (e:MouseEvent) => {
     setOpen(false);
   }

   useEffect(() => {
     fetchData();
   }, [ setCategories ])


  return (
    <main>
      <div className="max-w-2xl mx-auto flex flex-col gap-4">
        <div className="flex align-items mb-4 justify-between">
          <H2 content="Categories" /> 
          <button className="bg-blue-800 text-white h-8 w-16 flex items-center justify-center rounded-[4px]" onClick={() => setOpen(true)}><PlusIcon /></button>
        </div>
        <div className="flex flex-col gap-2">
        {categories && categories.length > 0 ? categories.map((c:any) => {
          return <CategoryItem key={c.id} category={c} />
        }): <span>No category yet.</span>}
        </div>
      </div>

      {/* MODAL */}
      {open && 
      <div className="modal fixed top-0 left-0 bg-[rgba(0,0,0,.1)] w-full h-full flex items-center justify-center z-50" id="modal">
        
        <div className="max-w-xl w-full p-8 rounded-[4px] bg-white relative">
          <div className="text-blue-800 absolute top-8 right-8 cursor-pointer" onClick={closeModal}>
            <Cross1Icon />
          </div>
            <form action={addCategory} className=" bg-white">
              <FormTitle title="Add a Category" />
              <FormInput formType="input" type="text" name="name" required />
              <FormInput formType="textarea" name="description" required={false}  />
              <FormInput formType="input" type="number" name="order" required={false} className="max-w-24" defaultValue={0} />
              <div className="flex items-stretch gap-2">
                <button onClick={() => setOpen(false)} className="mb-0 bg-slate-100 flex items-center justify-center px-3  mt-3 border text-blue-900 hover:bg-slate-400 hover:text-white">Cancel</button>    
                <SubmitButton className="mt-3" text='Create'  />
              </div>
          </form>
        </div>
      </div>
      }
      {/* MODAL ENDS */}
    </main>
    );
  }
  
export default CategoriesPage;
  