'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import { getApiLimitCount } from '../../prisma/api-limit';
import Subscribe from './Subscribe';
import UploadForm from './UploadForm';
import { motion } from 'framer-motion';

const LimitProvider = ({ MEGABYTES,MINUTES }) => {
  return (
    <div>
      <motion.div
        style={{ width: '100%', marginLeft: 'auto', marginRight: 'auto' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <section className="text-center mt-6 sm:mt-12 mb-4 sm:mb-8">
          <h1 className="text-center mx-auto text-[#0A0015] font-bold text-xl sm:text-3xl">
            Upload your video
          </h1>
        </section>
      </motion.div>
      <UploadForm MEGABYTES={MEGABYTES} MINUTES={MINUTES}/>
    </div>
  );
};

export default LimitProvider;
