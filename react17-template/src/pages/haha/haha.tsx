import { pathsHelper } from "../../helpers/pathsHelper";

export const HaHa = () => {
  function goHome() {
    pathsHelper.goHome();
  }
  return (
    <div>
      <div>环境变量：{process.env.NODE_ENV}</div>
      <div>haha</div>
      <div onClick={goHome}>goHome</div>
    </div>
  );
};
