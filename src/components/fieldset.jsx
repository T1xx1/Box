export default function Fieldset({ legend, type, defaultValue = '' }) {
   return (
      <fieldset id={legend} className='fieldset'>
         <legend>{legend}</legend>
         <input type={type} defaultValue={defaultValue} />
      </fieldset>
   );
}
