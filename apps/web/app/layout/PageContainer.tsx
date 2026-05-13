import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
}

const PageContainer = ({ children }: PageContainerProps) => {
  return <div className=' bg-gray-950  text-white'>{children}</div>;
};

export default PageContainer;
