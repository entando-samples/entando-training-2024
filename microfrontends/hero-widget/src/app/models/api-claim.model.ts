export interface IApiClaim {
  systemParams: SystemParams;
}

export interface SystemParams {
  api: Api;
}

export interface Api {
  'heroes-ms': HeroesMsApi;
}

export interface HeroesMsApi {
  url: string;
}
