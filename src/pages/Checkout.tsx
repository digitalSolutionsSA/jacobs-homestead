import { useState, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './Checkout.css'

const WHATSAPP_NUMBER = '27795051207'

export default function Checkout() {
  const { items, total, clear } = useCart()
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const itemLines = items
      .map(item => `  • ${item.name} x${item.qty} @ R${item.price.toFixed(2)} = R${(item.price * item.qty).toFixed(2)}`)
      .join('\n')

    const message = [
      '🛒 *New Order — Jacob\'s Homestead*',
      '',
      '*Order Details:*',
      itemLines,
      '',
      `*Total: R${total.toFixed(2)}*`,
      '',
      '*Customer Details:*',
      `Name: ${form.firstName} ${form.lastName}`,
      `Phone: ${form.phone}`,
      `Email: ${form.email}`,
      `Address: ${form.address}, ${form.city}`,
    ].join('\n')

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    window.open(url, '_blank')
    clear()
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
            ✦ Fill in your details and we'll send your order straight to WhatsApp.
          </div>

          <div className="checkout-form__grid">
            <div className="checkout-form__group">
              <label className="checkout-form__label" htmlFor="firstName">First Name</label>
              <input id="firstName" name="firstName" type="text" placeholder="Jane"
                value={form.firstName} onChange={handleChange} required className="checkout-form__input" />
            </div>
            <div className="checkout-form__group">
              <label className="checkout-form__label" htmlFor="lastName">Last Name</label>
              <input id="lastName" name="lastName" type="text" placeholder="Doe"
                value={form.lastName} onChange={handleChange} required className="checkout-form__input" />
            </div>
            <div className="checkout-form__group">
              <label className="checkout-form__label" htmlFor="email">Email</label>
              <input id="email" name="email" type="email" placeholder="jane@example.com"
                value={form.email} onChange={handleChange} required className="checkout-form__input" />
            </div>
            <div className="checkout-form__group">
              <label className="checkout-form__label" htmlFor="phone">Phone Number</label>
              <input id="phone" name="phone" type="tel" placeholder="+27 82 000 0000"
                value={form.phone} onChange={handleChange} required className="checkout-form__input" />
            </div>
            <div className="checkout-form__group checkout-form__group--full">
              <label className="checkout-form__label" htmlFor="address">Street Address</label>
              <input id="address" name="address" type="text" placeholder="123 Homestead Lane"
                value={form.address} onChange={handleChange} required className="checkout-form__input" />
            </div>
            <div className="checkout-form__group checkout-form__group--full">
              <label className="checkout-form__label" htmlFor="city">City</label>
              <input id="city" name="city" type="text" placeholder="Johannesburg"
                value={form.city} onChange={handleChange} required className="checkout-form__input" />
            </div>
          </div>

          <button type="submit" className="btn btn--whatsapp checkout-form__submit">
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Order via WhatsApp — R{total.toFixed(2)}
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
                <span className="checkout-summary__price">R{(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="checkout-summary__divider" />
          <div className="checkout-summary__row">
            <span>Subtotal</span><span>R{total.toFixed(2)}</span>
          </div>
          <div className="checkout-summary__row">
            <span>Shipping</span><span style={{ color: 'var(--sage-dark)', fontStyle: 'italic' }}>Free</span>
          </div>
          <div className="checkout-summary__divider" />
          <div className="checkout-summary__row checkout-summary__row--total">
            <span>Total</span><span>R{total.toFixed(2)}</span>
          </div>
        </aside>
      </div>
    </div>
  )
}
