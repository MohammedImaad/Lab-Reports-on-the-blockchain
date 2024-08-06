var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const PORT = process.env.PORT || 3001;
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
require('@alch/alchemy-web3')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
//const { createAlchemyWeb3 } = require('@alch/alchemy-web3');
const web3 = createAlchemyWeb3('https://eth-sepolia.g.alchemy.com/v2/WrQTrj5qxuyEj4X7OpssQ8yeroucTQgi');
const contractABI =[
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "patient",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "bloodSugarLevel",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "bloodGroup",
				"type": "string"
			}
		],
		"name": "MedicalRecordAdded",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_bloodSugarLevel",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_bloodGroup",
				"type": "string"
			}
		],
		"name": "addOrUpdateMedicalRecord",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllMedicalRecords",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			},
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			},
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			},
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_patient",
				"type": "address"
			}
		],
		"name": "getMedicalRecord",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "medicalRecords",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "bloodSugarLevel",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "bloodGroup",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
const contractAddress = '0xff4a11cd5d9de1635fc0ed50ef746a3cd4c80df0'; 
//addresses
//0x84CB56A7F16D4d2D5070C8F8B08BC98FB241B1f4
const privateKey = '3b7d36ddd551d4e17a89fd8f48818a494371dcd3a12972e322ea9378a1e62150';
const account = web3.eth.accounts.privateKeyToAccount(privateKey);
web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount = account.address;
const contract = new web3.eth.Contract(contractABI, contractAddress);
async function addOrUpdateMedicalRecord(name, bloodSugarLevel, bloodGroup) {
  try {
      const accounts = await web3.eth.getAccounts();
      const result = await contract.methods.addOrUpdateMedicalRecord(name, bloodSugarLevel, bloodGroup).send({ from: accounts[0] });
      console.log('Medical record added/updated:', result);
  } catch (error) {
      console.error('Error adding/updating medical record:', error);
  }
}
async function getAllMedicalRecords() {
  try {
      const result = await contract.methods.getAllMedicalRecords().call();
      console.log('All medical records:', result);
  } catch (error) {
      console.error('Error getting all medical records:', error);
  }
}
async function getMedicalRecord(patientAddress) {
  try {
      const result = await contract.methods.getMedicalRecord(patientAddress).call();
      console.log('Medical record for patient:', result);
  } catch (error) {
      console.error('Error getting medical record:', error);
  }
}
app.get('/getMedicalRecord', async (req, res) => {
  const { patientAddress } = req.query;

  try {
      const result = await contract.methods.getMedicalRecord(patientAddress).call();
      console.log('Medical record for patient:', result);
      res.status(200).json({ success: true, data: result });
  } catch (error) {
      console.error('Error getting medical record:', error);
      res.status(500).json({ success: false, error: error.message });
  }
});
app.use(express.static('public'));
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
//getAllMedicalRecords();
//addOrUpdateMedicalRecord('Shahrukh Khan', 120, 'A+');
//getMedicalRecord('0x84CB56A7F16D4d2D5070C8F8B08BC98FB241B1f4');
