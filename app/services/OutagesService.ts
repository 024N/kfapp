import * as dotenv from 'dotenv';
import fs from 'fs-extra';
import siteInfo from '../models/model/Model';
import {NotExistException} from '../utils/CustomError';

dotenv.config({path: '.env.local'});
const filter_date_env = String(process.env.FILTER_DATE);
const filter_date = new Date(filter_date_env);

export class OutagesService {
  public async getOutages(): Promise<any> {
    const outageList: Array<siteInfo> = await this.readFile();
    let deviceInfo: any = [];
    for (const outage of outageList) {
      deviceInfo = deviceInfo.concat(outage.devices);
    }
    const filteredDeviceList: Array<any> = await this.filter(deviceInfo);
    return filteredDeviceList;
  }

  public async getSiteInfo(siteId: string): Promise<any> {
    const outageList: Array<siteInfo> = await this.readFile();
    for (const outage of outageList) {
      if (outage.id === siteId) {
        const filteredDeviceList: Array<any> = await this.filter(
          outage.devices
        );
        outage.devices = filteredDeviceList;
        return outage;
      }
    }
    throw new NotExistException('Resource that does not exist', 'Outages');
  }

  public async saveOutages(siteId: string, body: any): Promise<any> {
    const outageList: Array<siteInfo> = await this.readFile();
    for (const outage of outageList) {
      if (outage.id === siteId) {
        outage.devices = outage.devices.concat(body);
        await this.writeFile(outageList);
        return 'It is saved';
      }
    }
    const newOutage: siteInfo = {
      id: siteId,
      name: siteId,
      devices: body,
    };
    outageList.push(newOutage);
    await this.writeFile(outageList);
    return 'It is saved';
  }

  ///////////////////////////////////////////////////////////////////////
  public async filter(devices: any): Promise<any> {
    try {
      const deviceList: Array<any> = [];
      if (devices) {
        for (const deviceInfo of devices) {
          const begin = new Date(deviceInfo.begin);
          if (begin >= filter_date) {
            deviceList.push(deviceInfo);
          }
        }
      }
      return deviceList;
    } catch (error) {
      console.log('Filter Error', error);
    }
  }

  public async readFile(): Promise<any> {
    try {
      const data = await fs.readFile('./app/db/outage.json', 'utf8');
      const outageList = JSON.parse(data);
      return outageList;
    } catch (error) {
      console.log('Read File Error', error);
    }
  }

  public async writeFile(outageList: Array<siteInfo>) {
    try {
      const outageListString: string = JSON.stringify(outageList);
      const data = await fs.writeFile('./app/db/outage.json', outageListString);
    } catch (error) {
      console.log('Write File Error', error);
    }
  }
}
