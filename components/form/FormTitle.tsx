import { cn } from '@/lib/utils'
import React from 'react'

function FormTitle({title, className, rest}: {title:string, className?:string, [key:string]: any}) {
  return (
    <h1 className={cn("text-2xl mb-3 text-[primary] text-blue-800 -leading-1 capitalize", className)} { ...rest}>{title}</h1>
  )
}

export default FormTitle 