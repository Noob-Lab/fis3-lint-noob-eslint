/**
 * Created by mewtwo on 2017/3/13.
 */
var _ = require('lodash')
var formatter = require('eslint-friendly-formatter')
var standard = require('eslint-config-standard')
var config = require('./config.json')
var cheerio = require('cheerio')
var fs = require('fs')

module.exports = function (content, file, conf) {

    // 合并standard的rules和plugins
    _.merge(config.plugins, standard.plugins)
    _.merge(config.rules, standard.rules)

    // 合并传入参数
    _.mergeWith(config, conf, function (objValue, srcValue) {

        if (_.isArray(objValue)) { // 对数组单独处理，合并到数组后面

            return _.uniq(objValue.concat(srcValue))

        }
        
    })

    // 调用eslint node api
    var CLIEngine = require("eslint").CLIEngine

    // 实例化并传入配置信息
    var cli = new CLIEngine(config)

    // 返回eslint检测结果
    var report = cli.executeOnText(content)

    // 判断是否有错误信息
    if (report.errorCount || report.warningCount) {
        // 格式化错误信息
        var output = formatter(report.results)

        // 读取belss字符
        fs.readFile(__dirname+'/bless.txt', {flag: 'r', encoding: 'utf8'}, function (err, bless) {

            if(err) {

                console.error(err)
                return;

            }else{
                 // 读取 fis 服务器缓存目录下的index.html
                fs.readFile(fis.project.getTempRoot() + '/www/index.html', {encoding: 'utf8'},function(err,dataHtml){

                    // 把读取到的index.html内容传给cheerio
                    var $ = cheerio.load(dataHtml)
                    // 设置body宽度为100%，防止响应式修改宽度
                    $('body').css({'width':'100%'})
                    // 在dom中输出提示
                    $('body').prepend('<pre id="blessError" style="background-color: #000;color:#FFFF66;margin: 0 auto;width: 7.5rem;overflow: hidden">'+bless+'</pre>')

                    // 将拼接好的html重新写入index.html
                    fs.writeFile(fis.project.getTempRoot() + '/www/index.html', $.html(), {flag: 'w'}, function (err) {

                        if(err) {

                            console.error(err)

                        } else {

                        }
                    })

                })

            }

        })

        // 在控制台展示错误信息
        fis.log.info("----------------------------------------     "+file.id+"     ----------------------------------------\n\n\n"+output)

        return

    // 判断没有错误
    }else{

        // 读取 fis 服务器缓存目录下的index.html
        fs.readFile(fis.project.getTempRoot() + '/www/index.html', {encoding: 'utf8'},function(err,dataHtml){

            // 把读取到的index.html内容传给cheerio
            var $ = cheerio.load(dataHtml)

            // 判断页面中是否有id为blessError的元素
            if($('#blessError').length > 0){

                // 删除在错误的时候添加的样式
                $('body').removeAttr('style')
                // 删除在错误的时候添加的dom
                $('#blessError').remove()

                // 将拼接好的html重新写入index.html
                fs.writeFile(fis.project.getTempRoot() + '/www/index.html', $.html(), {flag: 'w'}, function (err) {

                    if(err) {
                        console.error(err)
                    } else {

                    }

                })

            }

        })

    }

}
