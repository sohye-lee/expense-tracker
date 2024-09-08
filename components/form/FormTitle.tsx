import React from 'react'

function FormTitle({title}: {title:string}) {
  return (
      <h1 className="text-2xl mb-3 text-[primary] text-blue-800 -leading-1 capitalize">{title}</h1>
  )
}

export default FormTitle 