import mongoose from 'mongoose'
import { AppLogger, AppLoggerLevel } from '../middlewares/app-logger'
import { ITransaction, ITransactionAttrs } from '../interfaces/ITransaction'

interface TransactionAttrs extends ITransactionAttrs {}

interface ITransactionModel extends mongoose.Model<TransactionDoc> {
  build(attrs: TransactionAttrs): TransactionDoc
}

export interface TransactionDoc extends ITransaction {}

const TransactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: [true, 'Please provide an amount.'],
    validate: {
      validator: (v: number) => v > 0,
      message: 'Amount must be greater than zero.'
    }
  },
  currency: {
    type: String,
    required: [true, 'Please provide a currency.']
  },
  platform: {
    type: Number,
    required: [true, 'Please specify a platform.']
  },
  paymentMethod: {
    type: String,
    required: [true, 'Please specify a payment method.']
  },
  paymentMethodDetails: {
    type: String,
    required: [true, 'Please provide payment method details.']
  },
  status: {
    type: Number,
    required: [true, 'Please specify a status.']
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

TransactionSchema.statics.build = (attrs: TransactionAttrs) => {
  return new Transaction(attrs)
}

TransactionSchema.pre('save', async function (done) {
  if (this.isNew) {
    this.createdAt = Date.now()
    AppLogger(AppLoggerLevel.INFO, `Creating new Transaction (${this._id}).`)
  }
  this.updatedAt = Date.now()
  done()  
})

TransactionSchema.post('save', (doc: TransactionDoc) => {
  AppLogger(AppLoggerLevel.INFO, `Transaction ${doc._id} has been saved.`)
})

const Transaction = mongoose.model<TransactionDoc, ITransactionModel>('Transaction', TransactionSchema)

export default Transaction
