import LocalPayment from '../../models/LocalPayment'
import { ILocalPaymentAttrs } from '../../interfaces/ILocalPayment'

const registerPayment = async (data: ILocalPaymentAttrs) => {
  try {
    return await LocalPayment.build(data).save({ validateBeforeSave: true })
  } catch (err) {
    throw err
  }
}

const fetchPayment = async (id: string) => {
  try {
    return await LocalPayment.findById(id)
  } catch (err) {
    throw err
  }
}

const updatePayment = async (id: string, data: ILocalPaymentAttrs) => {
  try {
    return await LocalPayment.findByIdAndUpdate(id, data)
  } catch (err) {
    throw err
  }
}

export { registerPayment, fetchPayment, updatePayment }
