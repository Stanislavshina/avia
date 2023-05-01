import React from 'react';
import Tabs from './tabs/Tabs';
import Loader from './Loader/Loadter';
import TicketsList from './TicketsList/TicketsList';
import './Main.module.scss';

const Main: React.FC = () => {
  return (
    <main>
      <Tabs />
      <Loader />
      <TicketsList />
    </main>
  );
};

export default Main;
