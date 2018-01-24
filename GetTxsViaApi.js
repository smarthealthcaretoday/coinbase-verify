var Client = require('coinbase').Client;

var client = new Client({
	'apiKey': '',
	'apiSecret': ''
});

client.getAccounts({}, function (err, accounts) {
	var ethAcc = accounts.filter(function (it) {
		return it.currency == 'ETH'
	});
	if (ethAcc.length != 1) {
		throw new Error("Expected to find single ETH account")
	}
	ethAcc[0].getTransactions({}, function (err, txs) {
		var toSHCAddress = txs.filter(function (it) {
			return it.to && it.to.address == '0x3D499f8E59d7695F03329a3D9248a16bA593F8a5'
		});
		if (ethAcc.length <= 0) {
			throw new Error("Expected to find at least one TX to SHC address")
		}

		console.log("***********************FOUND TXs to SHC********************************");
		console.log(toSHCAddress.map(function (it) {
			return [it.amount, it.to, it.updated_at, it.description]
		}));
	});
});