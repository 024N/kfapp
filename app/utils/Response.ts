import {Constant} from './Constant';
import {log} from './Logger';

export async function sendSuccess(response: any, data: any): Promise<void> {
  response.status(Constant.STATUS_OK);
  response = setHeader(response);
  response.json(data);
  response.end();
}

export async function sendFailed(response: any, message: any): Promise<void> {
  if (!response.headersSent) {
    log.warn(
      `Fail occurred In sendFailed # [ErrorName]: Fail # [ErrorMessage]: ${message}​​​​​​`
    );
    response.status(Constant.STATUS_INTERNAL_SERVER_ERROR);
    response = setHeader(response);
    response.json({fail: message});
    response.end();
  }
}

export async function sendError(
  response: any,
  responseMessage: any,
  statusCode: any
): Promise<void> {
  response.status(statusCode);
  response = setHeader(response);
  response.json({error: responseMessage});
  response.end();
}

export async function invalidUrlError(response: any): Promise<void> {
  response.status(Constant.STATUS_NOT_FOUND);
  response = setHeader(response);
  response.json({error: 'invalidUrlException'});
  response.end();
}

function setHeader(response: any) {
  response.setHeader('Content-Type', Constant.APPLICATION_JSON);
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Headers', '*');
  response.setHeader(
    'Access-Control-Allow-Methods',
    'OPTION, GET, PUT, POST, DELETE'
  );
  return response;
}
