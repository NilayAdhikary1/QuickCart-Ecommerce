
import express from 'express';
const port = 5000;

const app = express();

app.get('/', (req, res) => {
    res.send("Hello world! This is my node application!!");
})

app.listen(port, () => {
    console.log(`Server is up and running at port ${port}!!`);
})