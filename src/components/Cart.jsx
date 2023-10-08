import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../redux/actions";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div className="cart">
      <h2>Carrello</h2>
      {cartItems.length === 0 ? (
        <p>Il carrello è vuoto.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="item-details">
                <h3>{item.name}</h3>
                <p>Prezzo: ${item.price}</p>
                <button onClick={() => handleRemoveFromCart(item.id)}>Rimuovi dal carrello</button>
              </div>
            </div>
          ))}
          <div className="cart-summary">
            <h3>Totale: ${calculateTotal()}</h3>
            <button>Procedi all'acquisto</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
