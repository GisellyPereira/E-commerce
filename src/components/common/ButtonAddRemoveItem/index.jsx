import React, { useState, useEffect } from 'react';
import './styles.css'


const ButtonAddRemoveItem = ({ itemId, aumentarQuantidade, diminuirQuantidade }) => {
  const [quantidade, setQuantidade] = useState(0);
  

  useEffect(() => {
    const quantidade = localStorage.getItem(`quantidade_${itemId}`);
    if (quantidade) {
      setQuantidade(parseInt(quantidade));
    }
  }, [itemId]);


  function handleAumentarQuantidade() {
    setQuantidade(quantidade + 1);
    localStorage.setItem('quantidade',quantidade);
    aumentarQuantidade(itemId);
    localStorage.setItem(`quantidade_${itemId}`, quantidade + 1);
  }

  function handleDiminuirQuantidade() {
    if (quantidade > 0) {
      setQuantidade(quantidade - 1);
      localStorage.setItem('quantidade',quantidade);
      diminuirQuantidade(itemId);
      localStorage.setItem(`quantidade_${itemId}`, quantidade - 1);
    }
  }


  return (
    <div className='qnt-div'>
      <button className='qnt-btn' onClick={handleDiminuirQuantidade} >-</button>
      <span className='qnt-span'>{quantidade}</span>
      <button className='qnt-btn' onClick={handleAumentarQuantidade}>+</button>
    </div>
  );
};

export default ButtonAddRemoveItem;
