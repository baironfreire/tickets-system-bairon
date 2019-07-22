var socket = io();

var searhParams = new URLSearchParams(window.location.search);

if(! searhParams.has('escritorio')){
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searhParams.get('escritorio');
var label = $('small');

$('h1').text('Escritorio' + escritorio);
$('button').on('click', function(){
    socket.emit('atenderTicket', {
        escritorio
    }, function(resp){
        if(resp == 'No hay mas tickets') {
            label.text('No hay mas tickets');
            alert("No hay mas tickets");
            return; 
        }
       label.text('Ticket '+ resp.numero);
    });
});