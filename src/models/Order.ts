import mongoose from 'mongoose'
import { AppLogger, AppLoggerLevel } from '../middlewares/app-logger'
import { IOrder } from '../interfaces/IOrder'

interface OrderAttrs extends IOrder {}

interface IOrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc
}
export interface OrderDoc extends mongoose.Document {}
const OrderSchema = new mongoose.Schema({
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
  status: {
    type: Number,
    required: [true, 'Please provide a status.']
  },
  transactionId: {
    type: String
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

OrderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order(attrs)
}

OrderSchema.pre('save', async function (done) {
  if (this.isNew) {
    this.createdAt = Date.now()
    AppLogger(AppLoggerLevel.INFO, `Creating new Order (${this._id}).`)
  }
  done()  
})

OrderSchema.post('save', (doc: OrderDoc) => {
  doc.set('updatedAt', Date.now())
  AppLogger(AppLoggerLevel.INFO, `Order ${doc._id} has been saved.`)
})

const Order = mongoose.model<OrderDoc, IOrderModel>('Order', OrderSchema)

export default Order
