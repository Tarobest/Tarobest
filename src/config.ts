import { Answers } from "./types/cli"
import { resolvePlatForm } from "./utils/resolvePlatForm"


export interface Config {
    platform: "macOS" | "Windows" | "Linux" | "other",
    answers: Answers
    root: string
}

export const genarateConfig = ({
answers,root
}: {
    answers: Answers,
    root: string
}) => {
    return {
        platform: resolvePlatForm(),
        answers: answers,
        root: root
    } as Config
}