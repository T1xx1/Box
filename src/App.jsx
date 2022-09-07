import { useEffect, useReducer } from 'react';

import LocalStorage from './snippets/localstorage';

import Info from './components/info';

import Box from './components/box';
import Form from './components/form';

const storage = new LocalStorage('Box', '1.0', {
   open: {},
   sold: {},
});

export default function App() {
   let [value, dispatch] = useReducer((state, action) => {
      switch (action.type) {
         case 'add':
            return {
               ...state,
               open: {
                  ...state.open,
                  [parseInt(String(Math.random()).slice(2))]: {
                     name: action.payload.name || 'Box',
                     price: parseFloat(action.payload.price) || 0,
                     date: action.payload.date || new Date(),
                     position: action.payload.position || '',
                     views: parseInt(action.payload.views) || 0,
                     likes: parseInt(action.payload.likes) || 0,
                  },
               },
            };
         case 'del':
            delete state.open[action.payload];

            return {
               ...state,
            };
         case 'edit':
            return {
               ...state,
               open: {
                  ...state.open,
                  [action.payload.id]: action.payload,
               },
            };
         case 'sell':
            let box = state.open[action.payload];

            delete state.open[action.payload];

            return {
               ...state,
               sold: {
                  ...state.sold,
                  [action.payload]: {
                     ...box,
                     sale: new Date(),
                  },
               },
            };
         default:
            return state;
      }
   }, storage.value);

   useEffect(() => {
      storage.value = value;
      storage.write();
   }, [value]);

   let stats = new Map();

   stats.set('capital', 0);
   stats.set('boxes', 0);
   stats.set('views', 0);
   stats.set('likes', 0);
   stats.set('lastSale', 0);
   stats.set('earnings', 0);

   for (let id in value.open) {
      let box = value.open[id];

      stats.set('capital', stats.get('capital') + parseFloat(box.price));
      stats.set('boxes', stats.get('boxes') + 1);
      stats.set('views', stats.get('views') + parseInt(box.views));
      stats.set('likes', stats.get('likes') + parseInt(box.likes));
   }

   for (let id in value.sold) {
      let box = value.sold[id];

      if (new Date(stats.get('lastSale')) < new Date(box.sale)) stats.set('lastSale', box.sale);

      stats.set('earnings', stats.get('earnings') + parseFloat(box.price));
   }

   return (
      <>
         <div id='stats'>
            {Object.keys(value.open).length !== 0 && (
               <>
                  <Info label='Capitale'>{stats.get('capital')}€</Info>
                  <Info label='Box'>{stats.get('boxes')}</Info>
                  <Info label='Visualizzazioni'>{stats.get('views')}</Info>
                  <Info label='Mi piace'>{stats.get('likes')}</Info>
               </>
            )}
            {Object.keys(value.sold).length !== 0 && (
               <>
                  <Info label='Ultima vendita'>{new Date(stats.get('lastSale')).toISOString().replace('T', ' ').split('.')[0]}</Info>
                  <Info label='Guadagni'>{stats.get('earnings')}€</Info>
               </>
            )}
         </div>
         {Object.keys(value.open).length === 0 ? (
            <h3>No boxes...</h3>
         ) : (
            <>
               <nav>
                  <input
                     type='search'
                     onKeyUp={e => {
                        e = e.target;

                        document.querySelector('main').childNodes.forEach(box => {
                           if (box.querySelector('.info :nth-child(1)').innerHTML.toLowerCase().includes(e.value.toLowerCase())) {
                              box.removeAttribute('hidden');
                           } else box.setAttribute('hidden', '');
                        });
                     }}
                     placeholder='Cerca una box...'
                  />
               </nav>
               <main>
                  {Object.keys(value.open)
                     .reverse()
                     .map(id => (
                        <Box
                           dispatch={dispatch}
                           id={id}
                           box={value.open[id]}
                           key={id}
                        />
                     ))}
               </main>
            </>
         )}
         <Form dispatch={dispatch} />
      </>
   );
}
