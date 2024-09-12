module.exports = function rollupBuildString() {
    return {
        name: 'rollup-plugin-build-string',
        transform(code, id) {
            console.log(id);
        }
    }
}