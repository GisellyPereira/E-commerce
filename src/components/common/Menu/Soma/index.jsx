import React from 'react';
import './styles.css';
import {menuItemsData} from ".././data.js";

const Soma = () => {
  const items = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    if (key.startsWith("quantidade_")) {
      const itemId = key.replace("quantidade_", "");
      const item = {
        id: itemId,
        quantidade: parseInt(localStorage.getItem(key)),
        preco: menuItemsData.find((item) => item.id === parseInt(itemId)).price,
      };
      items.push(item);
    }
  }

  const total = items.reduce(
    (total, item) => total + item.quantidade * item.preco,
    0
  );


  return (
    <div className="div-calcular">
      <p>Total: {total.toFixed(2)}</p>
    </div>
  );
};

export default Soma;

