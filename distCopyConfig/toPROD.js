// console.log(`未开启自动复制到线上资源站，如需开启，把/distCopyConfig/toPROD.js注释去掉`);
const FTP = require('ftp');
const path = require('path');
const fs = require('fs');
const config = require('./index');

const resDomain = 'xxx';
const resToPath = '\\mscript\\vue\\vue_common';

FTP.prototype.putAsync = function(input, destPath) {
  const that = this;
  return new Promise((resolve, reject) => {
    const destDirName = path.dirname(destPath);
    that.lastMod(destDirName, (lastModErr, lastMod) => {
      if (lastModErr) {
        that.mkdir(destDirName, mkdirErr => {
          if (mkdirErr) {
            return resolve(mkdirErr);
          } else {
            that.put(input, destPath, putErr => {
              return resolve(putErr);
            });
          }
        });
      } else {
        that.put(input, destPath, putErr => {
          return resolve(putErr);
        });
      }
    });
  });
};
const ftpClient = new FTP();
ftpClient.connect({
  host: 'XXX',
  port: 21,
  user: 'XXX',
  password: 'XXX',
  keepalive: 1000,
});
ftpClient.on('ready', () => {
  console.log('开始复制到线上资源站...');
  const distPath = config.resFromPath;
  walk(distPath, async function(err, results) {
    if (err) {
      console.error(`读取本地dist文件夹出错：${JSON.stringify(err)}`);
      return;
    }
    const cdnPurgeUrlList = [];
    for (let i = 0; i < results.length; i++) {
      const filename = results[i];
      // 生成cdn推送url
      const cdnPurgeUrl = createCDNPurgeUrl(resDomain, resToPath, distPath, filename);
      if (cdnPurgeUrl) {
        cdnPurgeUrlList.push(cdnPurgeUrl);
      }
      // 推送到ftp
      const ftpPath = resToPath + filename.replace(distPath, '');
      const err = await ftpClient.putAsync(filename, ftpPath);
      if (err) {
        console.error(`filename:${filename},ftpPath:${ftpPath},error:${JSON.stringify(err)}`);
      }
    }
    console.log('已复制到线上资源站');
    ftpClient.end();
    const cdnPurgeUrlFileName = `${__dirname}/cdnPurgeUrl.txt`;
    fs.writeFile(cdnPurgeUrlFileName, cdnPurgeUrlList.join('\r\n'), err => {
      if (err) {
        console.error(err);
      } else {
        console.log(`已生成cdn推送URL目录至${cdnPurgeUrlFileName}`);
      }
    });
  });
});
ftpClient.on('error', err => {
  console.error(`FTP 出错：${JSON.stringify(err)}`);
});
const walk = function(dir, done) {
  let results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    let pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function(file) {
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          results.push(file);
          if (!--pending) done(null, results);
        }
      });
    });
  });
};

const filterSuffixs = ['.html', '.map'];
const createCDNPurgeUrl = function(domain, resToPath, distPath, filename) {
  if (!filterSuffixs.includes(filename.substring(filename.lastIndexOf('.')))) {
    const cdnPurgeUrl = (domain + resToPath + filename.replace(distPath, '')).replace(/\\/g, '/');
    return cdnPurgeUrl;
  }
  return null;
};
