import Link from "next/link"
import { Grid, List } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

// Mock categories
const categories = [
  { id: "all", name: "All Categories" },
  { id: "furniture", name: "Furniture" },
  { id: "fashion", name: "Fashion" },
  { id: "electronics", name: "Electronics" },
  { id: "home-decor", name: "Home Decor" },
  { id: "books", name: "Books" },
  { id: "toys", name: "Toys" },
]

// Update the mock products with Indian Rupee prices
const products = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  price: Math.floor(Math.random() * 5000) + 999,
  category: categories[Math.floor(Math.random() * (categories.length - 1)) + 1].id,
  image: `/placeholder.svg?height=200&width=200`,
  seller: `Seller ${Math.floor(Math.random() * 5) + 1}`,
}))

export default function ProductsPage() {
  return (
    <div className="container px-4 py-8 md:py-12">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Shop Products</h1>
          <p className="text-muted-foreground">Browse our collection of pre-loved items</p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="w-full md:w-64 space-y-6">
            <Card>
              <CardContent className="p-4 space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Search</h3>
                  <div className="relative">
                    <Input placeholder="Search products..." />
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center">
                        <Link
                          href={`/products${category.id === "all" ? "" : `/category/${category.id}`}`}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          {category.name}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Price Range</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Input type="number" placeholder="Min" />
                    <Input type="number" placeholder="Max" />
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Condition</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input type="checkbox" id="condition-new" className="mr-2" />
                      <label htmlFor="condition-new" className="text-sm">
                        Like New
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="condition-good" className="mr-2" />
                      <label htmlFor="condition-good" className="text-sm">
                        Good
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="condition-fair" className="mr-2" />
                      <label htmlFor="condition-fair" className="text-sm">
                        Fair
                      </label>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700">Apply Filters</Button>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <Grid className="h-4 w-4" />
                  <span className="sr-only">Grid view</span>
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <List className="h-4 w-4" />
                  <span className="sr-only">List view</span>
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Select defaultValue="newest">
                  <SelectTrigger className="w-[180px] h-8">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <Link href={`/products/${product.id}`}>
                    <div className="aspect-square relative">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="object-cover w-full h-full"
                      />
                      <Badge className="absolute top-2 right-2">{product.category}</Badge>
                    </div>
                  </Link>
                  <CardContent className="p-4">
                    <Link href={`/products/${product.id}`}>
                      <h3 className="font-medium text-lg truncate">{product.name}</h3>
                    </Link>
                    <div className="flex justify-between items-center mt-2">
                      <p className="font-bold">₹{product.price.toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">by {product.seller}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button className="w-full bg-green-600 hover:bg-green-700">Add to Cart</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <Pagination className="mt-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  )
}

