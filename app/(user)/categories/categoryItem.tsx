'use client';
import FormInput from '@/components/form/FormInput';
import { useToast } from '@/hooks/use-toast';
import { createSubCategory, editCategory, editSubCategory } from '@/utils/actions';
import { Category } from '@/utils/types'
import { PlusIcon, MinusIcon, Pencil2Icon, Pencil1Icon, CheckCircledIcon, CheckIcon, Cross1Icon } from '@radix-ui/react-icons';
import { redirect, useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import SubcategoryItem from './subcategoryItem';

// const initialState = {
//     message: '',
// }

function CategoryItem({ category }: { category: Category }) {
    const router = useRouter();
    const [updated, setUpdated] = useState(false);
    const { toast } = useToast();
    const [itemOpen, setItemOpen] = useState(false);
    const [categoryUpdateFormOpen, setCategoryUpdateFormOpen] = useState(false);
    const [categoryNewName, setCategoryNewName] = useState(category.name);

    const opacity = category.subcategories.length > 0 ? '' : 'opacity-40 disabled';

    // ADD NEW CHILD CATEGORY
    const addSubCategory = async (formData: FormData) => {
        const data = await createSubCategory(formData);
        if (data && data?.message) {
            toast({ description: data?.message });
        }

        setUpdated(true)
        setTimeout(() => {
            setUpdated(false);
            
        }, 500)
        // window.location.href = '/categories'

        router.refresh();
    }

    // EDIT CHILD CATEGORY
    const updateSubCategory = async (id: string, formData: FormData) => {
        const data = await editSubCategory(id, formData);
        if (data && data?.message) {
            toast({ description: data?.message });
        }
        setUpdated(true)
        setTimeout(() => {
            setUpdated(false);
            
        }, 500)
        // window.location.href = '/categories'
    }

    // EDIT PARENT CATEGORY
    const updateCategory = async (formData: FormData) => {
        const data = await editCategory(category.id, formData);
        if (data && data?.message) {
            toast({ description: data?.message });
        }

        setUpdated(true)
        setCategoryUpdateFormOpen(false)
        setTimeout(() => {
            setUpdated(false);
        }, 1000)
        // window.location.href = '/categories'
    }

    // DISABLE EDIT BUTTON WHILE EDITING
    const updateCategoryName = (e:FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        setCategoryNewName(e.currentTarget.value);
    }   
    
    useEffect(() => {
        updated && router.push('/categories');
        router.refresh()
    }, [setUpdated])
 
  return (
        <div className='w-full border-2 border-slate-300 rounded-[4px] bg-slate-100 hover:border-blue-400'>
            <div className="flex items-center justify-between w-full bg-white p-4 py-3 rounded-[4px] gap-2">
              
                <div className='relative h-[32px] flex items-center justify-between pl-3 w-full'>
                    <span className='capitalize h3 font-medium '>
                        {category.name}   
                    </span>
                    {/* OPEN EDIT FORM */}
                  <button onClick={() => setCategoryUpdateFormOpen(true)}><Pencil1Icon /></button>
                  
                  {/* EDIT FORM OPEN ON THE NAME TEXT */}
                  {categoryUpdateFormOpen &&
                    <form action={updateCategory} className='absolute flex items-center top-0 left-0 h-full bg-white justify-between w-full'>
                      <FormInput label="hidden" name="name" required defaultValue={category.name} className="h-[32px] h3 font-medium capitalize placeholder:h4 placeholder:font-medium bg-blue-100 miin-w-full" onChange={updateCategoryName} /> 
                    <div className='flex items-stretch gap-2 absolute right-1 top-[50%] -translate-y-[50%] h-[75%] '>
                        <button type="submit" disabled={category.name == categoryNewName} className='aspect-square bg-blue-800 disabled:bg-gray-400 text-white hover:bg-slate-500 rounded-[4px] flex items-center justify-center'><CheckIcon /></button>
                        <button onClick={() => setCategoryUpdateFormOpen(false)} className=' aspect-square bg-slate-800 text-white hover:bg-slate-500 rounded-[4px] flex items-center justify-center'><Cross1Icon /></button>
                      </div>
                    </form>
                    }
                </div>

                <button className={`outline-none ${opacity}`} onClick={() => setItemOpen((prev) => (!prev))} >
                    {itemOpen ?
                    <MinusIcon className="text-blue-800" width="20" height="20" />:
                    <PlusIcon className="text-blue-800" width="20" height="20" />
                    }
                </button>
            </div>

          {itemOpen &&
          <div className="w-full px-4 py-3 flex flex-col gap-4">
              <form action={addSubCategory} className='flex justify-between items-end gap-2'>
                  <div className='w-full'>
                    <FormInput formType="input" label="hidden" type="text" name="name" required placeholder="Add a new subcategory" className="mb-0 w-full bg-white" />
                  </div>
                  <input hidden type="text" name="parentId" id="parentId" value={category.id} />
                  <button className="button bg-blue-800 text-white px-5 py-2 inline-flex text-sm rounded-[4px]">Add</button>
              </form>
              {category.subcategories.length > 0 &&
              
              <div className="flex flex-col gap-2">
                    {category.subcategories.map((s) => {
                        return <SubcategoryItem subcategory={s} parentId={category.id} key={s.id} /> 
                    })}
              </div>
            }
          </div>
          }
      </div>
  )
}

export default CategoryItem