import { print } from "../model/print";
export const resolvePlatForm = () => {
    const osValue = process.platform;
    if (osValue === 'darwin') {
        return 'macOS';
    } else if (osValue === 'win32') {
        return 'Windows';
    } else if (osValue === 'linux') {
        return 'Linux';
    } else {
        print.red.log(`Unknown platform:${osValue}`);
        return 'other'
    }
}

export const isMac = () => {
    return process.platform === 'darwin';
}

export const isWindows = () => {
    return process.platform === 'win32';
}

export const isLinux = () => {
    return process.platform === 'linux';
}

export const resolveLineBreak = (platform: 'macOS' | 'Windows' | 'Linux' | 'other') => {
    if (platform === 'macOS') {
        return '\n';
    } else if (platform === 'Windows') {
        return '\r\n';
    } else if (platform === 'Linux') {
        return '\n';
    } else {
        return '\n';
    }
};