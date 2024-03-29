export interface ILocalPayment {
  id: string
  referenceId: string
  referenceType: ILocalPaymentReferenceType
  status: ILocalPaymentStatus
  merchantAccountId?: string
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