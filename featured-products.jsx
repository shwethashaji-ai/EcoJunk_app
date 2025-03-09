"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Heart, ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

// Mock featured products data
const mockProducts = [
  {
    id: 1,
    name: "Vintage Wooden Chair",
    price: 3499,
    category: "Furniture",
    image: "/placeholder.svg?height=200&width=200",
    seller: "EcoHome",
  },
  {
    id: 2,
    name: "Recycled Glass Vase",
    price: 1999,
    category: "Home Decor",
    image: "/placeholder.svg?height=200&width=200",
    seller: "GreenCraft",
  },
  {
    id: 3,
    name: "Upcycled Denim Bag",
    price: 2450,
    category: "Fashion",
    image: "/placeholder.svg?height=200&width=200",
    seller: "EcoFashion",
  },
]

export default function FeaturedProducts() {
  const [products, setProducts] = useState(mockProducts)
  const { toast } = useToast()

  // In a real app, you would fetch products from your API
  useEffect(() => {
    // Simulating API call
    // const fetchProducts = async () => {
    //   const response = await fetch('/api/products/featured')
    //   const data = await response.json()
    //   setProducts(data)
    // }
    // fetchProducts()
  }, [])

  const addToCart = (productId) => {
    toast({
      title: "Added to cart",
      description: "This product has been added to your cart",
    })
    // In a real app, you would call an API to add the product to the cart
  }

  return (
    <>
      {products.map((product) => (
        <Card key={product.id} className="overflow-hidden">
          <div className="relative">
            <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-48 object-cover" />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 rounded-full bg-white/80 hover:bg-white/90"
              onClick={() =>
                toast({
                  title: "Added to wishlist",
                  description: "This product has been added to your wishlist",
                })
              }
            >
              <Heart className="h-5 w-5" />
              <span className="sr-only">Add to wishlist</span>
            </Button>
          </div>
          <CardHeader className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <Badge variant="outline" className="mb-2">
                  {product.category}
                </Badge>
                <CardTitle className="text-lg">{product.name}</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="flex justify-between items-center">
              <p className="font-medium text-lg">₹{product.price.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground">by {product.seller}</p>
            </div>
          </CardContent>
          <CardFooter className="p-4 flex gap-2">
            <Button variant="outline" className="w-full" onClick={() => addToCart(product.id)}>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
            <Link href={`/products/${product.id}`} className="w-full">
              <Button variant="default" className="w-full bg-green-600 hover:bg-green-700">
                View Details
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </>
  )
}

