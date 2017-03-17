/**
 * Created by mewtwo on 2017/3/13.
 */
var _ = require('lodash')
var formatter = require('eslint-friendly-formatter')
var standard = require('eslint-config-standard')
var config = require('./config.json')
var cheerio = require('cheerio')
var fs = require('fs')


/**
 * @description html实体转换为javascript字符串
 * @param {string} str 需要格式化的html字符串
 */
function html2js(str) {
    var htmlArr = str.replace(/\\/g, "\\\\").replace(/\\/g, "\\/").replace(/\'/g, "\\\'").replace(/\"/g, "\\\"").split('\n')
    var len = htmlArr.length
    var outArr = []
    //
    _.forEach(htmlArr, function (value,index) {
        if (value !== "") {
            if (index === len - 1) {
                outArr.push("\"" + value + "\"")
            } else {
                outArr.push("\"" + value + "\\n"+"\"+\n")
            }
        }
    })

    return outArr.join("")
}

module.exports = function (content, file, conf) {

    // 合并standard的rules和plugins
    _.merge(config.plugins, standard.plugins)
    _.merge(config.rules, standard.rules)

    // 合并传入参数
    _.merge(config,conf)

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

            fs.readFile(__dirname+'/bless.txt', {flag: 'r'}, function (err,bless) {
                var jsStr = 'console.error('+ html2js(output) +');\n'
                var idStr = 'console.error("-------------------- '+ file.id +' --------------------");\n'
                var htmlStr = 'var errorDom=document.getElementById("errorDom");if(errorDom){errorDom.innerHTML='+bless+'}else{document.write("<div id=errorDom style=\'background: rgba(0,0,0,0.8);display: flex;position:absolute;top:0;width:100%;height:100%;color:red;font-size: .2rem;justify-content:center;align-items:Center;\'>\"+'+bless+'+\"</div>")};'
                var outStr = htmlStr+idStr+jsStr
                fs.unlink(fis.project.getTempRoot() + '/www/debug-lint.js', function () {

                    fs.writeFile(fis.project.getTempRoot() + '/www/debug-lint.js', outStr, {flag: 'a'}, function (err) {

                        if(err) {

                            console.error(err)

                        } else {

                        }

                    })

                })

            })

        // 在控制台展示错误信息
        fis.log.info("----------------------------------------     "+file.id+"     ----------------------------------------\n\n\n"+output)

        // return

    // 判断没有错误
    }else{

        // 删除html中的错误提示
        var htmlStr = 'var errorDom=document.getElementById("errorDom");if(errorDom){document.getElementsByTagName("body")[0].removeChild(errorDom)};'
        fs.unlink(fis.project.getTempRoot() + '/www/debug-lint.js', function () {

            fs.writeFile(fis.project.getTempRoot() + '/www/debug-lint.js', htmlStr, {flag: 'a'}, function (err) {

                if(err) {

                    console.error(err)

                } else {

                }

            })

        })

    }

}
