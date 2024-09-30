'use client'
import { useToast } from "@/hooks/use-toast";
import { editSubCategory } from "@/utils/actions";
import { SubCategory } from "@/utils/types"
import { CheckIcon } from "@radix-ui/react-icons";
import { useState } from "react"

function SubcategoryItem({ parentId, subcategory }: { parentId: string; subcategory: SubCategory }) {
    const { toast } = useToast();
    const [newName, setNewName] = useState(subcategory.name);
    const updateSubCategory = async (formData: FormData) => {
        
        const data = await editSubCategory(subcategory.id, formData);
        if (data && data?.message) {
            toast({ description: data?.message });
        }
    }

    return (
        <form action={updateSubCategory} className="w-full group relative">
            <input id="name" name="name" onChange={(e) => setNewName(e.target.value.toLowerCase())} key={subcategory.id} className='peer relative capitalize bg-transparent w-full   border border-slate-200 hover:border-blue-800 hover:text-blue-900 hover:bg-white placeholder:capitalize text-sm px-3 py-1 rounded-md' defaultValue={subcategory.name} />
            <input hidden id="parentId" name="parentId" value={parentId} />
            <button type="submit" disabled={subcategory.name == newName} className='absolute top-[50%] z-10 right-1 -translate-y-[50%] aspect-square hidden peer-focus:flex bg-blue-800 disabled:bg-gray-400 text-white hover:bg-slate-500 rounded-[4px] h-[calc(100%-8px)] items-center justify-center'><CheckIcon /></button>
        </form>
    )
}

export default SubcategoryItem