const sales = document.getElementById('sales');
const finalChange = document.getElementById('final-change');
const cardMachine = document.getElementById('card-machine');
const delivery = document.getElementById('delivery');
const expense = document.getElementById('expense');
const signedBill = document.getElementById('signed-bill');
const voucher = document.getElementById('voucher');
const initialChange = document.getElementById('initial-change');
const deductionRate = document.getElementById('deduction-rate');
const subtotalDisplay = document.getElementById('subtotal');
const deductionDisplay = document.getElementById('deduction');
const totalDisplay = document.getElementById('total');
const differenceDisplay = document.getElementById('difference');
const resetButton = document.getElementById('reset');

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

const clearAll = () => {
  sales.value = '';
  finalChange.value = '';
  cardMachine.value = '';
  delivery.value = '';
  expense.value = '';
  signedBill.value = '';
  voucher.value = '';
  initialChange.value = '';
  deductionRate.value = '';
  handleCalculation();
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

const calculate = (s, fc, cm, d, e, sb, v, ic, dr) => {
  const subtotal = s + sb + v;
  const deductionAmount = subtotal * (dr / 100);
  const cashSales = subtotal - cm - d - e;
  const expectedCash = cashSales + ic - deductionAmount;
  const difference = fc - expectedCash;
  return { subtotal, deductionAmount, total: expectedCash, difference };
};

const handleCalculation = () => {
  const sanitizeAndParse = (input) => {
    const sanitized = sanitizeInput(input.value);
    input.value = sanitized;
    return parseCurrency(sanitized);
  };
  const s = sanitizeAndParse(sales);
  const fc = sanitizeAndParse(finalChange);
  const cm = sanitizeAndParse(cardMachine);
  const d = sanitizeAndParse(delivery);
  const e = sanitizeAndParse(expense);
  const sb = sanitizeAndParse(signedBill);
  const v = sanitizeAndParse(voucher);
  const ic = sanitizeAndParse(initialChange);
  const dr = sanitizeAndParse(deductionRate);
  const result = calculate(s, fc, cm, d, e, sb, v, ic, dr);
  updateDisplay(result);
};

const setupEventListeners = () => {
  const inputs = document.querySelectorAll('#calculator input');
  inputs.forEach(input => { input.addEventListener('input', handleCalculation) });
  resetButton.addEventListener('click', clearAll);
};

const init = () => {
  setupEventListeners();
  handleCalculation();
};

document.addEventListener('DOMContentLoaded', init);
