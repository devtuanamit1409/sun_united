import { createPortal } from 'react-dom';

import styles from './styles.module.scss';

type ModalProps = {
  children: React.ReactNode;
  show: boolean;
  onClose?: () => void;
};

const Modal = ({ children, show, onClose }: ModalProps) => {
  return (
    show &&
    createPortal(
      <div className={styles.modalBackdrop}>
        <div className={styles.modal}>
          {onClose && (
            <div className={styles.closeButton} onClick={onClose}>
              <svg width='20' height='20' viewBox='0 0 20 20' fill='#000000' xmlns='http://www.w3.org/2000/svg'>
                <path d='M18.8286 3.82861C19.561 3.09619 19.561 1.90674 18.8286 1.17432C18.0962 0.441895 16.9067 0.441895 16.1743 1.17432L10.0044 7.3501L3.82861 1.18018C3.09619 0.447754 1.90674 0.447754 1.17432 1.18018C0.441895 1.9126 0.441895 3.10205 1.17432 3.83447L7.3501 10.0044L1.18018 16.1802C0.447754 16.9126 0.447754 18.1021 1.18018 18.8345C1.9126 19.5669 3.10205 19.5669 3.83447 18.8345L10.0044 12.6587L16.1802 18.8286C16.9126 19.561 18.1021 19.561 18.8345 18.8286C19.5669 18.0962 19.5669 16.9067 18.8345 16.1743L12.6587 10.0044L18.8286 3.82861Z' />
              </svg>
            </div>
          )}
          <div className={styles.container}>{children}</div>
        </div>
      </div>,
      document.body
    )
  );
};

export default Modal;
