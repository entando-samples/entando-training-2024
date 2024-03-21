export interface Config {
    systemParams: {
        api: {
            "hero-api": {
                url: string;
            };
        };
    };
    contextParams: {
        page_code: string;
        info_currentLang: string;
        systemParam_applicationBaseURL: string;
    };
}