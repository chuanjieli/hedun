const path = require('path')
module.exports = {
    dev: {
        proxyTable: {
            '/api': {
                target: 'http://106.13.41.122:8000/hedunwaf/', //设置你调用的接口域名和端口号 别忘了加http
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/' //这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
                }
            }
        }
    }
}