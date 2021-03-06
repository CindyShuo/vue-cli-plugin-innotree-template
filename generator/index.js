function renderFiles (api, opts) {
  if (opts.replaceTemplates) {
    console.log(opts)
    // https://github.com/vuejs/vue-cli/issues/2470
    api.render(files => {
      console.log(files);
      Object.keys(files)
        .filter(name => name.startsWith('src/') > -1)
        .forEach(name => delete files[name])
    })
    api.render('./templates/base');
    api.render('./templates/sp');
    // 安装 vuex
    if (opts.vuex) {
      api.extendPackage({
        dependencies: {
          vuex: '^3.0.1'
        }
      });

      api.render('./template/vuex');
    }

    // 安装 element-ui 库
    if (opts.elementUI) {
      api.extendPackage({
        devDependencies: {
          "element-ui": "^2.7.2",
          "vue-cli-plugin-element": "^1.0.0",
          "babel-plugin-component": "^1.1.1"
        }
      });
      api.render('./templates/el')
    }
  }
}

function addDependencies (api) {
  api.extendPackage({
    dependencies: {
      "axios": "^0.18.0",
      "babel-polyfill": "^6.26.0",
    },
    devDependencies: {
      "qs": "^6.5.2",
      "style-resources-loader": "^1.2.1",
    }
  })
}

module.exports = (api, opts, rootOpts) => {
  addDependencies(api);
  renderFiles(api, opts)
}
