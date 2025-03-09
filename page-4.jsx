import Link from "next/link"
import { CheckCircle, Package } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function CheckoutSuccessPage() {
  // In a real app, you would fetch the order details from your API
  const orderNumber = "ECO" + Math.floor(100000 + Math.random() * 900000)

  return (
    <div className="container flex items-center justify-center py-16 md:py-24">
      <div className="max-w-md w-full">
        <Card className="text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Order Confirmed!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Thank you for your purchase. Your order has been confirmed and is now being processed.</p>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Order Number</p>
              <p className="font-medium text-lg">{orderNumber}</p>
            </div>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Package className="h-4 w-4" />
              <span>You will receive an email confirmation shortly</span>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Link href="/dashboard" className="w-full">
              <Button className="w-full bg-green-600 hover:bg-green-700">View Order Status</Button>
            </Link>
            <Link href="/products" className="w-full">
              <Button variant="outline" className="w-full">
                Continue Shopping
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

