import React, { useState } from 'react';
import cl from './Tabs.module.scss';
import { useAppDispatch } from '../../store/handlerHooks';
import { sortByCheapest, sortByFastest, sortByOptimal } from '../../store/slices/tickets';

const Tabs: React.FC = () => {
  const [prices, setPrices] = useState(false);
  const [faster, setFaster] = useState(false);
  const [optimale, setOptimale] = useState(false);

  const dispatch = useAppDispatch();

  const handlerSortByOptimal = () => {
    dispatch(sortByOptimal());
  };

  const handlerSortByFastest = () => {
    dispatch(sortByFastest());
  };

  const handlerSortByCheapest = () => {
    dispatch(sortByCheapest());
  };

  let classesPrice: string = cl.tabs__button;
  prices ? (classesPrice = `${cl.tabs__button} ${cl['tabs__button--active']}`) : classesPrice;

  let classesFaster: string = cl.tabs__button;
  faster ? (classesFaster = `${cl.tabs__button} ${cl['tabs__button--active']}`) : classesFaster;

  let classesOptimale: string = cl.tabs__button;
  optimale ? (classesOptimale = `${cl.tabs__button} ${cl['tabs__button--active']}`) : classesOptimale;

  return (
    <section className={cl.tabs}>
      <button
        className={classesPrice}
        onClick={() => {
          setPrices(true);
          setFaster(false);
          setOptimale(false);
          handlerSortByCheapest();
        }}
      >
        Самый дешевый
      </button>
      <button
        className={classesFaster}
        onClick={() => {
          setPrices(false);
          setFaster(true);
          setOptimale(false);
          handlerSortByFastest();
        }}
      >
        Самый быстрый
      </button>
      <button
        className={classesOptimale}
        onClick={() => {
          setPrices(false);
          setFaster(false);
          setOptimale(true);
          handlerSortByOptimal();
        }}
      >
        Оптимальный
      </button>
    </section>
  );
};

export default Tabs;
