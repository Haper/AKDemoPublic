import { setUserSettingsValue } from "./LocalStorage";

export const isLeftMenuExpended = () => {
  const body = document.body;
  return body.classList.contains("LeftMenuMainContainerExpended");
};

export const toggleLeftMenu = () => {
  const body = document.body;
  body.classList.toggle("LeftMenuMainContainerExpended");
  body.classList.toggle("LeftMenuFadeContainerExpended");
  setUserSettingsValue('showMenu', isLeftMenuExpended());
};

export const collapseLeftMenu = () => {
  if (isLeftMenuExpended()) {
    const body = document.body;
    body.classList.remove("LeftMenuMainContainerExpended");
    body.classList.remove("LeftMenuFadeContainerExpended");
    setUserSettingsValue('showMenu', isLeftMenuExpended());
  }
};
