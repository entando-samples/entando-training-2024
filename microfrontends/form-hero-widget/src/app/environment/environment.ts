import { Config } from "../models/config.model";

export const mfeConfig: Config = {
    "systemParams": {
        "api": {
            "hero-api": {
                "url": "http://localhost:8081"
            }
        }
    },
    "contextParams": {
        "page_code": "my-page",
        "info_currentLang": "it",
        "systemParam_applicationBaseURL": "https://my-production-url/entando-de-app"
    },
    "params": {
        "city": "Roma"
    }
}