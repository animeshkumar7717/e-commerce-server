const Razorpay = require('razorpay');

const apiKey='rzp_test_qoLhrF7e6t1j4i';
const apiSecret='lP63LdwMQ69E0SBSPypa2ACw';


const razorpay = new Razorpay({
  key_id: apiKey,
  key_secret: apiSecret,
});

module.exports = razorpay;
