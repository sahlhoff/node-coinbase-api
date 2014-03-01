'use strict';

  var request = require('request'),
    util = require('util');

function CoinbaseError (error) {
  Error.captureStackTrace(this, CoinbaseError);
  this.error = error;
}

util.inherits(CoinbaseError, Error);

CoinbaseError.prototype.toString = function toString () {
  return "CoinbaseError: " + this.error;
}

function Coinbase (options) {
  this.baseUrl = 'https://coinbase.com/api/v1/';

  var self = this;

  this.account = {};

  function get (url, callback) {
    request.get(url, function (err, res, data) {
      if (err) { 
        callback(err);
      } else {
        try {
          data = JSON.parse(data);
          if (data.success === false) {
            callback(new CoinbaseError(data.errors || data.error))
          } else {
            callback(null, data);
          }
        } catch (err) {
          callback(err);
        }
      }
    });
  }

  function post (url, param, callback) {
    request.post({
        headers: { 
          'content-type': 'application/json', 'Accept': 'text/plain'
        },
        url: url,
        body: JSON.stringify(param)
      }, function (err, res, data) {
      if (err) { 
        callback(err);
      } else if (res.statusCode !== 200) {
        callback(new CoinbaseError(res.headers.status));
      } else{
        try {
          data = JSON.parse(data);
          if (data.success === false) {
            callback(new CoinbaseError(data.errors || data.error));
          } else {
            callback(null, data);
          }
        } catch (err) {
          if (data.errors) {
            callback(new CoinbaseError(data.errors));
          } else {
            callback(data);
          }
        }
      }
    });
  }

  function del (url, callback) {
    request.del(url, function (err, res, data) {
      if (err) { 
        callback(err);
      } else {
        try {
          data = JSON.parse(data);
          if (data.success === false) {
            callback(new CoinbaseError(data.errors || data.error))
          } else {
            callback(null, data);
          }
        } catch (err) {
          callback(err);
        }
      }
    });
  }

  /* GET /api/v1/account/balance */
  this.account.balance = function (accessToken, callback) {
    var url = self.baseUrl + 'account/balance' + '?access_token=' + accessToken;
  
    console.log('get ' + url);
  
    get(url, callback);
  };

  /* GET /api/v1/account/receive_address */
  this.account.receiveAddress = function (accessToken, callback) {
    var url = self.baseUrl + 'account/receive_address' + '?access_token=' + accessToken;
    
    console.log('get ' + url);
    
    get(url, callback);
  };

  /* GET /api/v1/account/generate_receive_address */
  this.account.generateReceiveAddress = function (accessToken, callbackUrl, callback) {
    if (typeof callbackUrl === 'function') {
      callback = callbackUrl;
      callbackUrl = null;
    }
    
    var url = self.baseUrl + 'account/generate_receive_address' + '?access_token=' + accessToken;
    
    if (callbackUrl) options.address = { callback_url: callbackUrl };
    
    console.log('post ' + url + ' with options ' + util.inspect(options));
    
    post(url, options, callback);
  };


  this.buttons = {};
  /* POST https://coinbase.com/api/v1/buttons */
  this.buttons.create = function (accessToken, param, callback) {
    var url = self.baseUrl + 'buttons' + '?access_token=' + accessToken;
    
    console.log('post ' + url);
    
    post(url, param, function (err, data) {
      if (err) {
        callback(err);
      } else {
        callback(null, data);
      }
    });
  };

  /* POST https://coinbase.com/api/v1/buys */
  this.buy = function (accessToken, param, callback) {

    var url = self.baseUrl + 'buttons' + '?access_token=' + accessToken;
    
    console.log('post ' + url);
    
    post(url, param, callback);
  };

  /* GET /api/v1/contacts */
  this.contacts = function (accessToken, callback) {
    var url = self.baseUrl + 'contacts' + '?access_token=' + accessToken;
    
    console.log('get ' + url);
    
    get(url, callback);
  };

  this.currencies = {};

  /* GET /api/v1/currencies */
  this.currencies.list = function (accessToken, callback) {
    var url = self.baseUrl + 'currencies' + '?access_token=' + accessToken;
    
    console.log('get ' + url);
    
    get(url, callback);
  };

  /* GET /api/v1/currencies/exchange_rates */
  this.currencies.exchangeRates = function (callback) {
    var url = self.baseUrl + 'currencies/exchange_rates';
    
    console.log('get ' + url);
    
    get(url, callback);
  };

  this.orders = {};

  /* GET /api/v1/orders */
  this.orders.list = function (accessToken, callback) {
    var url = self.baseUrl + 'orders' + '?access_token=' + accessToken;
    
    console.log('get ' + url);
    
    get(url, callback);
  }

  /* GET /api/v1/orders/:id */
  this.orders.get = function (accessToken, id, callback) {
    var url = self.baseUrl + 'orders/' + id + '?access_token=' + accessToken;
    
    console.log('get ' + url);
    
    get(url, callback);
  }

  this.prices = {};

  /* GET /api/v1/prices/buy */
  this.prices.buy = function (accessToken, options, callback) {
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }
    
    var url = self.baseUrl + 'prices/buy' + '?access_token=' + accessToken;
    if (options.qty) url = url + '&qty=' + options.qty;
    if (options.currency) url = url + '&currency=' + options.currency;
    
    console.log('get ' + url);
    
    get(url, callback);
  };

  /* GET /api/v1/prices/spot_rate */
  this.prices.spot_rate = function(callback) {
    var url = self.baseUrl + 'prices/spot_rate';

    console.log('get ' + url);

    get(url, callback);
  }

  /* GET /api/v1/prices/sell */
  this.prices.sell = function (accessToken, options, callback) {
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }
    
    var url = self.baseUrl + 'prices/sell' + '?access_token=' + accessToken;
    if (options.qty) url = url + '&qty=' + options.qty;
    if (options.currency) url = url + '&currency=' + options.currency;

    console.log('get ' + url);
    
    get(url, callback);
  };

  this.transactions = {};
  /* GET /api/v1/transactions */
  this.transactions.list = function (accessToken, page, callback) {
    if (typeof page === 'function') {
      callback = page;
      page = 1;
    }
    
    var url = self.baseUrl + 'transactions' + '?access_token=' + accessToken + '&page=' + page;
    
    console.log('get ' + url);
    
    get(url, callback);
  };

  /* GET /api/v1/transactions/:id */
  this.transactions.get = function (accessToken, id, callback) {
    var url = self.baseUrl + 'transactions/' + id + '?access_token=' + accessToken;
    
    console.log('get ' + url);
    
    get(url, callback);
  };

  // POST /api/v1/transactions/send_money
  this.transactions.sendMoney = function(accessToken, transaction, callback){
    var url = self.baseUrl + 'transactions/send_money' + '?access_token=' + accessToken;
    var body = {};
    body.transaction = transaction;
    console.log('post' + url);

    post(url, body, callback);
  }

  // POST /api/v1/transactions/request_money
  this.transactions.requestMoney = function(accessToken, transaction, callback){
    var url = self.baseUrl + 'transactions/request_money' + '?access_token=' + accessToken;

    console.log('post' + url);

    post(url, transaction, callback);
  }

  // PUT /api/v1/transactions/:id/resend_request
  this.transactions.resendRequest = function(accessToken, id, callback){
    var url = self.baseUrl + 'transactions/' + id + '/resend_request'  + '?access_token=' + accessToken;
    var param = {}

    console.log('put' + url);

    post(url, param, callback);
  }

  // DELETE /api/v1/transactions/:id/cancel_request
  this.transactions.cancelRequest = function(accessToken, id, callback){
    var url = self.baseUrl + 'transactions/' + id + '/cancel_request' + '?access_token=' + accessToken;

    console.log('delete', url);

    del(url, callback);
  }

  // PUT /api/v1/transactions/:id/complete_request
  this.transactions.completeRequest = function(accessToken, id, callback){
    var url = self.baseUrl + 'transactions/' + id + '/complete_request' + '?access_token=' + accessToken;
    var param = {};

    console.log('put', url);

    post(url, param, callback);
  }


  this.transfers = {};

  /* GET /api/v1/transfers */
  this.transfers.list = function (accessToken, callback) {
    var url = self.baseUrl + 'transfers' + '?access_token=' + accessToken;
    
    console.log('get ' + url);
    
    get(url, callback);
  }

  this.users = {};

  /* GET /api/v1/users */
  this.users.account = function(accessToken, callback) {
    var url = self.baseUrl + 'users' + '?access_token=' + accessToken;

    console.log('get ' + url);

    get(url, callback);
  }

}

module.exports = Coinbase;