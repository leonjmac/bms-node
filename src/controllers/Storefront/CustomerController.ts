import Customer from '../../models/Customer'
import Order from '../../models/Order'
import Invoice from '../../models/Invoice'
import { ICustomerAttrs } from '../../interfaces/ICustomer'

const registerCustomer = async (data: ICustomerAttrs) => {
  try {
    return await Customer.build(data).save({ validateBeforeSave: true })
  } catch (err) {
    throw err
  }
}

const fetchCustomer = async (id: string, withOrders?: boolean, withInvoices?: boolean) => {
  try {
    const customer = await Customer.findById(id)
    if(customer && withOrders) {
      await customer.populate({ path: 'orders', model: Order })
    }
    if(customer && withInvoices) {
      await customer.populate({ path: 'invoices', model: Invoice })
    }    
    return customer
  } catch (err) {
    throw err
  }
}

const fetchCustomers = async (withOrders?: boolean, withInvoices?: boolean) => {
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