export const resolveImportPath = (path: string) => {
    if(path.endsWith('.tsx')) {
        return path.replace(/\.tsx$/, 'js')
        // scss, css, less, sass
    } else if(path.endsWith('.css') || path.endsWith('.less') || path.endsWith('.sass') || path.endsWith('.scss')) {
        return path + '.js'
    }
}