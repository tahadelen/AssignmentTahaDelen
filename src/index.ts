import mongoose from 'mongoose';

import { app } from './app';

const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/getir-case-study?retryWrites=true', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('Connected to Mongodb!');
    } catch(err) {
        console.log(err);
    }

    app.listen(3000, () => {
        console.log('Listinning on port 3000.');
    });
}

start();