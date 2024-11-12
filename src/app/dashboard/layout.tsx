/* eslint-disable react/no-children-prop */
import DashboardLayoutPage from '@/components/dashboard/DashboardLayoutPage';
import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div style={{ display: 'flex' }}>
      <DashboardLayoutPage children={children} />
    </div>
  );
};

export default Layout;
