$(document).ready(function() {
  var rateInUSD;
  var currency = 'USD';
  var ratings = [
    btc = {},
    eth = {},
    ltc = {}
  ]
  getRates($('input[type=radio]').val());
  RenderTitle(currency);

  $('input[type=radio]').click(function() {
    var value = $(this).val();
    setTimeout(function() {
      getRates(value);
      RenderTitle(value);
      currency = value;
    }, 200)
  })

  function getRates(currency) {
    $.ajax({
      type: 'GET',
      url: 'https://api.coinmarketcap.com/v1/ticker/?convert='+currency+'&limit=4',
      dataType: 'json',
      mode: 'no-cors',
      success: function(recive) {
        whenSuccess(recive)
      },
      error: function(error) {
        whenError(error)
      }
    })
  }

  function fix(param){
    param = parseFloat(param);
    return param.toFixed(3);
  }

  function assignChanges(changes){
    var changesOutput = $('.changeOutput');
    for(i=0; i<changes.length; i++){
      changesOutput[i].innerHTML = changes[i]+"%";
      changes[i] = parseFloat(changes[i]);
      if(changes[i]<0){
        changesOutput[i].parentNode.className = "chip red darken-4 white-text"
      }else{
        changesOutput[i].parentNode.className = "chip  green darken-3 white-text"
      }
    }
  }
  function whenSuccess(recive) {
    var fetchCurrency = "price_"+currency.toLowerCase();
    btc.rate = fix(recive[0][fetchCurrency]);
    eth.rate = fix(recive[1][fetchCurrency]);
    ltc.rate = fix(recive[3][fetchCurrency]);
    console.log(btc.rate, eth.rate);
    var outputs = $('.rateOutput');
    outputs[0].innerHTML = btc.rate;
    outputs[1].innerHTML = eth.rate;
    outputs[2].innerHTML = ltc.rate;
    var changes = [
      recive[0].percent_change_1h,
      recive[0].percent_change_24h,
      recive[1].percent_change_1h,
      recive[1].percent_change_24h,
      recive[3].percent_change_1h,
      recive[3].percent_change_24h
    ];
    assignChanges(changes);
  }
  function whenError(error) {
    console.log(error);
  }
  function RenderTitle(currnecy) {
    $('.titleID').html(currnecy);
  }

});

//https://blockchain.info/pl/ticker
//http://api.fixer.io/latest?base=USD
