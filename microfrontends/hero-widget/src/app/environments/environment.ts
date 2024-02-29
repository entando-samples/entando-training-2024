import { IApiClaim } from "../models/api-claim.model";

export const mfeconfig: IApiClaim = {
  systemParams: {
    api: {
      'heroes-ms': {
        url: 'http://localhost:8080',
      },
    },
  },
  contextParams: {
    "page_code": "my-page",
    "info_currentLang": "it",
    "systemParam_applicationBaseURL": "https://my-production-url/entando-de-app"
  }

};
