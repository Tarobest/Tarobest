import path from "path"
import { Answers } from "./types/cli"
import { resolvePlatForm } from "./utils/resolvePlatForm"


export interface TConfig {
    platform: "macOS" | "Windows" | "Linux" | "other",
    answers: Answers
    root: string
    localTemplate: string[]
    templateRoot: string
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
    const templateRoot = path.join(__dirname, "./template", answers.template)
    return {
        platform: resolvePlatForm(),
        answers: answers,
        root: root,
        templateRoot,
        localTemplate
    } as TConfig
}