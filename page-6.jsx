"use client"

import { useState } from "react"
import Link from "next/link"
import { Package, ShoppingBag, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

// Mock user data
const userData = {
  name: "John Doe",
  email: "john@example.com",
  joinDate: "January 2023",
  orders: [
    {
      id: "ECO123456",
      date: "March 15, 2023",
      total: 5498,
      status: "Delivered",
      items: [
        { name: "Vintage Wooden Chair", quantity: 1, price: 3499 },
        { name: "Recycled Glass Vase", quantity: 1, price: 1999 },
      ],
    },
    {
      id: "ECO789012",
      date: "February 28, 2023",
      total: 2450,
      status: "Processing",
      items: [{ name: "Upcycled Denim Bag", quantity: 1, price: 2450 }],
    },
  ],
  listings: [
    {
      id: 1,
      name: "Antique Brass Lamp",
      price: 4500,
      status: "Active",
      views: 24,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      name: "Handmade Ceramic Planter",
      price: 1850,
      status: "Sold",
      views: 42,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 3,
      name: "Vintage Record Player",
      price: 8999,
      status: "Active",
      views: 18,
      image: "/placeholder.svg?height=100&width=100",
    },
  ],
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("profile")

  return (
    <div className="container py-8 md:py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-8">My Dashboard</h1>

        <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="profile">
              <User className="mr-2 h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="orders">
              <ShoppingBag className="mr-2 h-4 w-4" />
              My Orders
            </TabsTrigger>
            <TabsTrigger value="listings">
              <Package className="mr-2 h-4 w-4" />
              My Listings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Manage your account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Full Name</p>
                  <p>{userData.name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Email</p>
                  <p>{userData.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Member Since</p>
                  <p>{userData.joinDate}</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Edit Profile</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Order History</h2>
                <p className="text-muted-foreground">
                  {userData.orders.length} {userData.orders.length === 1 ? "order" : "orders"}
                </p>
              </div>

              {userData.orders.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                    <p className="text-muted-foreground mb-6">You haven't placed any orders yet.</p>
                    <Link href="/products">
                      <Button className="bg-green-600 hover:bg-green-700">Start Shopping</Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                userData.orders.map((order) => (
                  <Card key={order.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                          <CardDescription>{order.date}</CardDescription>
                        </div>
                        <Badge variant={order.status === "Delivered" ? "outline" : "default"}>{order.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between">
                            <span>
                              {item.name} <span className="text-muted-foreground">x{item.quantity}</span>
                            </span>
                            <span>₹{item.price.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between font-medium mt-4 pt-4 border-t">
                        <span>Total</span>
                        <span>₹{order.total.toFixed(2)}</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm">
                        View Order Details
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="listings">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">My Listings</h2>
                <Link href="/sell">
                  <Button className="bg-green-600 hover:bg-green-700">Add New Listing</Button>
                </Link>
              </div>

              {userData.listings.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <h3 className="text-lg font-medium mb-2">No listings yet</h3>
                    <p className="text-muted-foreground mb-6">You haven't listed any items for sale yet.</p>
                    <Link href="/sell">
                      <Button className="bg-green-600 hover:bg-green-700">Create Your First Listing</Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {userData.listings.map((listing) => (
                    <Card key={listing.id}>
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <div className="w-20 h-20 rounded overflow-hidden flex-shrink-0">
                            <img
                              src={listing.image || "/placeholder.svg"}
                              alt={listing.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h3 className="font-medium">{listing.name}</h3>
                              <Badge variant={listing.status === "Active" ? "default" : "secondary"}>
                                {listing.status}
                              </Badge>
                            </div>
                            <p className="font-bold mt-1">₹{listing.price.toFixed(2)}</p>
                            <p className="text-sm text-muted-foreground mt-1">{listing.views} views</p>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex gap-2 p-4 pt-0">
                        <Button variant="outline" size="sm" className="flex-1">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          Delete
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

