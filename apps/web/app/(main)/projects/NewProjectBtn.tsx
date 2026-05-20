'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ProjectDialog } from './ProjectDialog';

const NewProjectBtn = () => {
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
        open={open}
        setOpen={setOpen}
      />
    </>
  );
};

export default NewProjectBtn;
