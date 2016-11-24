// Print the orientation of the project
// Pins: SDA, SCL

// Tell Tessel what pins to use
var tessel = require('tessel');
var port = tessel.port.A;

// In I2C, each hardware component
// has a specific "address"
var I2CAddress = 0x1D;

// Set up communication pathway
var i2c = new port.I2C(I2CAddress);

// Wake up the accelerometer
var setActive = function (nextFunction) {
  var CTRL_REG1 = 0x2A;
  i2c.send(new Buffer([CTRL_REG1, 0b00000001]), function () {
    nextFunction();
  });
};

// Define what to read
var registerAddressToRead = 0x05; // OUT_Z
var bytesToRead = 1; // Just the register we need

setActive(function poll () {
  // Every 1 second...
  setInterval(function getZAxis () {
    // Read register
    i2c.transfer(new Buffer([registerAddressToRead]), bytesToRead, function (error, dataReceived) {
      if (error) {
        console.log(error);
      }
      console.log(interpretData(dataReceived));
    });
  }, 1000);
});

var interpretData = function (data) {
  // Since we just want to know whether the
  // device is upside down/right side up
  // we only need the Z axis most sig. bits
  var eightBits = data[0];

  // Is the number negative or positive?
  if (eightBits > 0b01111111) {
    return 'negative acceleration (Tessel upside down)';
  } else {
    return 'positive acceleration (Tessel right side up)';
  }
};
