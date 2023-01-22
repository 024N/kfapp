import {OutagesService} from '../app/services/OutagesService';
import {NotExistException} from '../app/utils/CustomError';
import {
  getSiteInfoResponse,
  newOutages,
  outagesList,
  readResponse,
} from './constant';
// import {UndefinedCompany} from '../app/utils/CustomError';

describe('OutagesService Test Suite', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // jest.resetAllMocks();
    // jest.resetModules();
    // jest.restoreAllMocks();
  });

  const outagesService = new OutagesService();

  //######## Test: getOutages() ################
  test('Should return all filtered outages, after it filter(2022-01-01T00:00:00.000Z) outages', async () => {
    // GIVEN
    expect.assertions(2);
    // WHEN
    const readFile: any = jest
      .spyOn(outagesService, 'readFile')
      .mockReturnValue(readResponse);
    const response: any = await outagesService.getOutages();
    // THEN
    expect(response).toEqual(outagesList);
    expect(readFile).toBeCalled();
  });

  //######## Test: getSiteInfo(siteId: string) ################
  test('Should return site info, when correct siteId given', async () => {
    // GIVEN
    expect.assertions(3);
    // WHEN
    const readFile: any = jest
      .spyOn(outagesService, 'readFile')
      .mockReturnValue(readResponse);
    const filter: any = jest.spyOn(outagesService, 'filter');
    const response: any = await outagesService.getSiteInfo('kingfisher2');
    // THEN
    expect(response).toEqual(getSiteInfoResponse);
    expect(readFile).toBeCalled();
    expect(filter).toBeCalled();
  });

  test('Should return not exist exception, when wrong siteId given', async () => {
    // GIVEN
    expect.assertions(2);
    // WHEN
    const readFile: any = jest
      .spyOn(outagesService, 'readFile')
      .mockReturnValue(readResponse);
    const response: any = async () => {
      await outagesService.getSiteInfo('kingfisher3');
    };
    // THEN
    expect(response).rejects.toThrow(
      new NotExistException('Resource that does not exist', 'Outages')
    );
    expect(readFile).toBeCalled();
  });

  //######## Test: saveOutages(siteId: string, body: any) ################
  test('Should return OK(200), when outages saved', async () => {
    // GIVEN
    expect.assertions(3);
    // WHEN
    const readFile: any = jest
      .spyOn(outagesService, 'readFile')
      .mockReturnValue(readResponse);
    const writeFile: any = jest
      .spyOn(outagesService, 'writeFile')
      .mockReturnValue(readResponse);
    const response: any = await outagesService.saveOutages(
      'kingfisher2',
      newOutages
    );
    // THEN
    expect(response).toEqual('It is saved');
    expect(readFile).toBeCalled();
    expect(writeFile).toBeCalled();
  });
});
