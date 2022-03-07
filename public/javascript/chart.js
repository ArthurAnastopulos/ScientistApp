const speedCanvas1 = document.getElementById("sensorDistancia");
const speedCanvas2 = document.getElementById("sensorTemperatura");
const speedCanvas3 = document.getElementById("sensorLuz");
const speedCanvas4 = document.getElementById("sensorGas");

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

let speedData = {
    labels: ["0s", "10s", "20s", "30s", "40s", "50s", "60s"],
    datasets: [{
        label: "Car Speed (mph)",
        data: [0, 59, 75, 20, 20, 55, 40],
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

const lineChart1 = new Chart(speedCanvas1, {
    type: 'line',
    data: speedData,
});

const lineChart2 = new Chart(speedCanvas2, {
    type: 'line',
    data: speedData
});

const lineChart3 = new Chart(speedCanvas3, {
    type: 'line',
    data: speedData
});

const lineChart4 = new Chart(speedCanvas4, {
    type: 'line',
    data: speedData
});