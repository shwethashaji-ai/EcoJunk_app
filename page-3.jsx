"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

// Mock cart items
const initialCartItems = [
  {
    id: 1,
    name: "Vintage Wooden Chair",
    price: 3499,
    quantity: 1,
    image: "/placeholder.svg?height=100&width=100",
    seller: "EcoHome",
  },
  {
    id: 2,
    name: "Recycled Glass Vase",
    price: 1999,
    quantity: 2,
    image: "/placeholder.svg?height=100&width=100",
    seller: "GreenCraft",
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems)
  const [promoCode, setPromoCode] = useState("")
  const [isApplyingPromo, setIsApplyingPromo] = useState(false)
  const [discount, setDiscount] = useState(0)
  const router = useRouter()
  const { toast } = useToast()

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return

    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart",
    })
  }

  const applyPromoCode = () => {
    if (!promoCode.trim()) {
      toast({
        title: "Error",
        description: "Please enter a promo code",
        variant: "destructive",
      })
      return
    }

    setIsApplyingPromo(true)

    // Simulate API call to validate promo code
    setTimeout(() => {
      if (promoCode.toLowerCase() === "eco10") {
        const discountAmount = subtotal * 0.1
        setDiscount(discountAmount)
        toast({
          title: "Promo code applied",
          description: "10% discount has been applied to your order",
        })
      } else {
        toast({
          title: "Invalid promo code",
          description: "The promo code you entered is invalid",
          variant: "destructive",
        })
      }
      setIsApplyingPromo(false)
    }, 1000)
  }

  const proceedToCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Empty cart",
        description: "Your cart is empty. Add some items before checkout.",
        variant: "destructive",
      })
      return
    }

    router.push("/checkout")
  }

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = cartItems.length > 0 ? 149 : 0
  const total = subtotal + shipping - discount

  return (
    <div className="container py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <Link href="/products">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continue Shopping
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Your Cart</h1>
        </div>

        {cartItems.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">Looks like you haven't added any items to your cart yet.</p>
              <Link href="/products">
                <Button className="bg-green-600 hover:bg-green-700">Browse Products</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Cart Items ({cartItems.length})</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex p-4 border-b last:border-b-0">
                      <div className="w-20 h-20 rounded overflow-hidden flex-shrink-0">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="font-bold">₹{(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        <p className="text-sm text-muted-foreground">Seller: {item.seller}</p>
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-r-none"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              -
                            </Button>
                            <Input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                              className="h-8 w-12 rounded-none text-center"
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-l-none"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              +
                            </Button>
                          </div>
                          <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                            <Trash className="h-4 w-4" />
                            <span className="sr-only">Remove item</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-₹{discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>₹{shipping.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>

                  <div className="pt-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                      />
                      <Button variant="outline" onClick={applyPromoCode} disabled={isApplyingPromo}>
                        {isApplyingPromo ? "Applying..." : "Apply"}
                      </Button>
                    </div>
                    {promoCode.toLowerCase() === "eco10" && discount > 0 && (
                      <p className="text-xs text-green-600 mt-1">ECO10 promo code applied!</p>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-green-600 hover:bg-green-700" onClick={proceedToCheckout}>
                    Proceed to Checkout
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

