var mocha = require('mocha')
var expect = require('chai').expect
var calculateProductPrice = require('../pricing').calculateProductPrice
var products = require('./products')
var employee = require('./employee').employee
var { describe, it } = mocha

describe('calculateProductPrice', function () {
  it('returns the price for a voluntary life product for a single employee', function () {
    var coverageLevels = [
      { role: 'ee', coverage: 125000 }
    ]
    var price = calculateProductPrice(products.voluntaryLife, employee, coverageLevels)

    expect(price).to.equal(39.37)
  })

  it('returns the price for a voluntary life product for an employee with a spouse', function () {
    var coverageLevels = [
      { role: 'ee', coverage: 200000 },
      { role: 'sp', coverage: 75000 },
    ]
    var price = calculateProductPrice(products.voluntaryLife, employee, coverageLevels)

    expect(price).to.equal(86.62)
  })

  it('returns the price for a disability product for an employee', function () {
    var price = calculateProductPrice(products.longTermDisability, employee, [])

    expect(price).to.equal(22.04)
  })

  it('throws an error on unknown product type', function () {
    var unknownProduct = { type: 'vision' }

    expect(calculateProductPrice(unknownProduct, employee, [])).to.equal(0)
  })
})
