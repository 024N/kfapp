import * as dotenv from 'dotenv';
import app from './app';

dotenv.config({path: '.env.local'});
const port = process.env.PORT;

app.listen(port, (): void => {
  console.log(`App is listening at http://localhost:${port}`);
});
