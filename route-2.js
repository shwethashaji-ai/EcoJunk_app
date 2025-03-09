import { NextResponse } from "next/server"
import { getProducts, createProduct } from "@/lib/db"
import { getSession } from "@/lib/auth"

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category") || undefined

  try {
    const products = await getProducts(category)
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(request) {
  const session = await getSession()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const formData = await request.formData()

    const name = formData.get("name")
    const description = formData.get("description")
    const price = Number.parseFloat(formData.get("price"))
    const category = formData.get("category")
    const condition = formData.get("condition")
    const imageFiles = formData.getAll("images")

    // In a real app, you would upload these images to a storage service
    // and store the URLs in the database
    const images = imageFiles.map((_, index) => `/placeholder.svg?height=500&width=500&text=Image${index + 1}`)

    const product = await createProduct({
      name,
      description,
      price,
      category,
      condition,
      images,
      sellerId: session.userId,
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}

