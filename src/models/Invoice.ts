import mongoose from 'mongoose'
import { AppLogger, AppLoggerLevel } from '../middlewares/app-logger'
import { IInvoice, IInvoiceAttrs, IInvoiceItem } from '../interfaces/IInvoice'

interface InvoiceAttrs extends IInvoiceAttrs {}

interface IInvoiceModel extends mongoose.Model<InvoiceDoc> {
  build(attrs: InvoiceAttrs): InvoiceDoc
}

export interface InvoiceDoc extends IInvoice {}

const InvoiceSchema = new mongoose.Schema({
  reference: {
    type: String,
    required: [true, 'Please provide a reference.']
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Customer',
    required: [true, 'Please provide a customer ID.']
  },
  billingAddress: {
    type: Object
  },
  shippingAddress: {
    type: Object
  },
  items: {
    type: Array,
    required: [true, 'Please provide at least one item.']
  },
  transaction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transaction'
  },
  status: {
    type: Number,
    required: [true, 'Please provide a status.']
  },
  total: {
    type: Number,
    required: true,
    validate: {
      validator: (v: number) => v >= 0,
      message: 'Total must be greater than or equal to 0.'
    },
    default: 0
  },
  createdAt: {
    type: Number,
    required: true,
    default: Date.now()
  },
  updatedAt: {
    type: Number
  }
},{
  toJSON: {
  virtuals: true,
  transform(doc, ret) {
    ret.id = ret._id
    ret.createdAt = new Date(ret.createdAt)
    ret.updatedAt = new Date(ret.updatedAt)

    delete ret._id
    delete ret.user_id
  },
  versionKey: false
  },
  toObject: {
  virtuals: true,
  versionKey: false
  }
})

InvoiceSchema.statics.build = (attrs: InvoiceAttrs) => {
  return new Invoice(attrs)
}

InvoiceSchema.pre('save', async function (done) {
  if (this.isNew) {
    this.createdAt = Date.now()
    AppLogger(AppLoggerLevel.INFO, `Creating new Invoice (${this._id}).`)
  }
  this.total = this.items.reduce((acc: number, item: IInvoiceItem) => acc + ((item.baseUnitPrice - (item.discountUnitPrice ?? 0)) * item.quantity), 0)
  this.updatedAt = Date.now()
  done()  
})

InvoiceSchema.post('save', (doc: InvoiceDoc) => {
  AppLogger(AppLoggerLevel.INFO, `Invoice ${doc._id} has been saved.`)
})

const Invoice = mongoose.model<InvoiceDoc, IInvoiceModel>('Invoice', InvoiceSchema)

export default Invoice
