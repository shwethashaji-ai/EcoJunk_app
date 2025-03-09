"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createUser, getUserByEmail } from "@/lib/db"

// In a real app, you would use a proper password hashing library like bcrypt
const hashPassword = (password) => {
  // This is a mock implementation - DO NOT use in production
  return password
}

const comparePasswords = (password, hashedPassword) => {
  // This is a mock implementation - DO NOT use in production
  return password === hashedPassword
}

export async function register(formData) {
  const name = formData.get("name")
  const email = formData.get("email")
  const password = formData.get("password")

  if (!name || !email || !password) {
    return { error: "All fields are required" }
  }

  try {
    const existingUser = await getUserByEmail(email)

    if (existingUser) {
      return { error: "Email already in use" }
    }

    const hashedPassword = hashPassword(password)

    const user = await createUser({
      name,
      email,
      password: hashedPassword,
    })

    return { success: true, user }
  } catch (error) {
    return { error: "Something went wrong. Please try again." }
  }
}

export async function login(formData) {
  const email = formData.get("email")
  const password = formData.get("password")

  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  try {
    const user = await getUserByEmail(email)

    if (!user) {
      return { error: "Invalid email or password" }
    }

    const passwordMatch = comparePasswords(password, user.password)

    if (!passwordMatch) {
      return { error: "Invalid email or password" }
    }

    // Create a session
    const session = {
      userId: user.id,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    }

    // In a real app, you would encrypt this session
    const sessionStr = JSON.stringify(session)

    // Set the session cookie
    cookies().set("session", sessionStr, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: session.expires,
      path: "/",
    })

    return { success: true }
  } catch (error) {
    return { error: "Something went wrong. Please try again." }
  }
}

export async function logout() {
  cookies().delete("session")
  redirect("/auth/login")
}

export async function getSession() {
  const sessionCookie = cookies().get("session")

  if (!sessionCookie) {
    return null
  }

  try {
    // In a real app, you would decrypt the session
    const session = JSON.parse(sessionCookie.value)

    if (new Date(session.expires) < new Date()) {
      cookies().delete("session")
      return null
    }

    return session
  } catch (error) {
    return null
  }
}

