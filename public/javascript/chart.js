const sensorDistancia = document.getElementById("sensorDistancia");
const sensorTemperatura = document.getElementById("sensorTemperatura");
const sensorLuz = document.getElementById("sensorLuz");
const sensorGas = document.getElementById("sensorGas");
const sensorFumaca = document.getElementById("sensorFumaca");

Chart.defaults.font.family = "Roboto";
Chart.defaults.font.size = 22;
Chart.defaults.color = "#F5F5F5";

let plugin = {
    id: 'custom_canvas_background_color',
    beforeDraw: (chart) => {
        const ctx = chart.canvas.getContext('2d');
        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = '#F5F5F5';
        ctx.fillRect(0, 0, chart.width, chart.height);
        ctx.restore();
    }
}

var checked_robot = '';
var local = localStorage.getItem("current_robot");
if(local === undefined || local === null || local === ''){
    checked_robot = document.querySelector('input[name="robots"]:checked').value;
    localStorage.setItem("current_robot", checked_robot);
} else {
    checked_robot = localStorage.getItem("current_robot");
    var checkedBtn = document.getElementById('radio-robo-' + checked_robot);
    checkedBtn.checked = true;
}

var luzChart = null;
var gasChart = null;
var temperaturaChart = null;
var fumacaChart = null;
var distanciaChart = null;

//Sensor Distancia Request
function call_1(){
    return new Promise(function(resolve, reject){
        let req = new XMLHttpRequest();
        req.overrideMimeType("application/json");
        req.open('GET', 'http://192.168.15.9:5000/robo/'+ checked_robot +'/sensorDistancia', true);
        req.onload  = function() {
            var jsonResponse = JSON.parse(req.responseText);

            var labelsName = [];
            var infoData = [];

            for(var i = 0; i < jsonResponse.length; i++) {
                var obj = jsonResponse[i];     

                labelsName.push(obj['Data e Hora']);
                infoData.push(obj['Informacao do Sensor']);
            }



            let data = {
                labels: labelsName,
                datasets: [{
                    label: "Sensor de Distancia",
                    data: infoData,
                    cubicInterpolationMode: 'monotone',
                    fill: false,
                    fontColor: '#F5F5F5',
                    borderColor: '#E64A19',
                    backgroundColor: 'transparent',
                    borderDash: [20, 10, 60, 10],
                    pointBorderColor: '#E64A19',
                    pointBackgroundColor: '#FFA726',
                    pointRadius: 5,
                    pointHoverRadius: 10,
                    pointHitRadius: 30,
                    pointBorderWidth: 4,
                    pointStyle: 'rectRounded'
                }]
            };

            distanciaChart = new Chart(sensorDistancia, {
                type: 'line',
                data: data,
            });
        };
        req.send(null);
    });
}

//SensorGas
function call_2(){
    return new Promise(function(resolve, reject){
        let req = new XMLHttpRequest();
        req.overrideMimeType("application/json");
        req.open('GET', 'http://192.168.15.9:5000/robo/'+ checked_robot +'/sensorLuz', true);
        req.onload  = function() {
            var jsonResponse = JSON.parse(req.responseText);

            var labelsName = [];
            var infoData = [];

            for(var i = 0; i < jsonResponse.length; i++) {
                var obj = jsonResponse[i];       

                labelsName.push(obj['Data e Hora']);
                infoData.push(obj['Informacao do Sensor']);
            }



            let data = {
                labels: labelsName,
                datasets: [{
                    label: "Sensor de Luz",
                    data: infoData,
                    cubicInterpolationMode: 'monotone',
                    fill: false,
                    fontColor: '#F5F5F5',
                    borderColor: '#E64A19',
                    backgroundColor: 'transparent',
                    borderDash: [20, 10, 60, 10],
                    pointBorderColor: '#E64A19',
                    pointBackgroundColor: '#FFA726',
                    pointRadius: 5,
                    pointHoverRadius: 10,
                    pointHitRadius: 30,
                    pointBorderWidth: 4,
                    pointStyle: 'rectRounded'
                }]
            };

            luzChart = new Chart(sensorLuz, {
                type: 'line',
                data: data,
            });
        };
        req.send(null);
    });
}


//SensorLuz
function call_3(){
    return new Promise(function(resolve, reject){
        let req = new XMLHttpRequest();
        req.overrideMimeType("application/json");
        req.open('GET', 'http://192.168.15.9:5000/robo/'+ checked_robot +'/sensorTemperatura', true);
        req.onload  = function() {
            var jsonResponse = JSON.parse(req.responseText);

            var labelsName = [];
            var infoData = [];

            for(var i = 0; i < jsonResponse.length; i++) {
                var obj = jsonResponse[i];

                labelsName.push(obj['Data e Hora']);
                infoData.push(obj['Informacao do Sensor']);
            }



            let data = {
                labels: labelsName,
                datasets: [{
                    label: "Sensor de Temperatura",
                    data: infoData,
                    cubicInterpolationMode: 'monotone',
                    fill: false,
                    fontColor: '#F5F5F5',
                    borderColor: '#E64A19',
                    backgroundColor: 'transparent',
                    borderDash: [20, 10, 60, 10],
                    pointBorderColor: '#E64A19',
                    pointBackgroundColor: '#FFA726',
                    pointRadius: 5,
                    pointHoverRadius: 10,
                    pointHitRadius: 30,
                    pointBorderWidth: 4,
                    pointStyle: 'rectRounded'
                }]
            };

            temperaturaChart = new Chart(sensorTemperatura, {
                type: 'line',
                data: data,
            });
        };
        req.send(null);
    });
}

//SensorTemperatura
function call_4(){
    return new Promise(function(resolve, reject){
        let req = new XMLHttpRequest();
        req.overrideMimeType("application/json");
        req.open('GET', 'http://192.168.15.9:5000/robo/'+ checked_robot +'/sensorGas', true);
        req.onload  = function() {
            var jsonResponse = JSON.parse(req.responseText);

            var labelsName = [];
            var infoData = [];

            for(var i = 0; i < jsonResponse.length; i++) {
                var obj = jsonResponse[i];
                labelsName.push(obj['Data e Hora']);
                infoData.push(obj['Informacao do Sensor']);
            }



            let data = {
                labels: labelsName,
                datasets: [{
                    label: "Sensor de Gas",
                    data: infoData,
                    cubicInterpolationMode: 'monotone',
                    fill: false,
                    fontColor: '#F5F5F5',
                    borderColor: '#E64A19',
                    backgroundColor: 'transparent',
                    borderDash: [20, 10, 60, 10],
                    pointBorderColor: '#E64A19',
                    pointBackgroundColor: '#FFA726',
                    pointRadius: 5,
                    pointHoverRadius: 10,
                    pointHitRadius: 30,
                    pointBorderWidth: 4,
                    pointStyle: 'rectRounded'
                }]
            };

            sensorChart = new Chart(sensorGas, {
                type: 'line',
                data: data,
            });
        };
        req.send(null);
    });
}

//SensorFumaca
function call_5(){
    return new Promise(function(resolve, reject){
        let req = new XMLHttpRequest();
        req.overrideMimeType("application/json");
        req.open('GET', 'http://192.168.15.9:5000/robo/'+ checked_robot +'/sensorFumaca', true);
        req.onload  = function() {
            var jsonResponse = JSON.parse(req.responseText);

            var labelsName = [];
            var infoData = [];

            for(var i = 0; i < jsonResponse.length; i++) {
                var obj = jsonResponse[i];
                labelsName.push(obj['Data e Hora']);
                infoData.push(obj['Informacao do Sensor']);
            }



            let data = {
                labels: labelsName,
                datasets: [{
                    label: "Sensor de Fumaça",
                    data: infoData,
                    cubicInterpolationMode: 'monotone',
                    fill: false,
                    fontColor: '#F5F5F5',
                    borderColor: '#E64A19',
                    backgroundColor: 'transparent',
                    borderDash: [20, 10, 60, 10],
                    pointBorderColor: '#E64A19',
                    pointBackgroundColor: '#FFA726',
                    pointRadius: 5,
                    pointHoverRadius: 10,
                    pointHitRadius: 30,
                    pointBorderWidth: 4,
                    pointStyle: 'rectRounded'
                }]
            };

            fumacaChart = new Chart(sensorFumaca, {
                type: 'line',
                data: data,
            });
        };
        req.send(null);
    });
}

Promise.all([ call_1(), call_2(), call_3(), call_4(), call_5 ]).then(function(values) {
    // all AJAX requests are successfully finished
    // "values" is array containing AJAX responses of all requests
}).catch(function(reason) {
    // one of the AJAX calls failed
    console.log(reason);
});

function handleClick(radio){
    checked_robot = radio.value
    localStorage.setItem("current_robot", checked_robot);
    location.reload();
}