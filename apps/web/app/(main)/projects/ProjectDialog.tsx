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
import { ProjectPayload } from '@autoshorts/types';
import { useRouter } from 'next/navigation';

export function ProjectDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
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
    await createProject(payload).then((res : any )=>{
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
                <Label htmlFor='track'>Music Track</Label>
                <Input
                  required
                  id='musicTrack'
                  name='musicTrack'
                  defaultValue='track1'
                />
              </Field>

              <Field>
                <Label htmlFor='track'>Posting Time</Label>
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
