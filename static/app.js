var socket = io.connect('http://' + document.domain + ':' + location.port + '/app');

socket.on('check_connection', function(msg) {
    console.log(msg);
});

socket.on('graph_data', function(msg) {
    line_chart.tick(msg);
});


setInterval(function() {
    socket.emit('message');
}, 1000);



var line_chart = new LineChart().selector('#line_chart');
line_chart.init();



