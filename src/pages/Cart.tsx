import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './Cart.css'

export default function Cart() {
  const { items, removeItem, updateQty, itemCount, total } = useCart()

  return (
    <div className="cart-page">
      <div className="cart-page__hero">
        <p className="cart-page__kicker">Your selections</p>
        <h1 className="cart-page__title">Your Cart</h1>
        <div className="cart-page__divider"><span>✦</span></div>
      </div>

      <div className="cart-page__body">
        {itemCount === 0 ? (
          <div className="cart-empty">
            <p className="cart-empty__msg">Your cart is empty.</p>
            <Link to="/shop" className="btn btn--primary">Browse the Shop</Link>
          </div>
        ) : (
          <div className="cart-layout">
            {/* Items */}
            <div className="cart-items">
              {items.map(item => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item__img" />
                  <div className="cart-item__details">
                    <h3 className="cart-item__name">{item.name}</h3>
                    <p className="cart-item__price">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="cart-item__controls">
                    <button
                      className="cart-item__qty-btn"
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      aria-label="Decrease quantity"
                    >−</button>
                    <span className="cart-item__qty">{item.qty}</span>
                    <button
                      className="cart-item__qty-btn"
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      aria-label="Increase quantity"
                    >+</button>
                  </div>
                  <p className="cart-item__subtotal">${(item.price * item.qty).toFixed(2)}</p>
                  <button
                    className="cart-item__remove"
                    onClick={() => removeItem(item.id)}
                    aria-label="Remove item"
                  >✕</button>
                </div>
              ))}
            </div>

            {/* Summary */}
            <aside className="cart-summary">
              <h2 className="cart-summary__title">Order Summary</h2>
              <div className="cart-summary__row">
                <span>Items ({itemCount})</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="cart-summary__row">
                <span>Shipping</span>
                <span className="cart-summary__free">Free</span>
              </div>
              <div className="cart-summary__divider" />
              <div className="cart-summary__row cart-summary__row--total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <Link to="/checkout" className="btn btn--primary cart-summary__btn">
                Proceed to Checkout
              </Link>
              <Link to="/shop" className="cart-summary__back">← Continue shopping</Link>
            </aside>
          </div>
        )}
      </div>
    </div>
  )
}
