#! /usr/bin/env node

'use strict';
var fs = require('fs')
var ver = require('../package').version
var path = require('path')

// 获取字符串
var code = path.join(__dirname,'../code.txt')

fs.readFile(code, {flag: 'r', encoding: 'utf8'}, function (err, bless) {

  if(err) {

    console.error(err)
    return

  }else{

    console.log(bless)
    console.log('version--'+ver)

  }

})

