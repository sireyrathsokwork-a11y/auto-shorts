'use client';

import { ButtonCus } from '@/components/ButtonCus';
import { StatusTag } from '@/components/StatusTag';
import { Video } from '@autoshorts/db/generated/prisma/client';
import { CalendarClock, Check, RefreshCcw } from 'lucide-react';
import {  useState } from 'react';
import { toast } from 'sonner';

const Card = ({ label, value }: { label: string; value: string | number }) => {
  return (
    <div className=' flex flex-col gap-2 w-full '>
      <p className=' text-sm font-semibold text-zinc-400'>
        {label.toUpperCase()}
      </p>
      <p>{value}</p>
    </div>
  );
};

const NextVideo = ({ video }: { video: Video }) => { 
  const [btnLoading, setBtnLoading] = useState({
    approve: false,
    regenerate: false,
    reschedule: false,
  });

  if (!video.videoUrl) return <p>Video is unavailable</p>;

  const handleVideoApproval = async (action: 'approve' | 'regenerate' | 'reschedule') => {
    const token = new URLSearchParams(window.location.search).get('token');

    if (!token) {
    toast.error('No token found');
      return;
    }

    setBtnLoading({
      approve: false,
      regenerate: false,
      reschedule: false,
      [action]: true, 
    });

    try {
      const res = await fetch(`/api/decision?token=${token}`, {
        method: 'POST',
        body: JSON.stringify({ action }),
      });
      const data = await res.json();

      if (res.ok) {
      toast.success(`Video ${action}d!`);
      } else {
        toast.error('Error: ' + data.message);
      }
    } catch (error) {
      toast.error('Failed to ' + action);
      console.error(error);
    }  finally {
      setBtnLoading({
        approve: false,
        regenerate: false,
        reschedule: false,
      });
  
    }
  };

  return (
    <main className=''>
      <section className=' flex justify-between border rounded-t-lg p-6 bg-zinc-900'>
        <div>
          <p>Next Scheduled Video</p>
          <p className=' text-zinc-400 text-sm mt-1'>
            Awaiting your approval before render
          </p>
        </div>

        <StatusTag status={video.status} />
      </section>

      <section className=' flex border rounded-b-lg p-6 gap-6'>
        <video
          controls
          style={{ height: '450px' }}
        >
          <source
            src={video.videoUrl}
            type='video/mp4'
          />
        </video>

        <div className=' flex flex-col w-full gap-10'>
          <p className=' font-semibold text-xl'>{video.title}</p>

          <div className=' flex justify-around w-full'>
            <Card
              label='scenes'
              value={(video?.scenes as Array<unknown>)?.length ?? 0}
            />

            <Card
              label='duration'
              value={'00:31'}
            />

            <Card
              label='Created at'
              value={video.createdAt.toLocaleDateString()}
            />

            <Card
              label='Posts At'
              value={'7:00 PM'}
            />
          </div>

          {/* buttons  */}
          <div className=' flex flex-col gap-3'>
            <div className=' flex gap-2'>
              <ButtonCus
                loading={btnLoading.approve}
                disabled={
                  btnLoading.approve ||
                  btnLoading.regenerate ||
                  btnLoading.reschedule
                }
                size={'xl'}
                btnName='Approve'
                icon={<Check />}
                onClick={() => handleVideoApproval('approve')}
              />
              <ButtonCus
                loading={btnLoading.regenerate}
                disabled={
                  btnLoading.approve ||
                  btnLoading.regenerate ||
                  btnLoading.reschedule
                }
                size={'xl'}
                btnName='Regenerate'
                variant={'outline'}
                icon={<RefreshCcw />}
                onClick={() => handleVideoApproval('regenerate')}
              />
            </div>

            <ButtonCus
              loading={btnLoading.reschedule}
              disabled={
                btnLoading.approve ||
                btnLoading.regenerate ||
                btnLoading.reschedule
              }
              size={'xl'}
              btnName='Reschedule'
              variant={'outline'}
              icon={<CalendarClock />}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default NextVideo;
