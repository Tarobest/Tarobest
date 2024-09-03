export interface Plugin {
    name: string;
    beforeBuild?: any;
    beforeTemplate?: any;
    afterTemplate?: any;
    afterBuild?: any;
}