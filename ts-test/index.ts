import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors({
    origin: '*'
}));
app.get('/', (req, res) => {
    res.json({
        name: 'Daniel'
    });
});

app.post('/', (req, res) => {
    const a: { a: number } = req.body;
    a.a = a.a + 1;
    // console.log(a);
    res.json(a);
})

app.listen(3000, () => {
    console.log("Listening port 3000");
});