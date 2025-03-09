// This is a mock database service
// In a real application, you would use a real database like PostgreSQL, MongoDB, etc.

import { v4 as uuidv4 } from "uuid"

// Mock data storage
const users = []
const products = []
let cartItems = []
const orders = []

// User methods
export const createUser = async (userData) => {
  const newUser = {
    id: uuidv4(),
    ...userData,
    createdAt: new Date(),
  }
  users.push(newUser)
  return { ...newUser, password: undefined } // Don't return the password
}

export const getUserByEmail = async (email) => {
  return users.find((user) => user.email === email)
}

export const getUserById = async (id) => {
  const user = users.find((user) => user.id === id)
  if (user) {
    // Don't return the password
    const { password, ...userWithoutPassword } = user
    return userWithoutPassword
  }
  return null
}

// Product methods
export const createProduct = async (productData) => {
  const newProduct = {
    id: uuidv4(),
    ...productData,
    createdAt: new Date(),
  }
  products.push(newProduct)
  return newProduct
}

export const getProducts = async (category) => {
  if (category) {
    return products.filter((product) => product.category === category)
  }
  return products
}

export const getProductById = async (id) => {
  return products.find((product) => product.id === id)
}

export const getProductsBySellerId = async (sellerId) => {
  return products.filter((product) => product.sellerId === sellerId)
}

// Cart methods
export const addToCart = async (userId, productId, quantity) => {
  const existingItem = cartItems.find((item) => item.userId === userId && item.productId === productId)

  if (existingItem) {
    existingItem.quantity += quantity
    return existingItem
  }

  const newCartItem = {
    id: uuidv4(),
    userId,
    productId,
    quantity,
  }

  cartItems.push(newCartItem)
  return newCartItem
}

export const getCartItems = async (userId) => {
  return cartItems.filter((item) => item.userId === userId)
}

export const updateCartItemQuantity = async (id, quantity) => {
  const cartItem = cartItems.find((item) => item.id === id)

  if (cartItem) {
    cartItem.quantity = quantity
    return cartItem
  }

  return null
}

export const removeCartItem = async (id) => {
  const index = cartItems.findIndex((item) => item.id === id)

  if (index !== -1) {
    const [removedItem] = cartItems.splice(index, 1)
    return removedItem
  }

  return null
}

export const clearCart = async (userId) => {
  cartItems = cartItems.filter((item) => item.userId !== userId)
  return true
}

// Order methods
export const createOrder = async (orderData) => {
  const newOrder = {
    id: uuidv4(),
    ...orderData,
    createdAt: new Date(),
  }

  orders.push(newOrder)
  return newOrder
}

export const getOrdersByUserId = async (userId) => {
  return orders.filter((order) => order.userId === userId)
}

export const getOrderById = async (id) => {
  return orders.find((order) => order.id === id)
}

export const updateOrderStatus = async (id, status) => {
  const order = orders.find((order) => order.id === id)

  if (order) {
    order.status = status
    return order
  }

  return null
}

