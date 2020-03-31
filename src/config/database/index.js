import mongoose from 'mongoose';
import { databaseConfig } from '../index';

export const dbConnect = () => {
    mongoose.connect(
        databaseConfig.url,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        }
    );
    return mongoose.connection;
}