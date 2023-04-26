import ButtonAddRemoveItem from "../../ButtonAddRemoveItem";
import "./styles.css";
import { menuItemsData } from "../data";

const MenuItem = ({
  item,
  aumentarQuantidade,
  diminuirQuantidade,
  quantidade,
}) => {
  const { id, name, info, img, price } = item;

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

  const calcularTotalItem = quantidade * price;

  return (
    <div className="contain-items">
      <div id="menu" className="item menu-items">
        <img className="cox-img" src={img} alt="item" />
        <div className="item-head_desc">
          <p className="head_desc-name">{name}</p>
          <p className="head_desc-info">
            <small>{info}</small>
          </p>
        </div>
        <span className="foot_desc-price">R${price}</span>
        <div className="item-foot_desc">
          <span className="foot_desc-total">
            R${calcularTotalItem.toFixed(2)}
          </span>
          <ButtonAddRemoveItem
            itemId={id}
            aumentarQuantidade={aumentarQuantidade}
            diminuirQuantidade={diminuirQuantidade}
          />
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
