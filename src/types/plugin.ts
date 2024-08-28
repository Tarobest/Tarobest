export interface Plugin {
    name: string;
    beforeBuild?: any;
    afterBuild?: any;
}