/* import type { UUID } from 'crypto';

export interface User {
  userId: UUID
  companyName: string
  CIF: string
  email: string
  password: string
  phone: string
  address: string
  city: string
  country: string
  province: string
  postalCode: string
  web?: string
  role?: string
  createdAt?: Date
  modifiedAt?: Date
} */

export class User {
  constructor (
    readonly userId: string,
    readonly companyName: string,
    readonly CIF: string,
    readonly email: string,
    readonly password: string,
    readonly phone: string,
    readonly address: string,
    readonly city: string,
    readonly country: string,
    readonly province: string,
    readonly postalCode: string,
    readonly web?: string,
    readonly role?: string,
    readonly createdAt?: Date,
    readonly modifiedAt?: Date
  ) {};
}
