import React from 'react';

interface PageContainerProps {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}

const PageContainer = ({
  title,
  subtitle,
  action,
  children,
}: PageContainerProps) => {
  return (
    <main className='p-10  w-full flex flex-col gap-6'>
      <section className='flex justify-between'>
        <div className='flex w-fit flex-col gap-1'>
          {title && (
            <h1 className='text-xl font-bold tracking-tight'>{title}</h1>
          )}
          {subtitle && (
            <p className='text-sm text-muted-foreground'>{subtitle}</p>
          )}
        </div>
        {action && <div>{action}</div>}
      </section>
      {children}
    </main>
  );
};

export default PageContainer;
