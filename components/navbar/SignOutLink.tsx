'use client';

import { SignOutButton } from '@clerk/nextjs';
import { useToast } from '@/hooks/use-toast';

function SignOutLink() {
  const { toast } = useToast();
  const handleSignOut = () => {
    toast({ description: 'You are successfully logged out!'})
  }
  return (
    <SignOutButton redirectUrl='/'>
      <button onClick={handleSignOut}>
        Sign Out 
      </button>
    </SignOutButton>
  )
}

export default SignOutLink