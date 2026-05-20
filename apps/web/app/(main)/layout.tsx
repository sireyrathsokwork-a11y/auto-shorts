import { AppSidebar } from '@/components/app-sidebar';
import SessionProviderWrapper from '@/components/session-provider';
import { SiteHeader } from '@/components/site-header';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';
import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProviderWrapper>
      <Toaster position='top-right'/>
      <div className=' [--header-height:calc(--spacing(14))]'>
        <SidebarProvider className='flex flex-col'>
          <SiteHeader />
          <div className='flex flex-1'>
            <AppSidebar />
            {children}
          </div>
        </SidebarProvider>
      </div>
    </SessionProviderWrapper>
  );
};

export default layout;
