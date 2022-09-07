import { useEffect, useReducer } from 'react';

import LocalStorage from './snippets/localstorage';

import Box from './layout/box';
import Form from './layout/form';

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
                     visits: parseInt(action.payload.visits) || 0,
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
                     sold: new Date(),
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

   for (let id in value.open) {
      let box = value.open[id];

      stats.set('tot', parseFloat(stats.get('tot') ?? 0 + box.price));
      stats.set('visits', parseInt(stats.get('visits') ?? 0 + box.visits));
      stats.set('likes', parseInt(stats.get('likes') ?? 0 + box.likes));
   }

   return (
      <>
         <div id='stats'>
            <span>Tot {stats.get('tot')}€</span>
            <span>Visits {stats.get('visits')}</span>
            <span>Likes {stats.get('likes')}</span>
         </div>
         <main>
            {Object.keys(value.open).length === 0
               ? 'No boxes'
               : Object.keys(value.open).map(id => (
                    <Box
                       dispatch={dispatch}
                       id={id}
                       box={value.open[id]}
                       key={id}
                    />
                 ))}
         </main>
         <Form dispatch={dispatch} />
      </>
   );
}
