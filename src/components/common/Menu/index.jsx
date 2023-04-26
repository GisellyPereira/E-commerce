import React, { useState } from "react";
import "./styles.css";
import { menuItemsData } from "./data";
import MenuItem from "./MenuItem";
import Soma from "./Soma";
import FinalizarPedido from "./FinalizarPedido";

const Menu = () => {

  
  const [quantidades, setQuantidades] = useState(
    new Array(menuItemsData.length).fill(0)
  );
  const [total, setTotal] = useState(0);

  const aumentarQuantidade = (index) => {
    const newQuantidades = [...quantidades];
    newQuantidades[index] = newQuantidades[index] + 1;
    setQuantidades(newQuantidades);
  };

  const diminuirQuantidade = (index) => {
    const newQuantidades = [...quantidades];
    if (newQuantidades[index] > 0) {
      newQuantidades[index] = newQuantidades[index] - 1;
    }
    setQuantidades(newQuantidades);
  };
  

  return (
    
    <main>
      <div className="main-div">
        {menuItemsData.map((item, index) => (
          <MenuItem
          item={item}
          quantidade={parseInt(localStorage.getItem(`quantidade_${item.id}`)) || 0}
          aumentarQuantidade={() => aumentarQuantidade(item.id)}
          diminuirQuantidade={() => diminuirQuantidade(item.id)}
        />

        ))}
      </div>
      <div className="div-total">
        <Soma menuItemsData={menuItemsData} quantidades={quantidades} setTotal={setTotal} />
        <FinalizarPedido total={total} />
      </div>
    </main>
   
  );
};

export default Menu;
