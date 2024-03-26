export interface Config {
    systemParams: SystemParams;
    // contextParams: ContextParams;
  }
  
//   export interface ContextParams {
//     page_code: string;
//     info_currentLang: string;
//     systemParam_applicationBaseURL: string;
//   };
  
  export interface SystemParams {
    api: Api;
  }
  
  export interface Api {
    'hero-api': HeroApi;
  }
  
  export interface HeroApi {
    url: string;
  }
  