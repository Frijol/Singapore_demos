// Send a message over I2C to accel-mma84 and get one back
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
var registerAddressToRead = 0x0D; // WHO_AM_I
var bytesToRead = 1;

// Read a register
i2c.transfer(new Buffer([registerAddressToRead]), bytesToRead, function (error, dataRecieved) {
  if (error) {
    console.log(error);
  }
  console.log(dataRecieved); // Should be 0x2A
});
