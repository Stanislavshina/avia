import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/handlerHooks';
import { Checkbox } from '../../types/checkbox';
import { toggleAllCheckboxex, toggleCheckbox } from '../../store/slices/checkbox';
import cl from './Checkboxes.module.scss';

const Checkboxes: React.FC = () => {
  const dispatch = useAppDispatch();
  const storeCheckboxes = useAppSelector((state: { checkboxes: Checkbox[] }) => state.checkboxes);
  const checkboxes = [
    { label: 'Все', checked: storeCheckboxes.every((el: Checkbox) => el.isChecked), id: 4 },
    ...storeCheckboxes.map((checkbox) => ({ label: checkbox.label, checked: checkbox.isChecked, id: checkbox.id })),
  ];

  const handleChange = (id: number) => dispatch(toggleCheckbox(id));
  const handleAllChanges = () => dispatch(toggleAllCheckboxex());

  return (
    <aside className={cl['aside-bar']}>
      <h3>Количество пересадок</h3>
      {checkboxes.map((el) => (
        <label key={el.id}>
          <input
            type="checkbox"
            checked={el.checked}
            onChange={() => {
              if (el.id === 4) {
                handleAllChanges();
              } else {
                handleChange(el.id);
              }
            }}
          />
          <span>{el.label}</span>
        </label>
      ))}
    </aside>
  );
};

export default Checkboxes;
