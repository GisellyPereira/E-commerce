import ButtonAddRemoveItem from "../../ButtonAddRemoveItem";
import "./styles.css";

const MenuItem = ({ item, aumentarQuantidade, diminuirQuantidade }) => {
  const { id, name, info, img, price } = item;
  

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
        <div className="item-foot_desc">
          <span className="foot_desc-price">R${price}</span>
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
