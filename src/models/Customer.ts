import mongoose from 'mongoose'
import { AppLogger, AppLoggerLevel } from '../middlewares/app-logger'
import { ICustomer, ICustomerAttrs } from '../interfaces/ICustomer'

interface CustomerAttrs extends ICustomerAttrs {}

interface ICustomerModel extends mongoose.Model<CustomerDoc> {
  build(attrs: CustomerAttrs): CustomerDoc
}

export interface CustomerDoc extends ICustomer {}

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
    type: Number
  },
  billingAddress: {
    type: Array
  },
  shippingAddress: {
    type: Array
  },
  orders: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }]
  },
  invoices: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Invoice' }]
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
      if(ret.dateOfBirth) { ret.dateOfBirth = new Date(ret.dateOfBirth) }
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
  this.updatedAt = Date.now()
  done()  
})

CustomerSchema.post('save', (doc: CustomerDoc) => {
  AppLogger(AppLoggerLevel.INFO, `Customer ${doc._id} has been saved.`)
})

const Customer = mongoose.model<CustomerDoc, ICustomerModel>('Customer', CustomerSchema)

export default Customer
