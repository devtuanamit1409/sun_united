'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FormEventHandler, useState } from 'react';

import { environment } from '@/config';
import Button from '../Button';
import styles from './styles.module.scss';
import Modal from '../Modal';
import Select from '../Select';

type TContact = {
  id: number;
  type: 'location' | 'mail' | 'phone';
  label: string;
  url: string;
  openNewTab: boolean;
};

const Contact = ({ type, label, url, openNewTab }: TContact) => {
  return (
    <div className={styles.contact}>
      <Link href={url} target={openNewTab ? '_blank' : '_self'}>
        <Image src={`/icons/footer/${type}.svg`} alt={type} width={20} height={20} style={{ width: '20px', height: 'auto' }} />
        <span>{label}</span>
      </Link>
    </div>
  );
};

const FormContact = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [service, setService] = useState<number>(0);

  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [error, setError] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    message: '',
    service: '',
  });

  const validate = () => {
    const errs = {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      message: '',
      service: '',
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
    const phoneRegExp = /^(\+|0)(?:[1-9] ?){6,14}[0-9]$/;
    if (phoneNumber && !phoneRegExp.test(phoneNumber)) {
      errs.phoneNumber = 'Wrong phone number format';
    }
    if (!message) {
      errs.message = 'Message is required';
    }
    if (service === 0) {
      errs.service = 'Select a service';
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
      service,
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

    setShowSuccessModal(true);
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhoneNumber('');
    setMessage('');
    setService(0);
  };

  const services = [
    { id: 1, label: 'Website Development', value: 'website' },
    { id: 2, label: 'Software Development', value: 'software' },
    { id: 3, label: 'Mobile App Creation', value: 'mobile' },
    { id: 4, label: 'AWS Integration', value: 'aws' },
    { id: 5, label: 'Machine Learning/AI Consulting', value: 'ai' },
    { id: 6, label: 'Data Analytics', value: 'data' },
    { id: 7, label: 'Cloud Technology Expertise', value: 'cloud' },
    { id: 8, label: '24/7 Product/Service Support', value: 'support' },
    { id: 9, label: 'Salesforce Consultation', value: 'salesforce' },
  ];

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <label>
          <span>
            First name <span style={{ color: '#ff0000' }}>*</span>
          </span>
          <input type='text' name='firstName' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          {error.firstName && <small className={styles.formError}>{error.firstName}</small>}
        </label>
      </div>
      <div>
        <label>
          <span>
            Last name <span style={{ color: '#ff0000' }}>*</span>
          </span>
          <input type='text' name='lastName' value={lastName} onChange={(e) => setLastName(e.target.value)} />
          {error.lastName && <small className={styles.formError}>{error.lastName}</small>}
        </label>
      </div>
      <div>
        <label>
          <span>
            Email <span style={{ color: '#ff0000' }}>*</span>
          </span>
          <input type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
          {error.email && <small className={styles.formError}>{error.email}</small>}
        </label>
      </div>
      <div>
        <label>
          <span>Phone number</span>
          <input type='tel' name='phone' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          {error.phoneNumber && <small className={styles.formError}>{error.phoneNumber}</small>}
        </label>
      </div>
      <div>
        <label>
          <span>
            Message <span style={{ color: '#ff0000' }}>*</span>
          </span>
          <textarea name='message' rows={3} value={message} onChange={(e) => setMessage(e.target.value)} />
          {error.message && <small className={styles.formError}>{error.message}</small>}
        </label>
      </div>
      <div className={styles.selectInput}>
        <span>
          Select service <span style={{ color: '#ff0000' }}>*</span>
        </span>
        <Select options={services} selectedValue={service} onSelect={setService} />
        {error.service && <small className={styles.formError}>{error.service}</small>}
      </div>
      <div>
        <Button type='submit'>Submit</Button>
      </div>
      <Modal show={showSuccessModal}>
        <div className={styles.modalSuccess}>
          <p>Thank you! We’ll talk soon!</p>
          <Button style='primary' onClick={() => setShowSuccessModal(false)}>
            OK
          </Button>
        </div>
      </Modal>
    </form>
  );
};

const Footer = ({ data }: any) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div id='contact'></div>
        <div className={styles.left}>
          <div className={styles.follow}>
            <h3>Follow Us</h3>
            <div className={styles.socials}>
              {data.socials.map((social: any) => (
                <Link key={social.id} href={social.url} target='_blank'>
                  <Image src={`${environment.apiHost}${social.icon.data.attributes.url}`} alt={social.icon.data.attributes.alternativeText} width={34} height={34} />
                </Link>
              ))}
            </div>
          </div>
          <div className={styles.information}>
            <div className={styles.logoContainer}>
              <a href='/#'>
                <Image src='/logo.png' alt='Logo' width={277} height={171} />
              </a>
            </div>
            {data.contacts.map((contact: any) => (
              <Contact key={contact.id} {...contact} />
            ))}
            <div className={styles.copyright}>
              <p>{data.copyright}</p>
            </div>
          </div>
        </div>
        <div className={styles.card}>
          <h3>{`Let's turn your vision into software solution`}</h3>
          <FormContact />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
