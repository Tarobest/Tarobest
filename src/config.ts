import { resolvePlatForm } from "./utils/resolvePlatForm"


export interface Config {
    platform: "macOS" | "Windows" | "Linux" | "other"
}

export const genarateConfig = () => {
    return {
        platform: resolvePlatForm()
    } as Config
}