import express from 'express';
import * as dsb from 'dsb-middleware';


const app = express();
const port = 3000;

app.use(dsb.dsbHeaders);

app.get('/', (req, res, next) => {
    console.log(`Received request on ${port}`);
    res.send();
});


app.listen(port)