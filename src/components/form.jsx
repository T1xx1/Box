import Dialog from '../snippets/dialog';

import plus from '../assets/plus.png';

import Fieldset from './fieldset';

export default function Form({ dispatch, id = '', box }) {
   let type = {
      en: id === '' ? 'add' : 'edit',
      it: id === '' ? 'aggiungi' : 'modifica',
   };

   return (
      <Dialog
         id={type.en}
         title={type.it}
         icon={plus}
         className='dialog'>
         <form
            onSubmit={e => {
               e.preventDefault();

               e = e.target;

               let getValue = query => e.querySelector(`#${query} input`).value;

               dispatch({
                  type: type.en,
                  payload: {
                     id: id,
                     name: getValue('Nome').charAt(0).toUpperCase() + getValue('Nome').slice(1),
                     price: getValue('Prezzo'),
                     date: getValue('Data'),
                     position: getValue('Posizione'),
                     views: getValue('Visualizzazioni'),
                     likes: getValue('Mi\\ piace'),
                  },
               });

               e.parentNode.parentNode.close();
               e.reset();
            }}>
            <Fieldset
               legend='Nome'
               type='text'
               defaultValue={box?.name || ''}
            />
            <Fieldset
               legend='Prezzo'
               type='number'
               defaultValue={box?.price || 0}
            />
            <Fieldset
               legend='Data'
               type='date'
               defaultValue={box?.date || new Date().toISOString().split('T')[0]}
            />
            <Fieldset
               legend='Posizione'
               type='text'
               defaultValue={box?.position || ''}
            />
            <Fieldset
               legend='Visualizzazioni'
               type='number'
               defaultValue={box?.views || 0}
            />
            <Fieldset
               legend='Mi piace'
               type='number'
               defaultValue={box?.likes || 0}
            />
            <button type='submit'>{type.it.charAt(0).toUpperCase() + type.it.slice(1)}</button>
            {id && (
               <>
                  <button
                     onClick={() => {
                        dispatch({
                           type: 'sell',
                           payload: id,
                        });
                     }}>
                     Venduto
                  </button>
                  <button
                     id='del'
                     onClick={() => {
                        dispatch({
                           type: 'del',
                           payload: id,
                        });
                     }}>
                     Elimina
                  </button>
               </>
            )}
         </form>
      </Dialog>
   );
}
