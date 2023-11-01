import type { UUID } from 'crypto';

export interface User {
  userId: UUID,
  companyName: string,
  cif: string,
  email: string,
  password: string,
  phone: string,
  address: string,
  city: string,
  country: string,
  province: string,
  postalCode: string,
  web?: string,
  role?: string,
  createdAt?: Date,
  modifiedAt?: Date
}