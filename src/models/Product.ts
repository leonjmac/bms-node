import mongoose from 'mongoose'
import { AppLogger, AppLoggerLevel } from '../middlewares/app-logger'
import { IProduct, IProductAttrs } from '../interfaces/IProduct'

interface ProductAttrs extends IProductAttrs {}

interface IProductModel extends mongoose.Model<ProductDoc> {
  build(attrs: ProductAttrs): ProductDoc
}

export interface ProductDoc extends IProduct {}

const ProductSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, 'Please provide a description.']
  },
  category: {
    type: Number,
    required: true
  },
  promote: {
    type: Boolean
  },
  sku: {
    type: String,
    required: [true, 'Please provide an SKU.']
  },
  baseUnitPrice: {
    type: Number,
    required: [true, 'Please provide a base unit price in smallest currency denomination.'],
    validate: {
      validator: function(v: number) {
        return v > 0 && Number.isSafeInteger(v)
      },
      message: 'Base unit price must be greater than zero.'
    }
  },
  currencyCode: {
    type: String,
    required: true
  },
  discountUnitPrice: {
    type: Number,
    validate: {
      validator: function(this: any, v: number) {
        return v < this.get('baseUnitPrice')
      },
      message: 'Discounted unit price must be less than the base unit price.'
    }
  },
  images: {
    type: [String]
  },
  url: {
    type: String
  },
  isCollectable: {
    type: Boolean
  },
  isDeliverable: {
    type: Boolean
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

ProductSchema.statics.build = (attrs: ProductAttrs) => {
  return new Product(attrs)
}

ProductSchema.pre('save', async function (done) {
  if (this.isNew) {
    this.createdAt = Date.now()
    AppLogger(AppLoggerLevel.INFO, `Creating new Product (${this._id}).`)
  }
  this.updatedAt = Date.now()
  done()  
})

ProductSchema.post('save', (doc: ProductDoc) => {
  AppLogger(AppLoggerLevel.INFO, `Product ${doc._id} has been saved.`)
})

const Product = mongoose.model<ProductDoc, IProductModel>('Product', ProductSchema)

export default Product
