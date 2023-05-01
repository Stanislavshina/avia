import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
const mainStore = store();
console.log(mainStore.getState());

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={mainStore}>
    <App />
  </Provider>
);
