import Link from "next/link"
import { ArrowRight, Leaf, ShieldCheck, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"
import FeaturedProducts from "@/components/featured-products"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-green-50 to-white dark:from-green-950 dark:to-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Give Your Items a Second Life
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Buy, sell, and trade pre-loved items. Reduce waste, save money, and help the planet.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/products">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700">
                    Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button size="lg" variant="outline">
                    Join EcoJunk
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full max-w-[500px] aspect-square overflow-hidden rounded-xl">
                <img
                  src="/placeholder.svg?height=600&width=600"
                  alt="EcoJunk Marketplace"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Why Choose EcoJunk?</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join thousands of eco-conscious shoppers and sellers making a difference.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-8">
            <div className="flex flex-col items-center space-y-2 rounded-lg p-4">
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                <Leaf className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold">Eco-Friendly</h3>
              <p className="text-center text-muted-foreground">
                Every purchase reduces waste and helps protect our environment.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg p-4">
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                <ShieldCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold">Secure Transactions</h3>
              <p className="text-center text-muted-foreground">Shop with confidence with our secure payment system.</p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg p-4">
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                <Truck className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold">Local Delivery</h3>
              <p className="text-center text-muted-foreground">
                Reduce carbon footprint with our local delivery options.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Products</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Discover unique pre-loved items from our community.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:gap-12 mt-8">
            <FeaturedProducts />
          </div>
          <div className="flex justify-center mt-8">
            <Link href="/products">
              <Button size="lg" variant="outline">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join our circular economy in three simple steps.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-8">
            <div className="flex flex-col items-center space-y-2 rounded-lg p-4">
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full text-xl font-bold">1</div>
              <h3 className="text-xl font-bold">Create an Account</h3>
              <p className="text-center text-muted-foreground">
                Sign up for free and join our eco-conscious community.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg p-4">
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full text-xl font-bold">2</div>
              <h3 className="text-xl font-bold">Buy or Sell Items</h3>
              <p className="text-center text-muted-foreground">
                List your unused items or shop for pre-loved treasures.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg p-4">
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full text-xl font-bold">3</div>
              <h3 className="text-xl font-bold">Make a Difference</h3>
              <p className="text-center text-muted-foreground">
                Every transaction helps reduce waste and protect our planet.
              </p>
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <Link href="/auth/register">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Get Started Today
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

