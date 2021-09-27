import socket from 'socket.io-client';

export default class Socket {
    constructor(baseURL){
        this.io = socket(baseURL);

        this.io.on('connect_error', (err) => {
            console.log('socket error', err.message);
        });
    }


onSync(e, callback){
    if(!this.io.connected){
        this.io.connect();
    }

    this.io.on(e, (message) => callback(message));
    return () => this.io.off(e);
}
}