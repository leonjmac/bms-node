import express, { Request, Response } from 'express'
import { setupCheckout } from './CheckoutController'
import { fetchCustomers } from './CustomerController'
import { fetchProduct, fetchProducts } from './ProductController'
import { IProductCategory } from '../../interfaces/IProduct'
import { ICustomerReferenceType } from '../../interfaces/ICustomer'

const app = express.Router()

// Product routes
const retrieveProducts = async (req: Request, res: Response) => {
  try {
    const category = req.query.category as unknown as IProductCategory || undefined;  
    const products = await fetchProducts(category)
    res.status(products.length > 0 ? 200 : 204).send({ products })
  } catch (err) {
    throw err
  }
}

const retrieveProdcut = async (req: Request, res: Response) => {
  try {
    const product = await fetchProduct(req.params.id)
    res.status(product ? 200 : 204).send({ product })
  } catch (err) {
    throw err
  }
}

// Checkout routes
const prepareCheckout = async (req: Request, res: Response) => {
  try {
    const response = await setupCheckout(req.body.data, req.body.platform)
    res.status(201).send(response)
  } catch (err) {
    throw err
  }
}

const processCheckout = async (req: Request, res: Response) => {
  try {
    const response = await processCheckout(req.body.data, req.body.platform)
    res.status(201).send(response)
  } catch (err) {
    throw err
  }
}

const updateCheckout = async (req: Request, res: Response) => {
  try {
    // TODO: Update checkout
  } catch (err) {
    throw err
  }
}

// Gaming / gambling / crypto/ cfd routes
const uniquePayPalAccountCheck = async (req: Request, res: Response) => {
  try {
    const customers = await fetchCustomers()
    if(customers.length == 0) { return res.status(204).send() }

    const customer = customers.filter((customer) => {
      return customer.references?.some((reference) => {
        return reference.type === ICustomerReferenceType.paypal && reference.reference === req.params['id']
      })
    })
    res.status(200).send({ registered: customer.length > 0 })
  } catch (err) {
    throw err
  }
}

app.get('/products', retrieveProducts)
app.get('/products/:id', retrieveProdcut)

app.post('/checkout/prepare', prepareCheckout)
app.post('/checkout/process', processCheckout)
app.patch('/checkout/update', updateCheckout)

app.get('/paypal-account-check/:id', uniquePayPalAccountCheck)

export { app as StorefrontController }