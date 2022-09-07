import eye from '../assets/eye.png';
import heart from '../assets/heart.png';

import Form from './form';
import Info from './info';

export default function Box({ dispatch, id, box }) {
   return (
      <div
         onClick={e => {
            let check = true;

            e = e.target;

            while (e.className !== 'box') {
               if (e.localName === 'dialog') check = false;

               e = e.parentNode;
            }

            e = e.querySelector('dialog');

            if (check && !e.hasAttribute('open')) e.showModal();
         }}
         className='box'>
         <Info label={box.name}>{box.price}€</Info>
         <div className='footer'>
            <div className='badges'>
               <img
                  src={eye}
                  alt='Views: '
               />
               <span>{box.views}</span>
               <img
                  src={heart}
                  alt='Likes: '
               />
               <span>{box.likes}</span>
            </div>
         </div>
         <Form
            dispatch={dispatch}
            id={id}
            box={box}
         />
      </div>
   );
}
