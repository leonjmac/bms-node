import Order from '../../models/Order'
import { IOrderAttrs, IOrderStatus } from '../../interfaces/IOrder'

const registerOrder = async (data: IOrderAttrs) => {
  try {
    return await Order.build(data).save({ validateBeforeSave: true })
  } catch (err) {
    throw err
  }
}

const fetchOrder = async (id: string) => {
  try {
    return await Order.findById(id)
  } catch (err) {
    throw err
  }
}

const fetchOrders = async (current: boolean = true) => {
  try {
    return await Order
      .find({})
      .where({ status: current && IOrderStatus.created || IOrderStatus.authorized })
  } catch (err) {
    throw err
  }
}

const updateOrder = async (id: string, data: IOrderAttrs) => {
  try {
    return await Order.findByIdAndUpdate(id, data)
  } catch (err) {
    throw err
  }
}

export { fetchOrder, fetchOrders, registerOrder, updateOrder }