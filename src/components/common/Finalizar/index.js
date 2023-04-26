import React from 'react'
import { Link } from 'react-router-dom';
import "./styles.css";

const Finalizar = () => {
  return (
    <div  className='div-fim'>
      <div className='div-pedfim'>
      <h1>Pedido Finalizado!</h1>
       <div className="check"></div>
    </div>
    <p>
        <Link className='inicio' to='/'>Voltar ao início</Link>
       </p>
    </div>
    
  
   
  )
}

export default Finalizar
