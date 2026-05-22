import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import React from 'react';

interface BtnProp extends React.ComponentProps<typeof Button> {
  loading: boolean;
  btnName: string;
  icon?: React.ReactNode;
}

export function ButtonCus({
  loading,
  btnName,
  icon,
  type,
  onClick,
  ...rest
}: BtnProp) {
  return (
    <div className='flex gap-2'>
      {loading ? (
        <Button
          {...rest}
          disabled
        >
          <Spinner data-icon='inline-start' />
          {`${btnName}...`}
        </Button>
      ) : (
        <Button
          {...rest}
          type={type}
          onClick={onClick}
        >
          {icon}
          {btnName}
        </Button>
      )}
    </div>
  );
}
