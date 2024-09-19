/* eslint-disable @next/next/no-img-element */
'use server'
import { fetchProfileImage } from '@/utils/actions';
import { LuUser2 } from 'react-icons/lu'
 
 async function UserIcon() {
  const imageUrl = await fetchProfileImage();
 
  return (
    <div className="w-6 h-6 flex items-center justify-center rounded-full border border-slate-200">
      {imageUrl ? 
        <img src={imageUrl} alt="profile image" className='object-cover min-h-full min-w-full' />
      :  <LuUser2 />
      }
      </div>
 
  )
}

export default UserIcon