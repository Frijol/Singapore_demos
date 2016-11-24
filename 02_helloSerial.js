// Send the message "Hello, World!" over serial on port A
// Pins: TX, RX

var tessel = require('tessel');
var port = tessel.port.A;

var uart = new port.UART({
  dataBits: 8,
  baudrate: 115200,
  parity: "none",
  stopBits: 1
});

uart.write('Hello, World!');

console.log('wrote to UART');
