import express from 'express';
import {apiPrint} from './middleware/APIPrint';
import {invalidUrlHandler} from './middleware/InvalidUrlHandler';
import {errorHandler} from './middleware/ErrorHandler';
import {authorization} from './middleware/Authorization';
import OutagesController from './controllers/OutagesController';
import SiteInfoController from './controllers/SiteInfoController';
import SiteOutagesController from './controllers/SiteOutagesController';

const app: express.Application = express();
app.use(express.json());
app.use(apiPrint); // Print Which Api Path Called
app.use(authorization); // Api key verify

app.use('/outages', OutagesController);
app.use('/site-info', SiteInfoController);
app.use('/site-outages', SiteOutagesController);
app.use('*', invalidUrlHandler); // Catch Invalid Path and Send Exception

app.use(errorHandler); // Send Exception and Print Error Log

export default app;
