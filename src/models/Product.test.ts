import Product from './Product'
import { IProductAttrs, IProductCategory } from '../interfaces/IProduct'
import ISOCurrencyCode from '../interfaces/ISOCurrencyCode'
import { test } from 'tap'
import { attemptDatabaseConnection, attemptDatabaseDisconnection } from '../middlewares/db-connector'

test('Product', async (t) => {
  await attemptDatabaseConnection(false)
  const attrs = {
    category: IProductCategory.video,
    description: 'test-product-description',
    promote: true,
    sku: 'test-product-sku',
    baseUnitPrice: 10000,
    currencyCode: ISOCurrencyCode.GBP,
    discountUnitPrice: 1000,
    images: ['test-image-url'],
    url: 'test-url',
    isCollectable: true,
    isDeliverable: true
  } as IProductAttrs

  const product = await Product.build(attrs).save()

  t.ok(product, 'should return product')
  t.equal(product.category, attrs.category, 'should return category')
  t.equal(product.description, attrs.description, 'should return description')
  t.equal(product.promote, attrs.promote, 'should return promote')
  t.equal(product.sku, attrs.sku, 'should return sku')
  t.equal(product.baseUnitPrice, attrs.baseUnitPrice, 'should return baseUnitPrice')
  t.equal(product.currencyCode, attrs.currencyCode, 'should return currencyCode')
  t.equal(product.discountUnitPrice, attrs.discountUnitPrice, 'should return discountUnitPrice')
  t.equal(product.baseUnitPrice - (product.discountUnitPrice ?? 0), 9000, 'should return baseUnitPrice less discountUnitPrice')
  t.same(product.images, attrs.images, 'should return images')
  t.equal(product.url, attrs.url, 'should return url')
  t.equal(product.isCollectable, attrs.isCollectable, 'should return isCollectable')
  t.equal(product.isDeliverable, attrs.isDeliverable, 'should return isDeliverable')
  t.hasProp(product, 'createdAt', 'should return createdAt')
  t.hasProp(product, 'updatedAt', 'should return updatedAt')
  
  await Product.deleteOne({ _id: product._id })
  attemptDatabaseDisconnection(false)
  t.end()
})