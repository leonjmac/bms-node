import { IInvoiceAttrs } from '../../interfaces/IInvoice'
import { IOrderAttrs } from '../../interfaces/IOrder'
import { ITransactionPlatform } from '../../interfaces/ITransaction'

const setupCheckout = async (data: IInvoiceAttrs | IOrderAttrs, platform: ITransactionPlatform) => {
  try {
    /// Do something
  } catch (err) {
    throw err
  }
}

const createTransaction = async (data: IInvoiceAttrs | IOrderAttrs, platform: ITransactionPlatform) => {
  try {
    switch (platform) {
      case ITransactionPlatform.adyen:
        break

      case ITransactionPlatform.braintree:
        break

      case ITransactionPlatform.paypal:
        break

      case ITransactionPlatform.primer:
        break

      case ITransactionPlatform.stripe:
        break

      default:
        /// Do nothing

    }
  } catch (err) {

  }
}

export { setupCheckout, createTransaction }