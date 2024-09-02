import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Logo() {
  return (
    <Link href="/">
        <Image height="60" alt="logo" width="90" src="/logo.svg" />
    </Link>
  )
}

export default Logo