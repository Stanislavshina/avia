import React, { useEffect, useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from '../../store/handlerHooks';
import { fetchTickets, showMore } from '../../store/slices/tickets';
import TicketItem from '../Ticket/Ticket';
import cl from './TicketsList.module.scss';
import { Ticket } from '../../types/ticket';
import { Checkbox } from '../../types/checkbox';

const TicketsList: React.FC = () => {
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([]);
  const dispatch = useAppDispatch();
  const tickets = useAppSelector((state) => state.tickets.tickets);
  const visibleTickets = useAppSelector((state) => state.tickets.visibleTickets);
  const checkbox = useAppSelector((state) => state.checkboxes);
  const stop = useAppSelector((state) => state.tickets.stop);
  const errorCount = useAppSelector((state) => state.tickets.errorCount);

  const handler = () => dispatch(showMore());
  useEffect(() => {
    if (!stop && errorCount < 5) {
      const interval = setInterval(() => {
        dispatch(fetchTickets());
      }, 600);

      return () => clearInterval(interval);
    }
  }, [dispatch, stop, errorCount]);

  useEffect(() => {
    const cheks = checkbox.filter((checkbox: Checkbox) => checkbox.isChecked);
    let filtered = [];
    if (cheks.length === 4) {
      filtered = tickets;
    } else {
      filtered = tickets.filter((ticket: Ticket) => {
        const ticketsFrom = ticket.segments[0].stops.length;
        const ticketsTo = ticket.segments[1].stops.length;
        return cheks.some((checkbox: Checkbox) => checkbox.id === ticketsFrom || checkbox.id === ticketsTo);
      });
    }
    setFilteredTickets(filtered);
  }, [tickets, checkbox]);

  const visibleT = filteredTickets.slice(0, visibleTickets);

  return (
    <div className={cl.tickets}>
      <ul>
        {visibleT.map((ticket) => (
          <TicketItem key={nanoid()} ticket={ticket} />
        ))}
      </ul>
      <button className={cl.button__showmore} onClick={handler}>
        Показать еще 5 билетов
      </button>
    </div>
  );
};

export default TicketsList;
