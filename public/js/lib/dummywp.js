function DummyWeatherProxy() {

}

DummyWeatherProxy.prototype.getWeather  = function(localidad, callback) {
   dummyResult = {}
   dummyResult.condition = {}
   dummyResult.condition.temp = Math.floor(Math.random()*35);
   dummyResult.forecast = []
   dummyResult.forecast[0] = {}
   dummyResult.forecast[0].text = "Datos inventados: " +  new Date().toLocaleString();
   dummyResult.forecast[0].high = dummyResult.condition.temp + 5;
   dummyResult.forecast[0].low = dummyResult.condition.temp - 5;
   callback(dummyResult);
}