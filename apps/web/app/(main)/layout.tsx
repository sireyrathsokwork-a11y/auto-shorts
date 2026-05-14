import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import { SidebarProvider } from '@/components/ui/sidebar';
import React from 'react';

const layout = ({ children }: { children: React.ReactElement }) => {
  return (
    <div className=' [--header-height:calc(--spacing(14))]'>
      <SidebarProvider className='flex flex-col'>
        <SiteHeader />
        <div className='flex flex-1'>
          <AppSidebar />
          {children}
        </div>
      </SidebarProvider>
    </div>
  );
};

export default layout;
