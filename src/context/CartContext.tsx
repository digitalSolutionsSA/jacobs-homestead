import { createContext, useContext, useState, ReactNode } from 'react'

export type CartItem = {
  id: number
  name: string
  price: number
  image: string
  qty: number
}

type CartContextType = {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'qty'>) => void
  removeItem: (id: number) => void
  updateQty: (id: number, qty: number) => void
  clear: () => void
  itemCount: number
  total: number
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = (item: Omit<CartItem, 'qty'>) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id)
      if (existing) return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...item, qty: 1 }]
    })
  }

  const removeItem = (id: number) => setItems(prev => prev.filter(i => i.id !== id))

  const updateQty = (id: number, qty: number) => {
    if (qty < 1) { removeItem(id); return }
    setItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i))
  }

  const clear = () => setItems([])

  const itemCount = items.reduce((sum, i) => sum + i.qty, 0)
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clear, itemCount, total }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
