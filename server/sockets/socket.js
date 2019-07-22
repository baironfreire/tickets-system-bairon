const { io } = require('../server');
const { TicketConrol } = require('../classes/ticket-contol');

const ticketControl = new TicketConrol();

io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => {

       let siguiente = ticketControl.siguiente();
       callback(siguiente);
       console.log(siguiente);
    });

    //emitir un evento estado actual
    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });

  

    client.on('atenderTicket', (data, callback) => {

        if(!data.escritorio){
            return callback({
                err: true,
                message: 'El escritorio es necesario'
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        callback(atenderTicket);
        //actualizar notificar cambios en los utimos 4
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        });
    });
});