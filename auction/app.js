import express from 'express';
import storeRouter from './router/store.js'
import cors from 'cors';
import { config } from './config.js';
import { connectDB } from './database/database.js';
import { initSocket } from './connection/socket.js';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/store', storeRouter);
 
connectDB().then(() => {
    console.log('init!');
    const server = app.listen(config.host.port);
    initSocket(server);
  }).catch(console.error)


