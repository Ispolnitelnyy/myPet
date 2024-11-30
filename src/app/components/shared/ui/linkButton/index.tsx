import classes from "./index.module.scss";
import { Link } from "react-router-dom";
export type LinkButtonTypeProps = {
  type: LinkButtonsEnum;
  linkRef: LinkRefsEnum;
};

export enum LinkButtonsEnum {
  MAIN = "страница меню",
  ABOUT = "страница о сайте",
  COUNTER = "страница с счетчиком",
}
export enum LinkRefsEnum {
  MAIN = "/",
  ABOUT = "/about",
  COUNTER = "/counter",
}

export const LinkButton = (props: LinkButtonTypeProps) => {
  return (
    <div className={classes.linkButton}>
      <Link className={classes.link} to={props.linkRef}>{props.type}</Link>
    </div>
  );
};
