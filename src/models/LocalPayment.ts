import mongoose from 'mongoose'
import { AppLogger, AppLoggerLevel } from '../middlewares/app-logger'
import { ILocalPayment } from '../interfaces/ILocalPayment'

interface LocalPaymentAttrs extends ILocalPayment {}

interface ILocalPaymentModel extends mongoose.Model<LocalPaymentDoc> {
  build(attrs: LocalPaymentAttrs): LocalPaymentDoc
}

export interface LocalPaymentDoc extends mongoose.Document {}

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

LocalPaymentSchema.statics.build = (attrs: LocalPaymentAttrs) => {
  return new LocalPayment(attrs)
}

LocalPaymentSchema.pre('save', async function (done) {
  if (this.isNew) {
    this.createdAt = Date.now()
    AppLogger(AppLoggerLevel.INFO, `Creating new LocalPayment (${this._id}).`)
  }
  done()  
})

LocalPaymentSchema.post('save', (doc: LocalPaymentDoc) => {
  doc.set('updatedAt', Date.now())
  AppLogger(AppLoggerLevel.INFO, `LocalPayment ${doc._id} has been saved.`)
})

const LocalPayment = mongoose.model<LocalPaymentDoc, ILocalPaymentModel>('LocalPayment', LocalPaymentSchema)

export default LocalPayment