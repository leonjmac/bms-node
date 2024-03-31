import mongoose from 'mongoose'
import { AppLogger, AppLoggerLevel } from '../middlewares/app-logger'
import { ICustomer } from '../interfaces/ICustomer'

interface CustomerAttrs extends ICustomer {}

interface ICustomerModel extends mongoose.Model<CustomerDoc> {
  build(attrs: CustomerAttrs): CustomerDoc
}
export interface CustomerDoc extends mongoose.Document {}
const CustomerSchema = new mongoose.Schema({
  references: {
    type: Array
  },
  forename: {
    type: String,
    required: [true, 'Please provide a forename.']
  },
  surname: {
    type: String,
    required: [true, 'Please provide a surname.']
  },
  email: {
    type: String,
    required: [true, 'Please provide an email.']
  },
  dateOfBirth: {
    type: Date
  },
  billingAddress: {
    type: Array
  },
  shippingAddress: {
    type: Array
  },
  orders: {
    type: Array
  },
  invoices: {
    type: Array
  },
  createdAt: {
    type: Number,
    required: true
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

CustomerSchema.statics.build = (attrs: CustomerAttrs) => {
  return new Customer(attrs)
}

CustomerSchema.pre('save', async function (done) {
  if (this.isNew) {
    this.createdAt = Date.now()
    AppLogger(AppLoggerLevel.INFO, `Creating new Customer (${this._id}).`)
  }
  done()  
})

CustomerSchema.post('save', (doc: CustomerDoc) => {
  doc.set('updatedAt', Date.now())
  AppLogger(AppLoggerLevel.INFO, `Customer ${doc._id} has been saved.`)
})

const Customer = mongoose.model<CustomerDoc, ICustomerModel>('Customer', CustomerSchema)

export default Customer
