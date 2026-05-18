interface PageContainerProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
}

const PageContainer = ({ title, subtitle, children }: PageContainerProps) => {
  return (
    <div className=' p-10 flex flex-col gap-6'>
      <div className=' flex flex-col gap-1'>
        {title && <h1 className='text-xl font-bold tracking-tight'>{title}</h1>}
        {subtitle && (
          <p className=' text-sm text-muted-foreground'>{subtitle}</p>
        )}
      </div>
      {children}
    </div>
  );
};

export default PageContainer;
