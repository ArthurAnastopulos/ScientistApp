const sensorDistancia = document.getElementById("sensorDistancia");
const sensorTemperatura = document.getElementById("sensorTemperatura");
const sensorLuz = document.getElementById("sensorLuz");
const sensorGas = document.getElementById("sensorGas");

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

//Sensor Distancia Request
function call_1(){
    return new Promise(function(resolve, reject){
        let req = new XMLHttpRequest();
        req.overrideMimeType("application/json");
        req.open('GET', 'http://192.168.15.9:5000/robo/1/sensorDistancia', true);
        req.onload  = function() {
            var jsonResponse = JSON.parse(req.responseText);

            console.log("Distancia: " + jsonResponse)

            var labelsName = [];
            var infoData = [];

            for(var i = 0; i < jsonResponse.length; i++) {
                var obj = jsonResponse[i];

                console.log(obj)        

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

            const lineChart = new Chart(sensorDistancia, {
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
        req.open('GET', 'http://192.168.15.9:5000/robo/1/sensorLuz', true);
        req.onload  = function() {
            var jsonResponse = JSON.parse(req.responseText);

            console.log("Distancia: " + jsonResponse)

            var labelsName = [];
            var infoData = [];

            for(var i = 0; i < jsonResponse.length; i++) {
                var obj = jsonResponse[i];

                console.log(obj)        

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

            const lineChart = new Chart(sensorLuz, {
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
        req.open('GET', 'http://192.168.15.9:5000/robo/1/sensorTemperatura', true);
        req.onload  = function() {
            var jsonResponse = JSON.parse(req.responseText);

            console.log("Distancia: " + jsonResponse)

            var labelsName = [];
            var infoData = [];

            for(var i = 0; i < jsonResponse.length; i++) {
                var obj = jsonResponse[i];

                console.log(obj)        

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

            const lineChart = new Chart(sensorTemperatura, {
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
        req.open('GET', 'http://192.168.15.9:5000/robo/1/sensorGas', true);
        req.onload  = function() {
            var jsonResponse = JSON.parse(req.responseText);

            console.log("Distancia: " + jsonResponse)

            var labelsName = [];
            var infoData = [];

            for(var i = 0; i < jsonResponse.length; i++) {
                var obj = jsonResponse[i];

                console.log(obj)        

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

            const lineChart = new Chart(sensorGas, {
                type: 'line',
                data: data,
            });
        };
        req.send(null);
    });
}

Promise.all([ call_1(), call_2(), call_3(), call_4() ]).then(function(values) {
    // all AJAX requests are successfully finished
    // "values" is array containing AJAX responses of all requests
    console.log(values);
}).catch(function(reason) {
    // one of the AJAX calls failed
    console.log(reason);
});