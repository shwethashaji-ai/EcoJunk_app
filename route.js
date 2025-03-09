import { NextResponse } from "next/server"
import { getCartItems, addToCart, updateCartItemQuantity, removeCartItem } from "@/lib/db"
import { getSession } from "@/lib/auth"

export async function GET(request) {
  const session = await getSession()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const cartItems = await getCartItems(session.userId)
    return NextResponse.json(cartItems)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch cart items" }, { status: 500 })
  }
}

export async function POST(request) {
  const session = await getSession()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { productId, quantity } = await request.json()

    if (!productId || !quantity) {
      return NextResponse.json({ error: "Product ID and quantity are required" }, { status: 400 })
    }

    const cartItem = await addToCart(session.userId, productId, quantity)
    return NextResponse.json(cartItem, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to add item to cart" }, { status: 500 })
  }
}

export async function PUT(request) {
  const session = await getSession()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { id, quantity } = await request.json()

    if (!id || !quantity) {
      return NextResponse.json({ error: "Cart item ID and quantity are required" }, { status: 400 })
    }

    const cartItem = await updateCartItemQuantity(id, quantity)

    if (!cartItem) {
      return NextResponse.json({ error: "Cart item not found" }, { status: 404 })
    }

    return NextResponse.json(cartItem)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update cart item" }, { status: 500 })
  }
}

export async function DELETE(request) {
  const session = await getSession()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Cart item ID is required" }, { status: 400 })
    }

    const cartItem = await removeCartItem(id)

    if (!cartItem) {
      return NextResponse.json({ error: "Cart item not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to remove cart item" }, { status: 500 })
  }
}

