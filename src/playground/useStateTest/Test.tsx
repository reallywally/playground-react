import cronstrue from "cronstrue";
import "cronstrue/locales/ko";

const UseStateTest = () => {
  const crontab = "15 14 1 * *";

  console.log(cronstrue.toString(crontab));
  console.log(cronstrue.toString(crontab, { locale: "ko" }));

  return <></>;
};

export default UseStateTest;
