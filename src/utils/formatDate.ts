import { format } from 'date-fns/fp';

const getFormDate = (from: string, to = 0) => {
  const date = new Date(from).getTime();
  const flightTime = `${format('HH:MM', date)} - ${format('HH:MM', to)}`;
  const onWay = format('HHч MMм', date - to);
  return {
    flightTime: flightTime,
    onWay: onWay,
  };
};

export default getFormDate;
