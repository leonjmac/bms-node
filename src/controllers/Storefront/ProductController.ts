import Product from '../../models/Product'
import { IProductAttrs, IProductCategory } from '../../interfaces/IProduct'

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

const fetchProducts = async (category?: IProductCategory) => {
  try {
    return await Product
      .find({})
      .where({ category })
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

export { fetchProduct, fetchProducts, registerProduct, updateProduct }