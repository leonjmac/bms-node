import Invoice from '../../models/Invoice'
import { IInvoiceAttrs, IInvoiceStatus } from '../../interfaces/IInvoice'

const registerInvoice = async (data: IInvoiceAttrs) => {
  try {
    return await Invoice.build(data).save({ validateBeforeSave: true })
  } catch (err) {
    throw err
  }
}

const fetchInvoice = async (id: string) => {
  try {
    return await Invoice.findById(id)
  } catch (err) {
    throw err
  }
}

const fetchInvoices = async (current: boolean = true) => {
  try {
    return await Invoice
      .find({})
      .where({ status: current && IInvoiceStatus.draft || IInvoiceStatus.issued })
  } catch (err) {
    throw err
  }
}

const updateInvoice = async (id: string, data: IInvoiceAttrs) => {
  try {
    return await Invoice.findByIdAndUpdate(id, data)
  } catch (err) {
    throw err
  }
}

export { fetchInvoice, fetchInvoices, registerInvoice, updateInvoice }