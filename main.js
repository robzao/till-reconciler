const salesInput = document.getElementById('sales');
const finalChangeInput = document.getElementById('final-change');
const cardMachineInput = document.getElementById('card-machine');
const deliveryInput = document.getElementById('delivery');
const expenseInput = document.getElementById('expense');
const signedBillInput = document.getElementById('signed-bill');
const voucherInput = document.getElementById('voucher');
const initialChangeInput = document.getElementById('initial-change');
const deductionRateInput = document.getElementById('deduction-rate');
const subtotalDisplay = document.getElementById('subtotal');
const deductionDisplay = document.getElementById('deduction');
const totalDisplay = document.getElementById('total');
const differenceDisplay = document.getElementById('difference');

const formatCurrency = (value) => `$ ${value.toFixed(2)}`;

const updateDisplay = (result) => {
  subtotalDisplay.textContent = formatCurrency(result.subtotal);
  deductionDisplay.textContent = formatCurrency(result.deductionAmount);
  totalDisplay.textContent = formatCurrency(result.total);
  differenceDisplay.textContent = formatCurrency(result.difference);
  
  differenceDisplay.classList.remove('text-red', 'text-green', 'text-neutral');
  if (result.difference > 0) {
    differenceDisplay.classList.add('text-green');
  } else if (result.difference < 0) {
    differenceDisplay.classList.add('text-red');
  } else {
    differenceDisplay.classList.add('text-neutral');
  }
};

const sanitizeInput = (rawValue) => {
  const value = rawValue.replace(/[^\d.]/g, '');
  const parts = value.split('.');
  return parts.length > 2 ? parts[0] + '.' + parts.slice(1).join('') : value;
};

const parseCurrency = (sanitizedValue) => {
  const numericValue = parseFloat(sanitizedValue);
  return isNaN(numericValue) ? 0 : numericValue;
};

const calculate = (sales, finalChange, cardMachine, delivery, expense, signedBill, voucher, initialChange, deductionRate) => {
  const subtotal = sales + signedBill + voucher;
  
  const deductionAmount = subtotal * (deductionRate / 100); 

  const cashSales = subtotal - cardMachine - delivery - expense;
  
  const expectedCash = cashSales + initialChange - deductionAmount;
  
  const difference = finalChange - expectedCash;

  return { subtotal, deductionAmount, total: expectedCash, difference };
};

const handleCalculation = () => {
  const sanitizeAndParse = (input) => {
    const sanitized = sanitizeInput(input.value);
    input.value = sanitized;
    return parseCurrency(sanitized);
  };
  
  const sales = sanitizeAndParse(salesInput);
  const finalChange = sanitizeAndParse(finalChangeInput);
  const cardMachine = sanitizeAndParse(cardMachineInput);
  const delivery = sanitizeAndParse(deliveryInput);
  const expense = sanitizeAndParse(expenseInput);
  const signedBill = sanitizeAndParse(signedBillInput);
  const voucher = sanitizeAndParse(voucherInput);
  const initialChange = sanitizeAndParse(initialChangeInput);
  const deductionRate = sanitizeAndParse(deductionRateInput);
  
  const result = calculate(sales, finalChange, cardMachine, delivery, expense, signedBill, voucher, initialChange, deductionRate);
  updateDisplay(result);
};

const setupEventListeners = () => {
  const inputs = document.querySelectorAll('#calculator input');
  inputs.forEach(input => {
    input.addEventListener('input', handleCalculation);
  });
};

const init = () => {
  setupEventListeners();
  handleCalculation();
};

document.addEventListener('DOMContentLoaded', init);
