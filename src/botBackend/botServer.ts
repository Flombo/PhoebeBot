import express from 'express';
import { botRouter } from './botRouter';

const app = express();
app.use(botRouter);

app.listen(process.env.PORT, () => console.log('Server listening on port 3000'));