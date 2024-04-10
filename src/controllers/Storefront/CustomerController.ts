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
    const customers = await Customer.find({})
    if(!customers) { return [] }

    return Promise.all(customers.map(async (customer) => {
      if(withOrders) {
        await customer.populate({ path: 'orders', model: Order })
      }
      if(withInvoices) {
        await customer.populate({ path: 'invoices', model: Invoice })
      }
    })).then(() => {
      return customers
    })


    // if(customers && withOrders) {
    //   await Customer.populate(customers, { path: 'orders', model: Order })
    // }
    // if(customers && withInvoices) {
    //   await Customer.populate(customers, { path: 'invoices', model: Invoice })
    // }    
    // return customers
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