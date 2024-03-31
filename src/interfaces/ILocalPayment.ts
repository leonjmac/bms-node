import { Document } from 'mongoose'

export interface ILocalPaymentAttrs {
  referenceId: string
  referenceType: ILocalPaymentReferenceType
  status: ILocalPaymentStatus
  merchantAccountId?: string
}

export interface ILocalPayment extends ILocalPaymentAttrs, Document {
  id: string  
  createdAt: Date
  updatedAt?: Date
}

export enum ILocalPaymentReferenceType {
  order,
  invoice
}

export enum ILocalPaymentStatus {
  pending,
  captured,
  expired
}