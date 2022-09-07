export default function Info({ label, children }) {
   return (
      <div className='info'>
         <span>{label}</span>
         <span>{children}</span>
      </div>
   );
}
