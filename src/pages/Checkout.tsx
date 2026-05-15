import { useState, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './Checkout.css'

type Field = { label: string; name: string; type?: string; placeholder?: string }

const fields: Field[] = [
  { label: 'First Name', name: 'firstName', placeholder: 'Jane' },
  { label: 'Last Name',  name: 'lastName',  placeholder: 'Doe' },
  { label: 'Email',      name: 'email',      type: 'email', placeholder: 'jane@example.com' },
  { label: 'Address',    name: 'address',    placeholder: '123 Homestead Lane' },
  { label: 'City',       name: 'city',       placeholder: 'Cookeville' },
  { label: 'State',      name: 'state',      placeholder: 'TN' },
  { label: 'ZIP',        name: 'zip',        placeholder: '38501' },
]

export default function Checkout() {
  const { items, total, clear } = useCart()
  const [form, setForm] = useState<Record<string, string>>({})
  const [placed, setPlaced] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setPlaced(true)
    clear()
  }

  if (placed) {
    return (
      <div className="checkout-page">
        <div className="checkout-success">
          <div className="checkout-success__icon">✦</div>
          <h1 className="checkout-success__title">Order Received</h1>
          <p className="checkout-success__msg">
            Thank you, {form.firstName}! This is a demo — no payment was processed.<br />
            In a live store your confirmation would be sent to <strong>{form.email}</strong>.
          </p>
          <Link to="/shop" className="btn btn--primary">Back to Shop</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="checkout-page">
      <div className="checkout-page__hero">
        <p className="checkout-page__kicker">Almost there</p>
        <h1 className="checkout-page__title">Checkout</h1>
        <div className="checkout-page__divider"><span>✦</span></div>
      </div>

      <div className="checkout-layout">
        {/* Form */}
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2 className="checkout-form__heading">Your Details</h2>

          <div className="checkout-form__demo-note">
            ✦ This is a demo checkout — no real payment will be taken.
          </div>

          <div className="checkout-form__grid">
            {fields.map(f => (
              <div key={f.name} className="checkout-form__group">
                <label className="checkout-form__label" htmlFor={f.name}>{f.label}</label>
                <input
                  id={f.name}
                  name={f.name}
                  type={f.type ?? 'text'}
                  placeholder={f.placeholder}
                  value={form[f.name] ?? ''}
                  onChange={handleChange}
                  required
                  className="checkout-form__input"
                />
              </div>
            ))}
          </div>

          <h2 className="checkout-form__heading" style={{ marginTop: '2rem' }}>Payment</h2>
          <div className="checkout-form__payment-note">
            <span>💳</span>
            <span>Payment processing is not active in this demo. Click "Place Order" to simulate a completed checkout.</span>
          </div>

          <button type="submit" className="btn btn--primary checkout-form__submit">
            Place Order — ${total.toFixed(2)}
          </button>

          <Link to="/cart" className="checkout-form__back">← Back to cart</Link>
        </form>

        {/* Order summary */}
        <aside className="checkout-summary">
          <h2 className="checkout-summary__title">Order Summary</h2>
          <div className="checkout-summary__items">
            {items.map(item => (
              <div key={item.id} className="checkout-summary__item">
                <img src={item.image} alt={item.name} className="checkout-summary__img" />
                <div className="checkout-summary__info">
                  <span className="checkout-summary__name">{item.name}</span>
                  <span className="checkout-summary__qty">Qty: {item.qty}</span>
                </div>
                <span className="checkout-summary__price">${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="checkout-summary__divider" />
          <div className="checkout-summary__row">
            <span>Subtotal</span><span>${total.toFixed(2)}</span>
          </div>
          <div className="checkout-summary__row">
            <span>Shipping</span><span style={{ color: 'var(--sage-dark)', fontStyle: 'italic' }}>Free</span>
          </div>
          <div className="checkout-summary__divider" />
          <div className="checkout-summary__row checkout-summary__row--total">
            <span>Total</span><span>${total.toFixed(2)}</span>
          </div>
        </aside>
      </div>
    </div>
  )
}
