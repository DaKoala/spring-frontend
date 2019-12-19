export interface ToastConfig {
  type: 'alert' | 'confirm';
  content: string;
  title?: string;
  confirmText?: string;
  cancelText?: string;
  onClickConfirm?: () => void;
  onClickCancel?: () => void;
}

const body = document.querySelector('body');

/**
 * Generate a toast in the top of the screen to replace built-in alert
 */
export default function toast({
  type,
  content,
  title,
  confirmText,
  cancelText,
  onClickConfirm,
  onClickCancel,
}: ToastConfig) {
  const container = document.createElement('div');
  const removeToast = () => {
    body.removeChild(container);
  };
  container.className = 'toast';
  if (title) {
    const titleEle = document.createElement('h2');
    titleEle.textContent = title;
    titleEle.className = 'toast__title';
    container.appendChild(titleEle);
  }
  const contentEle = document.createElement('p');
  contentEle.textContent = content;
  contentEle.className = 'toast__content';
  container.appendChild(contentEle);
  const btnContainerEle = document.createElement('div');
  btnContainerEle.className = 'toast__btnGroup';
  const confirmBtn = document.createElement('button');
  confirmBtn.classList.add('toast__btn', 'toast__btn--primary');
  confirmBtn.textContent = confirmText || (type === 'confirm' ? 'Confirm' : 'OK');
  if (type === 'confirm') {
    const cancelBtn = document.createElement('button');
    cancelBtn.classList.add('toast__btn', 'toast__btn--error');
    cancelBtn.textContent = cancelText || 'Cancel';
    cancelBtn.addEventListener('click', () => {
      removeToast();
      onClickCancel && onClickCancel();
    });
    btnContainerEle.appendChild(cancelBtn);
  }
  confirmBtn.addEventListener('click', () => {
    removeToast();
    onClickConfirm && onClickConfirm();
  });
  btnContainerEle.appendChild(confirmBtn);
  container.appendChild(btnContainerEle);
  body.appendChild(container);
}
