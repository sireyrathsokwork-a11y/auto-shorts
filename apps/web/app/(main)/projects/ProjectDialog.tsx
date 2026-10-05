'use client';

import { createProject } from '@/app/lib/projects/project.client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Field, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { ButtonCus } from '@/components/ButtonCus';
import { toast } from 'sonner';
import {  ProjectPayload } from '@autoshorts/types';
import { useRouter } from 'next/navigation';
import { MusicTrack } from '@autoshorts/db/generated/prisma/client';
import 'dotenv/config';

export function ProjectDialog({
  musicTrack,
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  musicTrack : MusicTrack[]
}) {

  const router = useRouter()
  const [loading , setLoading] = useState(false)

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const payload = Object.fromEntries(
      data.entries(),
    ) as unknown as ProjectPayload;

    setLoading(true)
    await createProject(payload).then((res : any)=>{
      if ( res.status === 201){
        toast.success('Created successfully')
        router.refresh()
        setLoading(false)
        setOpen(false)
      }
    }).catch((err)=>{
      console.log(err)
      toast.error(err.message)
    })
    
    .finally(()=> setLoading(false))
  };

  return (
    <div>
      <Dialog
        open={open}
        onOpenChange={setOpen}
      >
        <DialogContent className='sm:max-w-sm'>
          <form onSubmit={onSubmit}>
            <DialogHeader>
              <DialogTitle>Create Project</DialogTitle>
              <DialogDescription>
                Create a new brand pipeline for AutoShorts.
              </DialogDescription>
            </DialogHeader>
            <FieldGroup className=' mt-8 '>
              <Field>
                <Label htmlFor='channelName'>Channel Name</Label>
                <Input
                  required
                  id='channelName'
                  name='channelName'
                  defaultValue={'GenZ Psychology'}
                />
              </Field>

              <Field>
                <Label htmlFor='theme'>Theme</Label>
                <Input
                  required
                  id='theme'
                  name='theme'
                  defaultValue={'genZ vibe - modern and minimalist'}
                />
              </Field>

              <Field className=' bg-gray- rounded-lg p-4 border border-gray-600 gap-y-9'>
                <Label htmlFor='trackId'>Music Background</Label>
                {musicTrack.map((track, i) => (
                  <div
                    key={track.id}
                    className=' flex flex-col gap-y-8 border border-gray-600 rounded-xl p-6'
                  >
                    <div className=' flex flex-col gap-y-5'>
                      <Label>{track.name}</Label>
                      <div className=' flex gap-x-2'>
                        <input
                          type='radio'
                          name='trackId'
                          value={track.id}
                          defaultChecked={i === 0} // optional: preselect first track
                        />
                        <audio
                          controls
                          src={`${process.env.NEXT_PUBLIC_EXPRESS_URL}${track.filePath}`}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </Field>

              <Field>
                <Label htmlFor='niche'>niche</Label>
                <Input
                  required
                  id='niche'
                  name='niche'
                  defaultValue={'psychology - relatable'}
                />
              </Field>

              <Field>
                <Label>Posting Time</Label>
                <Input
                  required
                  id='postingTime'
                  name='postingTime'
                  defaultValue={'12:00'}
                />
              </Field>
            </FieldGroup>
            <DialogFooter>
              <DialogClose render={<Button variant='outline'>Cancel</Button>} />
              <ButtonCus
                btnName='Create'
                type='submit'
                loading={loading}
              />
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
