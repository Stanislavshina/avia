import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Checkbox } from '../../types/checkbox';

const initialState: Checkbox[] = [
  { label: 'Без пересадoк', id: 0, isChecked: true },
  { label: '1 пересадка', id: 1, isChecked: true },
  { label: '2 пересадки', id: 2, isChecked: true },
  { label: '3 пересадки', id: 3, isChecked: true },
];

const checkboxSlice = createSlice({
  name: 'checkboxes',
  initialState,

  reducers: {
    toggleCheckbox(state, action: PayloadAction<number>) {
      return (state = state.map((el) => (el.id === Number(action.payload) ? { ...el, isChecked: !el.isChecked } : el)));
    },

    toggleAllCheckboxex(state) {
      const allChecked = state.every((el) => el.isChecked);
      return (state = state.map((el) => ({ ...el, isChecked: !allChecked })));
    },
  },
});

export const { toggleCheckbox, toggleAllCheckboxex } = checkboxSlice.actions;
export default checkboxSlice.reducer;
