'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ProjectDialog } from './ProjectDialog';
import { MusicTrack } from '@autoshorts/db/generated/prisma/client';

const NewProjectBtn = ({ tracks }: { tracks: MusicTrack[] }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant={'outline'}
        onClick={() => setOpen(true)}
      >
        New Project
      </Button>
      <ProjectDialog
        musicTrack={tracks}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
};

export default NewProjectBtn;
