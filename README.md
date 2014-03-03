##Coinbase

Coinbase's api [details here](https://coinbase.com/api/doc)

## Installation

```bash
$ npm install ballin-coinbase-api
```

Require coinbase

```
var Coinbase = require('ballin-coinbase-api');

coinbase = new Coinbase();
```

## Usage

### Account

##### GET /api/v1/account/balance
Get the user's account balance in BTC.

```
coinbase.account.balance(accessToken, function(err, balance){
    console.log(balance);
});
```

##### GET /api/v1/account/receive_address
Get the user's current bitcoin receive address.

```
coinbase.account.receiveAddress(accessToken, function(err, address){
    console.log(address); 
});
```

##### GET /api/v1/account/generate_receive_address
Generates a new bitcoin receive address for the user.

```
coinbase.account.generateReceiveAddress(accessToken, function(err, address){
    console.log(address);
});
```

### Buttons

##### POST /api/v1/buttons
Create a new payment button, page, or iFrame.

```
var param = {
    "button": {
        "name": "test",
        "type": "buy_now",
        "price_string": "1.23",
        "price_currency_iso": "USD",
        "custom": "Order123",
        "callback_url": "http://www.example.com/my_custom_button_callback",
        "description": "Sample description",
        "type": "buy_now",
        "style": "custom_large",
        "include_email": true
    }
}

coinbase.buttons.create(accessToken, param, function(err, button){
   console.log(button); 
});
```

### Buys

##### POST /api/v1/buys
Purchase bitcoin by debiting your U.S. bank account.

```
var param = {
    {
        "qty": 1
    }
}

coinbase.buy(accessToken, param, function(err, buy){
    console.log(buy);
});
```

### Contacts

##### GET /api/v1/contacts
List emails the user has previously used for autocompletion.

```
coinbase.contacts(accessToken, function(err, contacts){
    console.log(contacts);
});
```

### Currencies

##### GET /api/v1/currencies
Show currencies supported by Coinbase.

```
coinbase.currencies.list(accessToken, function(err, currencies){
    console.log(currencies);
});
```

##### GET /api/v1/currencies/exchange_rates
Show exchange rates between BTC and other currencies.
```
coinbase.currencies.exchangeRates(function(err, rates){
    console.log(rates);
});
```

### Orders

##### GET /api/v1/orders
List merchant orders received.
```
coinbase.orders.list(accessToken, function(err, orders){
    console.log(orders);
});
```

##### GET /api/v1/orders/:id
Show an individual merchant order.
```
coinbase.orders.get(accessToken, id, function(err, order){
    console.log(order);
});
```

### Prices

##### GET /api/v1/prices/spot_rate
Get the spot price of bitcoin.
```
coinbase.spotRate(function(err, spotRate){
    console.log(spotRate);
});
```

### Transactions

##### GET /api/v1/transactions
List a user's recent transactions.
```
coinbase.transactions.list(accessToken, param, function(err, transactions){
    console.log(transactions);
});
```

##### GET /api/v1/transactions/:id
Show details for an individual transaction.
```
coinbase.transactions.get(accessToken, id, function(err, transaction){
    console.log(transaction);
});
```

##### POST /api/v1/transactions/send_money
Send bitcoins to an email address or bitcoin address.
```
var transaction = {
    "transaction": {
        "to": "chad@sahlhoff.com",
        "amount": "1.234",
        "notes": "Sample transaction for you"
    }
}
coinbase.transactions.sendMoney(accessToken, transaction, function(err, data){
    console.log(data);
});
```

##### POST /api/v1/transactions/request_money
Send an invoice/money request to an email address.
```
var transaction = {
        "transaction": {
        "from": "user1@example.com",
        "amount": "1.234",
        "notes": "Sample transaction for you"
    }
}
coinbase.transactions.requestMoney(accessToken, transaction, function(err, data){
    console.log(data);
});
```

##### PUT /api/v1/transactions/:id/resend_request
Resend emails for a money request.
```
coinbase.transactions.resendRequest(accessToken, id, function(err, data){
    console.log(data);
});
```

##### DELETE /api/v1/transactions/:id/cancel_request
Cancel a money request.
```
coinbase.transactions.cancelRequest(accessToken, id, function(err, data){
    console.log(data);
});
```

### Transfers

##### GET /api/v1/transfers
List a user's recent buys and sells.
```
coinbase.transfers.list(accessToken, function(err, transfers){
    console.log(transfers);
});
```

### Users

##### GET /api/v1/users
Show current user with account settings.
```
coinbase.users.account(accessToken, function(err, account){
    console.log(account);
});
```

