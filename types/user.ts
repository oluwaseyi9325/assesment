export interface UserType {
  id: string
  name: string
  email: string
  role: string
  leadsAssigned?: number
}

export interface CreateUserInput {
  name: string
  email: string
  role: string
  password: string
}

export interface UpdateUserInput {
  name?: string
  email?: string
  role?: string
  password?: string
}
