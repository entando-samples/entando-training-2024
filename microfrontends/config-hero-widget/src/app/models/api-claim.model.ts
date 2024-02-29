export interface IApiClaim {
  systemParams: SystemParams;
  contextParams: ContextParams;
}

export interface ContextParams {
  page_code: string;
  info_currentLang: string;
  systemParam_applicationBaseURL: string;
};

export interface SystemParams {
  api: Api;
}

export interface Api {
  'heroes-ms': HeroesMsApi;
}

export interface HeroesMsApi {
  url: string;
}
