import { Link } from "react-router-dom";
// import { LinkButton, LinkButtonsEnum, LinkRefsEnum } from "../../shared/ui/linkButton";
import { classNames } from "app/components/shared/helpers/classNames";
import cls from "./index.module.scss";

interface NavBarProps {
  className?: string;
}

export const NavBar = ({ className }: NavBarProps) => {
  return (
    <div className={classNames(cls.navbar, {}, [className])}>
      <Link to={"/"}>main page</Link>
      <Link to={"/about"}>about page</Link>
      <Link to={"/counter"}>counter page</Link>
      {/* <LinkButton type={LinkButtonsEnum.MAIN} linkRef={LinkRefsEnum.MAIN} />
      <LinkButton type={LinkButtonsEnum.ABOUT} linkRef={LinkRefsEnum.ABOUT} />
      <LinkButton type={LinkButtonsEnum.COUNTER} linkRef={LinkRefsEnum.COUNTER} /> */}
    </div>
  );
};
