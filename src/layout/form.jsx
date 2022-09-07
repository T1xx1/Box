import Dialog from '../snippets/dialog';

import plus from '../assets/plus.png';

import Fieldset from '../components/fieldset';

export default function Form({ dispatch, id = '', box }) {
   let type = id === '' ? 'add' : 'edit';

   return (
      <Dialog
         id={type}
         icon={plus}
         className='dialog'>
         <form
            onSubmit={e => {
               e.preventDefault();

               e = e.target;

               let getValue = query => e.querySelector(`#${query} input`).value;

               dispatch({
                  type: type,
                  payload: {
                     id: id,
                     name: getValue('Name'),
                     price: getValue('Price'),
                     date: getValue('Date'),
                     position: getValue('Position'),
                     visits: getValue('Visits'),
                     likes: getValue('Likes'),
                  },
               });

               e.parentNode.parentNode.close();
            }}>
            <Fieldset
               legend='Name'
               type='text'
               defaultValue={box?.name || ''}
            />
            <Fieldset
               legend='Price'
               type='number'
               defaultValue={box?.price || 0}
            />
            <Fieldset
               legend='Date'
               type='date'
               defaultValue={box?.date || new Date().toISOString().split('T')[0]}
            />
            <Fieldset
               legend='Position'
               type='text'
               defaultValue={box?.position || ''}
            />
            <Fieldset
               legend='Visits'
               type='number'
               defaultValue={box?.visits || 0}
            />
            <Fieldset
               legend='Likes'
               type='number'
               defaultValue={box?.likes || 0}
            />
            <button type='submit'>{type.charAt(0).toUpperCase() + type.slice(1)}</button>
            {id && (
               <>
                  <button
                     onClick={() => {
                        dispatch({
                           type: 'sell',
                           payload: id,
                        });
                     }}>
                     Sell
                  </button>
                  <button
                     id='del'
                     onClick={() => {
                        dispatch({
                           type: 'del',
                           payload: id,
                        });
                     }}>
                     Delete
                  </button>
               </>
            )}
         </form>
      </Dialog>
   );
}
