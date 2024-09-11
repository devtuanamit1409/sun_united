import { ChangeEventHandler, Dispatch, FormEventHandler, use, useState } from 'react';

import Button from '@/components/Button';
import Modal from '@/components/Modal';
import styles from './styles.module.scss';
import { environment } from '@/config';

type FormContactProps = {
  show: boolean;
  setShow: Dispatch<boolean>;
};

const FormContact = ({ show, setShow }: FormContactProps) => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  const [error, setError] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    message: '',
  });

  const validate = () => {
    const errs = {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      message: '',
    };
    if (!firstName) {
      errs.firstName = 'First name is required';
    }
    if (!lastName) {
      errs.lastName = 'Last name is required';
    }
    const mailRegExp =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!email) {
      errs.email = 'Email is required';
    } else {
      if (!mailRegExp.test(email)) {
        errs.email = 'Wrong email format';
      }
    }
    const phoneRegExp = /^(\+1[. -]?)?\(?\d{3}\)?[. -]?\d{3}[. -]?[. -]?\d{4}$/;
    if (phoneNumber && !phoneRegExp.test(phoneNumber.replace(/\p{Dash_Punctuation}/gu, '-'))) {
      errs.phoneNumber = 'Wrong phone number format';
    }
    if (!message) {
      errs.message = 'Message is required';
    }

    setError(errs);

    return !Object.values(errs).some((v) => v);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    const { apiUrl, apiToken } = environment;

    event.preventDefault();

    if (!validate()) {
      return;
    }

    const data = {
      firstName,
      lastName,
      email,
      phoneNumber,
      message,
    };

    const res = await fetch(`${apiUrl}/contacts`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ data }),
    });

    if (!res.ok) {
      // Something went wrong
      return;
    }

    setShow(false);
    setShowSuccessModal(true);
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhoneNumber('');
    setMessage('');
  };

  return (
    <>
      <Modal show={show} onClose={() => setShow(false)}>
        <div className={styles.formContact}>
          <h3 className='gradient-text'>Chat with an expert</h3>
          <p>Let’s ignite your vision into action!</p>
          <form onSubmit={handleSubmit} noValidate>
            <label>
              <span>
                First name <span style={{ color: '#ff0000' }}>*</span>
              </span>
              <input type='text' name='firstName' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              {error.firstName && <small className={styles.formError}>{error.firstName}</small>}
            </label>
            <label>
              <span>
                Last name <span style={{ color: '#ff0000' }}>*</span>
              </span>
              <input type='text' name='lastName' value={lastName} onChange={(e) => setLastName(e.target.value)} />
              {error.lastName && <small className={styles.formError}>{error.lastName}</small>}
            </label>
            <label>
              <span>
                Email <span style={{ color: '#ff0000' }}>*</span>
              </span>
              <input type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
              {error.email && <small className={styles.formError}>{error.email}</small>}
            </label>
            <label>
              <span>Phone number</span>
              <input type='tel' name='phoneNumber' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
              {error.phoneNumber && <small className={styles.formError}>{error.phoneNumber}</small>}
            </label>
            <label>
              <span>
                How can we help? <span style={{ color: '#ff0000' }}>*</span>
              </span>
              <textarea name='message' value={message} onChange={(e) => setMessage(e.target.value)} />
              {error.message && <small className={styles.formError}>{error.message}</small>}
            </label>
            <div className={styles.actions}>
              <Button style='primary'>Connect with us</Button>
            </div>
          </form>
        </div>
      </Modal>
      <Modal show={showSuccessModal}>
        <div className={styles.modalSuccess}>
          <p>Thank you! We’ll talk soon!</p>
          <Button style='primary' onClick={() => setShowSuccessModal(false)}>
            OK
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default FormContact;
