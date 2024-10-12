import * as Dialog from '@radix-ui/react-dialog';
import { IoMdClose } from 'react-icons/io';
import variant3 from './Variant3.svg';
import LogoDark from './logo_dark.svg'
import Default from './Default.svg'
import Image from 'next/image';
import Arvex from './arvex.svg'
import styles from './modal.module.css'
// import { Logo } from './index'


interface ModalProps {
  isOpen: boolean;
  onChange: (open: boolean) => void;
  title: string;
  description: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onChange,
  title,
  description,
  children
}) => {
  return ( 
    <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <Dialog.Portal>
        <Dialog.Overlay className='bg-[#ffffff]'/>
        <Dialog.Content
          className="
            h-screen
            w-screen 
            z-30
            bg-[#ffffff]
            
        ">
            {/* The full screen */}
            <div className='bg-[#ffffff] flex h-full '>
              <div className='xs:w-[100%] xl:w-[45%] flex flex-col mx-auto z-20'>
              {/* !!! The main model box */}
              <div className='h-fit my-auto z-20'>
                {/* <Image src={Logo} height={110} width={110} alt="logo" className='mx-auto mb-6'/> */}
                <Dialog.Title 
                  className="
                    text-2xl 
                    text-center 
                    font-bold 
                    mb-4 
                    text-[#141414]
                  " 
                >
                  {title}
                </Dialog.Title>
                <Dialog.Description 
                className="
                  mb-5 
                  text-sm 
                  leading-normal 
                  text-center
                  text-[#141414]
                "
                >
                  {description}
                </Dialog.Description>
                {children}
              </div>
              </div>

            {/* The background right side */}
            {/* The end of the right side code */}


            {/* <div className='blurry-green-circle'></div> */}


          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
 
export default Modal;