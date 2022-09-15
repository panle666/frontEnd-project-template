const rm = require('rimraf');
const config = require('./index');

const resToPath = 'xxx';

rm(resToPath, (err) => {
  if (err) throw err;
  console.log('已删除模拟资源站旧文件');
  config.exists(config.resFromPath, resToPath, config.copy, function() {
    console.log('已复制到模拟资源站');
  });
});
