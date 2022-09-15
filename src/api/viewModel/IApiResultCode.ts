export enum ApiResultCode {
  /**
   * 成功
   */
  OK = 200,

  /**
   * 自动重定向
   */
  Redirect = 302,

  /**
   * 手动重定向
   */
  ManualRedirect = 30201,

  /**
   * 错误的用户
   */
  InvalidUser = 40000,

  /**
   * 错误的应用
   */
  InvalidApp = 40001,

  /**
   * 错误的token
   */
  InvalidToken = 40002,

  /**
   * 错误的主账号
   */
  InvalidCusMaster = 40003,

  /**
   * 错误的附属账号
   */
  InvalidCusSlave = 40004,

  /**
   * 错误的手机号码
   */
  InvalidMobile = 40005,

  /**
   * 登录失效
   */
  AuthFailed = 401,

  /**
   * 请求受限
   */
  RequestLimited = 40101,

  /**
   * 错误的参数
   */
  InvalidArgument = 40102,

  /**
   * API 已停用
   */
  ApiStoped = 40200,

  /**
   * API 禁止访问
   */
  ApiForbidden = 40201,

  /**
   * 未找到
   */
  NotFound = 404,

  /**
   * 系统错误
   */
  SysError = 500,

  /**
   * 业务错误
   */
  BusinessErr = 50001,
}
