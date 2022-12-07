import mongoose from "mongoose";
import UMClient from '../interfaces/UMClient';
require('dotenv').config();

export default async function (client: UMClient) {
    mongoose.connection.on('connected', () => {
        console.log('Database connected.')
    })

    mongoose.connection.on('error', (error) => {
        console.log(`Database Error: ${error}`)
    })

    mongoose.connection.on('disconnect', () => {
        console.log('Database disconencted.')
    })

    mongoose.Promise = global.Promise;

    await mongoose.connect(process.env.MONGOURI || '', {
        keepAlive: true
    });
}