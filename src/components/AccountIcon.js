import React from 'react'
import { AccountFil } from '../app';
import Link from "next/link";
import Image from 'next/image';

const AccountIcon = () => {
  return (
    <div>
      <Link href="/account" className="max-auto">
          <Image src={AccountFil} alt="Home" width={25} height={25}/>
      </Link>
    </div>
  )
}

export default AccountIcon;