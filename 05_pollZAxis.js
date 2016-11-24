// Poll the OUT_Z_MSB register of to accel-mma84
// Pins: SDA, SCL

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
var bytesToRead = 1; // Just the register we need

// Every 1 second...
setInterval(function getZAxis () {
  // Read register
  i2c.transfer(new Buffer([registerAddressToRead]), bytesToRead, function (error, dataReceived) {
    if (error) {
      console.log(error);
    }
    console.log(dataReceived);
  });
}, 1000);
