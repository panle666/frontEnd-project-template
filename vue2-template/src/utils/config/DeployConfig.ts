const DeployConfig = {
  /**
   * 应用运行的模式是否为 production
   */
  nodeEnv: {
    isProduction: process.env.NODE_ENV === 'production',
  },
  /**
   * 当前应用部署环境 dev tst rc prod
   */
  deployEnv: process.env.VUE_APP_DEPLOY_ENV as 'dev' | 'tst' | 'rc' | 'prod',
  platform: 'bd',
};

export { DeployConfig };
