import fs from 'fs'
import Product from '../../models/Product'
import { IProductAttrs, IProductKind } from '../../interfaces/IProduct'
import { AppLogger, AppLoggerLevel } from '../../middlewares/app-logger'

const seedProducts = async () => {
  try {
    const products: IProductAttrs[] = JSON.parse(fs.readFileSync('seeds/products.json', 'utf-8'))
    products.map(async product => {
      await Product.build(product).save({ validateBeforeSave: true })
    })
    AppLogger(AppLoggerLevel.INFO, 'Products seeded.')
  } catch (err) {
    throw err
  }
}

const registerProduct = async (data: IProductAttrs) => {
  try {
    return await Product.build(data).save({ validateBeforeSave: true })
  } catch (err) {
    throw err
  }
}

const fetchProduct = async (id: string) => {
  try {
    return await Product.findById(id)
  } catch (err) {
    throw err
  }
}

const fetchProducts = async (kind?: IProductKind) => {
  try {
    return await Product
      .find({})
      .where({ kind })
  } catch (err) {
    throw err
  }
}

const updateProduct = async (id: string, data: IProductAttrs) => {
  try {
    return await Product.findByIdAndUpdate(id, data)
  } catch (err) {
    throw err
  }
}

export { fetchProduct, fetchProducts, registerProduct, updateProduct, seedProducts }