import { LinkButton, LinkButtonsEnum, LinkRefsEnum } from "../../shared/ui/linkButton";

export const NavBar = () => {
  return (
    <div>
      <LinkButton type={LinkButtonsEnum.MENU} linkRef={LinkRefsEnum.MENU} />
      <LinkButton type={LinkButtonsEnum.ABOUT} linkRef={LinkRefsEnum.ABOUT} />
      <LinkButton type={LinkButtonsEnum.COUNTER} linkRef={LinkRefsEnum.COUNTER} />
    </div>
  );
};
