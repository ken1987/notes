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
        except: 'exports, module, require, define'//不需要混淆的关键字
    },
    compress:{
        drop_console:true //自动删除console
    }
});

//不需要被构建的文件
fis.set('project.ignore', [
    '*.bat',
    'fis-conf.js'
]);

/**
 * 开发阶段
 */
fis
    //开启插件
    //参考：https://github.com/fex-team/fis3-postpackager-loader
    .match('::package', {
        postpackager: fis.plugin('loader') //同名依赖需要用到
    })
    //异构less
    .match('*.less', {
        parser: fis.plugin('less'),
        rExt: '.css'
    })
    //html tpl
    .match('*.{html,tpl}', {
        useMap: true //同名依赖需要用到
    })
    //image --> root/static/images
    .match("(*.{png,jpg,jpeg,gif,ico})", {
        release: '/static/images/$1'
    })
    //page --> root
    .match('/page(/**)', {
        release: '$1'
    })
    //components
    .match("components/**", {
        useSameNameRequire: true //开启同名依赖
    })
    //components:js --> root/static/js/components
    .match(/components\/(.*)\/\1.js/, {
        release: '/static/js/components/$1.js' //同名发布
    })
    //components:less --> root/static/css/components
    .match(/components(\/_)?\/(.*)\/\2.less/, {
        release: '/static/css/components/$2.less' //同名发布
    })
    //components:image --> root/static/images
    .match(/components(\/_)?\/(.*\.(png|jpg|jpeg|gif|ico))/, {
        release: '/static/images/$2'
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
        optimizer: fis.plugin('clean-css')
    })
    //css、less：外部
    .match('*.{css,less}', {
        useSprite: true,
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
