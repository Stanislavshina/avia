import cl from './Ticket.module.scss';
import { Ticket } from '../../types/ticket';
import getFormDate from '../../utils/formatDate';
import inflectStopsNumber from '../../utils/stops';

type TicketItem = {
  ticket: Ticket;
};

const TicketItem: React.FC<TicketItem> = ({ ticket }) => {
  const { carrier, price, segments } = ticket;
  const [from, to] = segments;
  const dateFrom = getFormDate(from.date, from.duration);
  const dateTo = getFormDate(to.date, to.duration);
  const stopFrom = inflectStopsNumber(from.stops.length);
  const stopTo = inflectStopsNumber(to.stops.length);

  return (
    <li className={cl.ticket}>
      <header className={cl.ticket__header}>
        <p>{price} Р </p>
        <img className={cl.img} src={`//pics.avs.io/99/36/${carrier}.png`} alt="avia logo" />
      </header>
      <main className={cl.ticket__main}>
        <section className={cl.section}>
          <div>
            <p className={cl.title}>
              {from.origin} - {from.destination}
            </p>
            <p className={cl.description}>{dateFrom.flightTime}</p>
          </div>
          <div>
            <p className={cl.title}>В пути</p>
            <p className={cl.description}>{dateFrom.onWay}</p>
          </div>
          <div>
            <p className={cl.title}>{stopFrom}</p>
            <p className={cl.description}>{from.stops?.join(', ')}</p>
          </div>
        </section>
        <section className={cl.section}>
          <div>
            <p className={cl.title}>
              {to.origin} - {to.destination}
            </p>
            <p className={cl.description}>{dateTo.flightTime}</p>
          </div>
          <div>
            <p className={cl.title}>В пути</p>
            <p className={cl.description}>{dateTo.onWay}</p>
          </div>
          <div>
            <p className={cl.title}>{stopTo}</p>
            <p className={cl.description}>{to.stops?.join(', ')}</p>
          </div>
        </section>
      </main>
    </li>
  );
};

export default TicketItem;
