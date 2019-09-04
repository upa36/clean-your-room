function formatPrice(price) {
  return parseInt(price * 100) / 100
}

function calculateEmployerContribution(employerContribution, price) {
  if (employerContribution.mode === 'dollar') {
    return employerContribution.contribution
  } else {
    var dollarsOff = price * (employerContribution.contribution / 100)
    return dollarsOff
  }
}

function calculateVolLifePrice(cost, coverageLevels) {
  var price = 0

  for (var i = 0; i < coverageLevels.length; i++) {
    var coverageAmount = coverageLevels[i].coverage
    price += (coverageAmount / cost.costDivisor) * cost.price
  }

  return price
}

function calculateDisabilityPrice(coveragePercentage, cost, salary) {
  var salaryPercentage = coveragePercentage / 100
  return ((salary * salaryPercentage) / cost.costDivisor) * cost.price
}

module.exports.calculateProductPrice = function (product, employee, coverageLevels) {
  var price = 0

  switch (product.type) {
    case 'volLife':
      price = calculateVolLifePrice(product.cost, coverageLevels)
      price = price - calculateEmployerContribution(product.employerContribution, price)
      return formatPrice(price)
    case 'ltd':
      price = calculateDisabilityPrice(product.coveragePercentage, product.cost, employee.salary)
      price = price - calculateEmployerContribution(product.employerContribution, price)
      return formatPrice(price)
    default:
      return 0
  }
}
