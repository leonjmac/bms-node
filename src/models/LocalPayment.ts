import mongoose from 'mongoose'
import { AppLogger, AppLoggerLevel } from '../middlewares/app-logger'
import { ILocalPayment, ILocalPaymentAttrs } from '../interfaces/ILocalPayment'

interface LocalPaymentAttrs extends ILocalPaymentAttrs {}

interface ILocalPaymentModel extends mongoose.Model<LocalPaymentDoc> {
  build(attrs: LocalPaymentAttrs): LocalPaymentDoc
}

export interface LocalPaymentDoc extends ILocalPayment {}

const LocalPaymentSchema = new mongoose.Schema({
  referenceId: {
    type: String,
    required: true
  },
  referenceType: {
    type: Number,
    required: true
  },
  status: {
    type: Number,
    required: true
  },
  merchantAccountId: {
    type: String
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

LocalPaymentSchema.statics.build = (attrs: LocalPaymentAttrs) => {
  return new LocalPayment(attrs)
}

LocalPaymentSchema.pre('save', async function (done) {
  if (this.isNew) {
    this.createdAt = Date.now()
    AppLogger(AppLoggerLevel.INFO, `Creating new LocalPayment (${this._id}).`)
  }
  this.updatedAt = Date.now()
  done()  
})

LocalPaymentSchema.post('save', (doc: LocalPaymentDoc) => {
  AppLogger(AppLoggerLevel.INFO, `LocalPayment ${doc._id} has been saved.`)
})

const LocalPayment = mongoose.model<LocalPaymentDoc, ILocalPaymentModel>('Local_Payment', LocalPaymentSchema)

export default LocalPayment