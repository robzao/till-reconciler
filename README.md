# Till Reconciler

## What is this project?

The Till Reconciler is a simple tool for **cash register reconciliation**. It automates the calculation of the **Expected Cash** amount that should be in the till and compares it against the **Final Change** amount counted by the staff, determining the exact **Difference** (over/short).

It is designed to be a quick, efficient replacement for manual calculations or complex spreadsheets during shift closing procedures.

---

## How It Works

The calculation flow focuses on verifying the cash balance by isolating non-cash payments and expenses.

### Input Fields

| Field | Restriction | Description |
| :--- | :--- | :--- |
| **Sales ($)** | Number >= 0 | The total expected sales value from the Point of Sale (POS) system. (Baseline Revenue) |
| **Final Change ($)** | Number >= 0 | The physical amount of cash counted and left in the till at the end of the shift. (Actual Count) |
| **Card Machine ($)** | Number >= 0 | The total value processed through credit and debit card terminals (non-cash revenue). |
| **Delivery ($)** | Number >= 0 | The total amount received through external delivery platforms (non-cash revenue). |
| **Expense ($)** | Number >= 0 | Cash paid out of the till for small operational expenses. |
| **Signed Bill ($)** | Number >= 0 | Vouchers or notes signed by management/staff counted as cash equivalent (e.g., house charges). |
| **Voucher ($)** | Number >= 0 | The total value of external payment vouchers or tickets. |
| **Initial Change ($)** | Number >= 0 | The starting cash fund amount when the shift began (the "float"). |
| **Deduction Rate (%)** | Number >= 0 | The **percentage** to be deducted from the Subtotal (e.g., Owner Draw or Service Fee). |

### Calculation Logic

The logic determines the **Expected Cash** to compare with the counted **Final Change**:

| Formula | Description | Simple Notation |
| :--- | :--- | :--- |
| **Subtotal** | The total cash equivalent revenue reported by the POS system. | `Subtotal = Sales + Signed Bill + Voucher` |
| **Deduction Amount** | The currency value deducted based on the Subtotal and the Deduction Rate. | `Deduction Amount = Subtotal * (Deduction Rate / 100)` |
| **Cash Sales** | The theoretical cash revenue after removing non-cash payments (Card/Delivery) and expenses. | `Cash Sales = Subtotal - Card Machine - Delivery - Expense` |
| **Total (Expected Cash)** | The total cash that should be in the till (Expected Cash Sales + Starting Float - Deduction). | `Total = Cash Sales + Initial Change - Deduction Amount` |
| **Difference** | The variance between the physical count and the expected amount. | `Difference = Final Change - Total` |

### Status Indicator

The **Difference** status uses color for immediate clarity (controlled by the JavaScript):

| Color | Meaning |
| :--- | :--- |
| **Green** | The till is **Over** (Final Change > Expected Cash). |
| **Red** | The till is **Short** (Final Change < Expected Cash). |
| **Neutral** | The till is **Even** (Final Change = Expected Cash). |

---

### Formatting Standards

* **Decimal Separator:** Use the **dot (`.`)** for decimal separation (e.g., `150.75`).
* **Currency Display:** The output uses the simple `$ 0.00` format.
