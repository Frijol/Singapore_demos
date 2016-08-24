// Tell Tessel what pins to use
var tessel = require('tessel');
var port = tessel.port.A;

// In I2C, each hardware component
// has a specific "address"
var I2CAddress = 0x1D;

// Set up communication pathway
var i2c = new port.I2C(I2CAddress);

// Define what to read
var registerAddressToRead = 0x05; // OUT_Z
var bytesToRead = 1; // Get MSB and then LSB

// Read a register
i2c.transfer(new Buffer([registerAddressToRead]), bytesToRead, function (error, dataReceived) {
  if (error) {
    console.log(error);
  }
  console.log(dataReceived);
});
