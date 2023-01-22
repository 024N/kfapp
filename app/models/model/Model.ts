export default class siteInfo {
  id!: string;
  name!: string;
  devices!: Array<deviceInfo>;
}

class deviceInfo {
  id!: string;
  name!: string;
  begin!: string;
  end!: string;
}
