import './styles/globals.css';
import * as React from "react";
import Link from "next/link";
import Image from 'next/image';
import LimitProvider from '../components/LimitProvider';
import { Logo } from '.';
import { Mbs } from '../../public/mbs';
import { UserButton } from "@clerk/nextjs";
import { ClerkProvider } from '@clerk/nextjs'
import { RiSettings4Fill } from "react-icons/ri";
import { Constants } from '../../public/constants';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { getApiLimitCount } from '../../prisma/api-limit';
import { checkSubscription } from '../../libs/subscription';
import { CrispProvider } from '../components/crisp-provider';
import {Button} from "@nextui-org/react";

const font = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plus_jakarta_sans',
  weight: ['200', '300', '400', '500', '600', '700', '800']
});

export default async function RootLayout({children}) {
  const isPro = await checkSubscription();
  const apiLimitCount =  await getApiLimitCount();
  const MAX_FREE_COUNTS = await Constants();
  const MEGABYTES = await Mbs();

  return (
    <ClerkProvider>
      <html lang="en" className={font.variable + 'light bg-white w-full h-full'}>
          <body className={font.variable + `w-full h-full`}>
            {/* <header style={{width: '30vw'}} className='bg-none w-[100px] md:flex items-center ml-auto mr-auto justify-between'>
              <Link href="/" className="max-auto">
                <Image src={Logo} alt="Logo" width={90} height={90}/>
              </Link>
              <div className='flex flex-row gap-x-2 items-center'>
                <UserButton/>
                <Link href="/settings" className="max-auto flex flex-row items-center">
                  <Button size='sm' isIconOnly color="white" aria-label="Settings">
                    <RiSettings4Fill size={35} color='#953AE7'/>
                  </Button>
                </Link>
              </div>
            </header> */}
            <div className='w-full h-full'>
              {/* <hr style={{marginBottom: 10}}/> */}
              <LimitProvider apiLimitCount={apiLimitCount} isPro={isPro} maxvid={MAX_FREE_COUNTS}>
                {children}
              </LimitProvider>
              <CrispProvider/>
            </div>
          </body>
      </html>
    </ClerkProvider>
  );
}