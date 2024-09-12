import { Answers } from "./types/cli"
import { resolvePlatForm } from "./utils/resolvePlatForm"


export interface TConfig {
    platform: "macOS" | "Windows" | "Linux" | "other",
    answers: Answers
    root: string
    localTemplate: string[]
}

const localTemplate: string[] = [
    'react'
]

export const genarateConfig = ({
answers,root
}: {
    answers: Answers,
    root: string
}) => {
    return {
        platform: resolvePlatForm(),
        answers: answers,
        root: root,
        localTemplate
    } as TConfig
}