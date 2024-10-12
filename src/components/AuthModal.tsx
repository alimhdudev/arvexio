"use client";

import React, { useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { 
  useSessionContext, 
  useSupabaseClient
} from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';

import useAuthModal from "../../hooks/useAuthModal";

import Modal from './Modal';
import { RiGradienterFill } from 'react-icons/ri';

interface AuthModalProps {
  isOpen: boolean;
}

const AuthModal = () => {
  const { session } = useSessionContext();
  const router = useRouter();
  const { onClose, isOpen } = useAuthModal();
  
  const supabaseClient = useSupabaseClient();

  useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [session, router, onClose]);

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  }

    return (
      <Modal 
        title="Arvex" 
        description="Elevate your content with AI-Powered Captions" 
        isOpen={isOpen}
        onChange={onChange}
      >
        <div className='xs:w-[60vw] md:w-[40vw] xl:w-[20vw] mx-auto my-auto '>
          <Auth
            supabaseClient={supabaseClient}
            providers={['google']}
            magicLink={false}
            localization={{
              variables: {
                sign_in: {
                  email_label: '',
                  password_label: '',
                  email_input_placeholder: 'Your email address',
                  password_input_placeholder: 'Your strong password',
                },
                sign_up: {
                  email_label: '',
                  password_label: '',
                  email_input_placeholder: 'Your email address',
                  password_input_placeholder: 'Your strong password',
                },
              },
            }}        
            appearance={{
              style: {
                button: { borderRadius: '11px'},
                input: { borderRadius: '11px', marginBottom: '-10vw' },
                // anchor: { color: 'blue' },
                //..
              },      
              theme: ThemeSupa,  
              variables: {
                default: {
                  colors: {
                    brand: '#6D00D7',
                    brandAccent: '#953AE7',
                    
                  }
                }
              }
            }}
            theme="light"
          />
        </div>
      </Modal>
  )

}

export default AuthModal;
