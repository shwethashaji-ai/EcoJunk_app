"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Heart, Menu, Recycle, Search, ShoppingCart, User, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"

export function MainNav() {
  const pathname = usePathname()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // This would come from your auth context in a real app

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4">
              <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
                <Recycle className="h-6 w-6 text-green-600" />
                <span>EcoJunk</span>
              </Link>
              <Link
                href="/"
                className={`text-lg font-medium ${pathname === "/" ? "text-green-600" : "text-foreground/60"}`}
              >
                Home
              </Link>
              <Link
                href="/products"
                className={`text-lg font-medium ${pathname === "/products" ? "text-green-600" : "text-foreground/60"}`}
              >
                Shop
              </Link>
              <Link
                href="/sell"
                className={`text-lg font-medium ${pathname === "/sell" ? "text-green-600" : "text-foreground/60"}`}
              >
                Sell
              </Link>
              <Link
                href="/about"
                className={`text-lg font-medium ${pathname === "/about" ? "text-green-600" : "text-foreground/60"}`}
              >
                About
              </Link>
              {!isLoggedIn ? (
                <div className="flex flex-col gap-2 mt-4">
                  <Link href="/auth/login">
                    <Button variant="outline" className="w-full">
                      Log In
                    </Button>
                  </Link>
                  <Link href="/auth/register">
                    <Button className="w-full bg-green-600 hover:bg-green-700">Register</Button>
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-2 mt-4">
                  <Link href="/dashboard">
                    <Button variant="outline" className="w-full">
                      Dashboard
                    </Button>
                  </Link>
                  <Button variant="destructive" className="w-full" onClick={() => setIsLoggedIn(false)}>
                    Log Out
                  </Button>
                </div>
              )}
            </nav>
          </SheetContent>
        </Sheet>
        <Link href="/" className="flex items-center gap-2 mr-6">
          <Recycle className="h-6 w-6 text-green-600" />
          <span className="font-bold inline-block">EcoJunk</span>
        </Link>
        <nav className="hidden md:flex gap-6 flex-1">
          <Link
            href="/"
            className={`text-sm font-medium ${pathname === "/" ? "text-green-600" : "text-foreground/60"} transition-colors hover:text-foreground`}
          >
            Home
          </Link>
          <Link
            href="/products"
            className={`text-sm font-medium ${pathname === "/products" ? "text-green-600" : "text-foreground/60"} transition-colors hover:text-foreground`}
          >
            Shop
          </Link>
          <Link
            href="/sell"
            className={`text-sm font-medium ${pathname === "/sell" ? "text-green-600" : "text-foreground/60"} transition-colors hover:text-foreground`}
          >
            Sell
          </Link>
          <Link
            href="/about"
            className={`text-sm font-medium ${pathname === "/about" ? "text-green-600" : "text-foreground/60"} transition-colors hover:text-foreground`}
          >
            About
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          {isSearchOpen ? (
            <div className="hidden md:flex items-center relative">
              <Input type="search" placeholder="Search..." className="w-[200px] lg:w-[300px]" autoFocus />
              <Button variant="ghost" size="icon" className="absolute right-0" onClick={() => setIsSearchOpen(false)}>
                <X className="h-4 w-4" />
                <span className="sr-only">Close search</span>
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              aria-label="Search"
              className="hidden md:flex"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          )}
          <Button variant="ghost" size="icon" aria-label="Wishlist" asChild>
            <Link href="/wishlist">
              <Heart className="h-5 w-5" />
              <span className="sr-only">Wishlist</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" aria-label="Cart" asChild className="relative">
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">0</Badge>
              <span className="sr-only">Cart</span>
            </Link>
          </Button>
          {!isLoggedIn ? (
            <div className="hidden md:flex gap-2">
              <Link href="/auth/login">
                <Button variant="ghost" size="sm">
                  Log In
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  Register
                </Button>
              </Link>
            </div>
          ) : (
            <Button variant="ghost" size="icon" aria-label="Account" asChild>
              <Link href="/dashboard">
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}

