import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

interface BtnProp {
  loading: boolean;
  btnName: string;
  type ?: 'button' | 'submit' | 'reset'
  onClick ?: ()=> void
}

export function ButtonCus({loading , btnName , type , onClick }: BtnProp) {
  return (
    <div className='flex gap-2'>
      {loading ? (
        <Button
          variant='outline'
          disabled
        >
          <Spinner data-icon='inline-start' />
          {`${btnName}...`}
        </Button>
      ) : (
        <Button
          variant='outline'
          type={type}
          onClick={onClick}
        >
          {btnName}
        </Button>
      )}
    </div>
  );
}
