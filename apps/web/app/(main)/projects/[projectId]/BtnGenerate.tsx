'use client';
import { generateVideo } from '@/app/lib/generate.client';
import { ButtonCus } from '@/components/ButtonCus';
import { useState } from 'react';
import { toast } from 'sonner';

const BtnGenerate = ({ projectId }: { projectId: string }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);

    const newVideo = async () => {
      try {
        await generateVideo({ projectId });
      } catch (error) {
        toast.error(error as string);
      } finally {
        setLoading(false);
      }
    };

    newVideo();

    console.log('new geneated video', newVideo);
  };

  return (
    <ButtonCus
      btnName='Generate Video'
      loading={loading}
      onClick={handleSubmit}
    />
  );
};

export default BtnGenerate;
