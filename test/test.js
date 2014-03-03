var Coinbase = require('../src/coinbase'),
	should = require('should')

coinbase = new Coinbase();

describe('coinbase.prices.spotRate', function(){
	it('should return amount in USD', function(done){
		coinbase.prices.spotRate(function(err, data){
		    data.should.have.property('amount');
		    data.should.have.property('currency', 'USD');
		    done();
		});
	});
});