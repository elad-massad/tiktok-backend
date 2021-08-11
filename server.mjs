import express from 'express';
import mongoose from 'mongoose';
import data from './data.mjs';
import Videos from './dbModel.mjs';


// app config
const app = express();
const port = process.env.PORT || 9000;


//middlewares
app.use(express.json());
app.use((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*"),
    res.setHeader("Access-Control-Allow-Headers", "*"),
    next();
})
//DB config
const connection_url = 'mongodb+srv://admin:giCGa5wwVBaXaEd@cluster0.cggem.mongodb.net/tiktok?retryWrites=true&w=majority';

mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});
//api endpoint
app.get('/', (req, res) => res.status(200).send('hello world'));

app.get('/v1/posts', (req, res) => res.status(200).send(data));

app.get('/v2/posts', (req, res) => {
    Videos.find((err,data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        } 
    });
});

app.post('/v2/posts', (req, res) => {
    const dbVideos = req.body

    Videos.create(dbVideos, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    });
});

//listen
app.listen(port, () => console.log(`listening on localhost: ${port}`));
