const ignoreBuildFile = require('../../../ignoreBuildFile');
// 将模版文件打包成字符串数组
module.exports = function rollupBuildString() {
    let count = 0;
    const ignoreFile = ignoreBuildFile
	return {
		name: "rollup-plugin-build-string",
		transform(code, id) {
            console.log('打包文件数：', ++count);

			if(id.includes("src/template/") && !ignoreFile.some(item => id.includes(item))) {
                console.log('打包文件：', code.split('\n'));
                
                return {
                    code: `export default ${JSON.stringify(code.split('\n'))}`,
                    map: null // 如果需要sourcemap的话，需要配置
                };
            }
            return null
		}
	};
};
