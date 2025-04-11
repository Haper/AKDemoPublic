import classNames from 'classnames';
import './PopupMessage.scss';

let popupTimeout: NodeJS.Timeout | null = null;

export const showPopupMessage = (message: string, showError: boolean = false) => {
  removePopupMessage();

  const popupHTML = `
    <div id='popup-message' class="${classNames('PopupMessageMainContainer', showError && 'PopupMessageMainContainerError')}">
      <p>${message}</p>
    </div>
  `;
  document.body.insertAdjacentHTML("beforeend", popupHTML);

  document.getElementById('popup-message')?.addEventListener('click', removePopupMessage);

  popupTimeout = setTimeout(() => {
    removePopupMessage();
  }, 7000);
};

const removePopupMessage = () => {
  popupTimeout && clearTimeout(popupTimeout);
  const popup = document.getElementById('popup-message');
  popup && document.body.removeChild(popup);
};
