import mongoose from 'mongoose'
import { AppLogger, AppLoggerLevel } from '../middlewares/app-logger'
import { IOrder, IOrderAttrs, IOrderItem } from '../interfaces/IOrder'

interface OrderAttrs extends IOrderAttrs {}

interface IOrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc
}

export interface OrderDoc extends IOrder {}

const OrderSchema = new mongoose.Schema({
  reference: {
    type: String,
    required: [true, 'Please provide a reference.']
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer'
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
  transaction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transaction'
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

OrderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order(attrs)
}

OrderSchema.pre('save', async function (done) {
  if (this.isNew) {
    this.createdAt = Date.now()
    AppLogger(AppLoggerLevel.INFO, `Creating new Order (${this._id}).`)
  }
  this.total = this.items.reduce((acc: number, item: IOrderItem) => acc + ((item.baseUnitPrice - (item.discountUnitPrice ?? 0)) * item.quantity), 0)
  this.updatedAt = Date.now()
  done()  
})

OrderSchema.post('save', (doc: OrderDoc) => {
  AppLogger(AppLoggerLevel.INFO, `Order ${doc._id} has been saved.`)
})

const Order = mongoose.model<OrderDoc, IOrderModel>('Order', OrderSchema)

export default Order
