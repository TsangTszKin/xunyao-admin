/**
 * 开发环境
 */
;(function () {
  // @ts-ignore
  window.SITE_CONFIG = {};

  // api接口请求地址
   window.SITE_CONFIG['baseUrl'] = 'http://192.168.0.110:80';
   //window.SITE_CONFIG['baseUrl'] = 'http://192.168.1.102:8888';
  // window.SITE_CONFIG['baseUrl'] = 'http://zwdjack.iok.la:40229';
  // @ts-ignore
  // window.SITE_CONFIG['baseUrl'] = 'http://47.106.168.53:8091';
  // window.SITE_CONFIG['baseUrl'] = 'http://testapi.gu-dao.cn';
  // cdn地址 = 域名 + 版本号
  // @ts-ignore
  window.SITE_CONFIG['domain']  = './'; // 域名
  // @ts-ignore
  window.SITE_CONFIG['version'] = '';   // 版本号(年月日时分)
  // @ts-ignore
  window.SITE_CONFIG['cdnUrl']  = window.SITE_CONFIG.domain + window.SITE_CONFIG.version;
})();
