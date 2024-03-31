import mongoose from 'mongoose'
import { AppLogger, AppLoggerLevel } from '../middlewares/app-logger'
import { IInvoice } from '../interfaces/IInvoice'

interface InvoiceAttrs extends IInvoice {}

interface IInvoiceModel extends mongoose.Model<InvoiceDoc> {
  build(attrs: InvoiceAttrs): InvoiceDoc
}
export interface InvoiceDoc extends mongoose.Document {}
const InvoiceSchema = new mongoose.Schema({
  reference: {
    type: String,
    required: [true, 'Please provide a reference.']
  },
  customerId: {
    type: String,
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
  transactionId: {
    type: String
  },
  status: {
    type: Number,
    required: [true, 'Please provide a status.']
  },
  createdAt: {
    type: Number,
    required: [true, 'Please provide a creation date.']
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
  done()  
})

InvoiceSchema.post('save', (doc: InvoiceDoc) => {
  doc.set('updatedAt', Date.now())
  AppLogger(AppLoggerLevel.INFO, `Invoice ${doc._id} has been saved.`)
})

const Invoice = mongoose.model<InvoiceDoc, IInvoiceModel>('Invoice', InvoiceSchema)

export default Invoice
