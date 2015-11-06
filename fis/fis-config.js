/**
 * 全局配置
 */

//csssprites
//参考：https://github.com/fex-team/fis-spriter-csssprites
fis.config.set('settings.spriter.csssprites', {
    htmlUseSprite: true, //开启模板内联css处理,默认关闭
    styleReg: /(<style(?:(?=\s)[\s\S]*?["'\s\w\/\-]>|>))([\s\S]*?)(<\/style\s*>|$)/ig,
    margin: 5 //图之间的边距
});

//uglify js
//参考：https://github.com/fex-team/fis-optimizer-uglify-js
fis.config.set('settings.optimizer.uglify-js', {
    mangle: {
        except: 'exports, module, require, define' //不需要混淆的关键字
    },
    compress: {
        drop_console: true //自动删除console
    }
});

fis
    .set('project.ignore', ['node_modules/**', '*.bat', 'fis-conf.js']) // 排除指定目录
    // .hook('cmd')// 开启模块化包装cmd
    //异构less
    .match('*.less', {
        parser: fis.plugin('less'),
        rExt: '.css'
    })
    //开启插件
    //参考：https://github.com/fex-team/fis3-postpackager-loader
    .match('::package', {
        postpackager: fis.plugin('loader') //同名依赖需要用到
    });

/**
 * libs | components | pages 目录
 */

fis
//images --> root/static/images
    .match(/^\/(lib|component|page)s\/(.*\.(png|gif|jpg|jpeg|ico))$/, {
        release: "/static/images/$1-$2"
    })
    //fonts --> root/static/fonts
    .match(/^\/(lib|component|page)s\/(fonts\/.*)$/, {
        release: "/static/$2"
    });

/**
 * libs | components 目录
 */

fis
//js --> root/static/js
    .match(/^\/(libs|components\/.*\.js)$/, {
        release: "/static/js/$1"
    })
    .match(/^\/(libs|components)\/(.*?)\/(\2[^\/]*\.js)$/, {
        release: "/static/js/$1/$3"
    })
    //css|less --> root/static/css
    .match(/^\/(libs|components\/.*\.(css|less))$/, {
        release: "/static/css/$1"
    })
    .match(/^\/(libs|components)\/(.*?)\/(\2[^\/]*\.(css|less))$/, {
        release: "/static/css/$1/$3"
    });

/**
 * page 目录
 */

fis
//js --> root/static/js
    .match(/^\/page\/(.*?)\/(\2[^\/]*\.js)$/, {
        isMod: true,
        release: "/static/js/$2"
    })
    //css|less --> root/static/css
    .match(/^\/page\/(.*?)\/(\2[^\/]*\.(css|less))$/, {
        release: "/static/css/$2"
    })
    //html --> root
    .match(/^\/page\/(.*\.html)$/, {
        useSameNameRequire: true, //开启同名依赖
        useMap: true, //同名依赖需要用到
        preprocessor: fis.plugin('rjy-template'), //自定义插件：动态加载模版
        postprocessor: fis.plugin('rjy-template'), //自定义插件：动态加载模版
        release: '/$1'
    });

/**
 * components 目录
 */

fis
    // .match(/components\/_\/.*/, {
    //     release:false
    // })
    .match(/components\/.*/, {
        isMod: true,
        useSameNameRequire: true //开启同名依赖
    });

/**
 * config 目录
 */

fis
    .match(/config\/.*/, {
        release: false
    });

/**
 * 打包发布阶段
 */
fis.media('prod')
    //开启插件
    .match('::package', {
        spriter: fis.plugin('csssprites')
    })
    //js
    .match('*.{js,html:js}', {
        optimizer: fis.plugin('uglify-js')
    })
    //js:外部
    .match('*.js', {
        useHash: true
    })
    //css、less
    .match('*.{css,html:css,tpl:css}', {
        useSprite: true,
        optimizer: fis.plugin('clean-css')
    })
    //css、less：外部
    .match('*.{css,less}', {
        useHash: true
    })
    //css、less：外部components
    // .match('components/**/*.{less,less}', {
    //     packTo: '/static/css/components.less',
    // })
    //image
    .match("*.{png,jpg,jpeg,gif,ico}", {
        useHash: true
    })
    //images:png
    .match('*.png', {
        //压缩png
        optimizer: fis.plugin('png-compressor', {
            type: 'pngquant' // pngcrush or pngquant default is pngcrush
        })
    });
