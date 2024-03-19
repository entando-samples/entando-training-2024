export interface Config {
  systemParams: SystemParams;
  contextParams: ContextParams;
  params?: any
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
  'hero-api': HeroesMsApi;
}

export interface HeroesMsApi {
  url: string;
}
