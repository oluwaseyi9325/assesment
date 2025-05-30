import axios from "axios"
import type { UserType, CreateUserInput, UpdateUserInput } from "@/types/user"

const API_URL = "https://ca1a48ee0881b4f9cc4b.free.beeceptor.com/api"

// Create an axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Fetch all users
export const fetchUsers = async (): Promise<UserType[]> => {
  try {
    const response = await api.get("/users")
    console.log("Fetched users:", response.data)
    return response.data as UserType[]
  } catch (error) {
    console.error("Error fetching users:", error)
    throw error
  }
}

// Create a new user
export const createUser = async (userData: CreateUserInput): Promise<UserType> => {
  try {
    const response = await api.post("/users", userData)
    console.log("Created user:", response.data)
    return response.data as UserType
  } catch (error) {
    console.error("Error creating user:", error)
    throw error
  }
}

// Update a user
export const updateUser = async (userId: string, userData: UpdateUserInput): Promise<UserType> => {
  try {
    const response = await api.put(`/users/${userId}`, userData)
    console.log("Updated user:", response.data)
    return response.data as UserType
  } catch (error) {
    console.error("Error updating user:", error)
    throw error
  }
}

// Delete a user
export const deleteUser = async (userId: string): Promise<void> => {
  try {
    await api.delete(`/users/${userId}`)
    console.log("Deleted user with ID:", userId)
  } catch (error) {
    console.error("Error deleting user:", error)
    throw error
  }
}
