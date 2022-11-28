
import express, { Express } from 'express';
import routes from './routes/routes';


const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/signatureDish', routes);



// if url is / go to index.js
app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on port 3000');
});
