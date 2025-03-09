import Link from "next/link"
import { Facebook, Instagram, Recycle, Twitter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SiteFooter() {
  return (
    <footer className="bg-muted/50">
      <div className="container px-4 py-12 md:py-16 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Recycle className="h-6 w-6 text-green-600" />
              <span className="font-bold text-xl">EcoJunk</span>
            </Link>
            <p className="text-muted-foreground">Giving pre-loved items a second life while helping the planet.</p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-foreground">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/products/category/furniture" className="text-muted-foreground hover:text-foreground">
                  Furniture
                </Link>
              </li>
              <li>
                <Link href="/products/category/fashion" className="text-muted-foreground hover:text-foreground">
                  Fashion
                </Link>
              </li>
              <li>
                <Link href="/products/category/electronics" className="text-muted-foreground hover:text-foreground">
                  Electronics
                </Link>
              </li>
              <li>
                <Link href="/products/category/home-decor" className="text-muted-foreground hover:text-foreground">
                  Home Decor
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-muted-foreground hover:text-foreground">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/sustainability" className="text-muted-foreground hover:text-foreground">
                  Sustainability
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Newsletter</h3>
            <p className="text-muted-foreground">Subscribe to our newsletter for eco-tips and exclusive offers.</p>
            <div className="flex gap-2">
              <Input type="email" placeholder="Your email" />
              <Button className="bg-green-600 hover:bg-green-700">Subscribe</Button>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} EcoJunk. All rights reserved.</p>
            <div className="flex gap-4 text-sm">
              <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                Terms
              </Link>
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
              <Link href="/cookies" className="text-muted-foreground hover:text-foreground">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

