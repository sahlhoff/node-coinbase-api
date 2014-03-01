##Coinbase

Coinbase's api [details here](https://coinbase.com/api/doc)

## Installation

```bash
$ npm install ballin-coinbase-api
```

## Usage

### Account

##### GET /api/v1/account/balance
Get the user's account balance in BTC.

##### GET /api/v1/account/receive_address
Get the user's current bitcoin receive address.

##### GET /api/v1/account/generate_receive_address
Generates a new bitcoin receive address for the user.

### Buttons

##### POST /api/v1/buttons
Create a new payment button, page, or iFrame.

### Buys

##### POST /api/v1/buys
Purchase bitcoin by debiting your U.S. bank account.

### Contacts

##### GET /api/v1/contacts
List emails the user has previously used for autocompletion.

### Currencies

##### GET /api/v1/currencies
Show currencies supported by Coinbase.

##### GET /api/v1/currencies/exchange_rates
Show exchange rates between BTC and other currencies.

### Orders

##### GET /api/v1/orders
List merchant orders received.

##### GET /api/v1/orders/:id
Show an individual merchant order.

### Prices

##### GET /api/v1/prices/buy
Get the total buy price for some bitcoin amount.

##### GET /api/v1/prices/spot_rate
Get the spot price of bitcoin.

##### GET /api/v1/prices/sell
Get the total sell price for some bitcoin amount.

### Transactions

##### GET /api/v1/transactions
List a user's recent transactions.

##### GET /api/v1/transactions/:id
Show details for an individual transaction.

##### POST /api/v1/transactions/send_money
Send bitcoins to an email address or bitcoin address.

##### POST /api/v1/transactions/request_money
Send an invoice/money request to an email address.

##### PUT /api/v1/transactions/:id/resend_request
Resend emails for a money request.

##### DELETE /api/v1/transactions/:id/cancel_request
Cancel a money request.

### Transfers

##### GET /api/v1/transfers
List a user's recent buys and sells.

### Users

##### GET /api/v1/users
Show current user with account settings.

