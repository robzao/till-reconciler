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
  let value = rawValue.replace(/[^\d.]/g, '');
  const parts = value.split('.');
  if (parts.length > 2) value = parts[0] + '.' + parts.slice(1).join('');
  if (value.startsWith('-')) value = value.substring(1);
  return value;
};

const parseCurrency = (sanitizedValue) => {
  const numericValue = parseFloat(sanitizedValue);
  return (isNaN(numericValue) || numericValue < 0) ? 0 : numericValue;
};

const calculate = (s, fc, cm, d, e, sb, v, ic, dr) => {
  const subtotal = s + sb + v;
  const deductionAmount = subtotal * (dr / 100);
  const cashSales = subtotal - cm - d - e;
  const expectedCash = cashSales + ic - deductionAmount;
  const difference = fc - expectedCash;
  return { subtotal, deductionAmount, total: expectedCash, difference };
};

const handleInput = (e) => {
  const input = e.target;
  input.value = sanitizeInput(input.value);
  handleCalculation();
};

const handleCalculation = () => {
  const parseCurrentValue = (input) => parseCurrency(input.value);
  const s = parseCurrentValue(sales);
  const fc = parseCurrentValue(finalChange);
  const cm = parseCurrentValue(cardMachine);
  const d = parseCurrentValue(delivery);
  const e = parseCurrentValue(expense);
  const sb = parseCurrentValue(signedBill);
  const v = parseCurrentValue(voucher);
  const ic = parseCurrentValue(initialChange);
  const dr = parseCurrentValue(deductionRate);
  const result = calculate(s, fc, cm, d, e, sb, v, ic, dr);
  updateDisplay(result);
};

const setupEventListeners = () => {
  const inputs = document.querySelectorAll('#calculator input');
  inputs.forEach(input => { input.addEventListener('input', handleInput) });
  resetButton.addEventListener('click', clearAll);
};

const init = () => {
  setupEventListeners();
  handleCalculation();
};

document.addEventListener('DOMContentLoaded', init);
