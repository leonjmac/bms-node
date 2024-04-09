import Customer from '../../models/Customer'
import { ICustomerAttrs } from '../../interfaces/ICustomer'

const registerCustomer = async (data: ICustomerAttrs) => {
  try {
    return await Customer.build(data).save({ validateBeforeSave: true })
  } catch (err) {
    throw err
  }
}

const fetchCustomer = async (id: string) => {
  try {
    return await Customer.findById(id)
  } catch (err) {
    throw err
  }
}

const fetchCustomers = async () => {
  try {
    return await Customer.find({})
  } catch (err) {
    throw err
  }
}

const updateCustomer = async (id: string, data: ICustomerAttrs) => {
  try {
    return await Customer.findByIdAndUpdate(id, data)
  } catch (err) {
    throw err
  }
}

export { fetchCustomer, fetchCustomers, registerCustomer, updateCustomer }