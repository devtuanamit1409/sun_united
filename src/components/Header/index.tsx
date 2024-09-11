'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import Button from '../Button';
import styles from './styles.module.scss';
import FormContact from '@/app/components/FormContact';

const Header = () => {
  const [scrolledDown, setScrolledDown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolledDown(window.scrollY > 80);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleButtonClick = () => {
    setModalShow(true);
  };

  const handleNavigate = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    document.getElementsByTagName('html')[0].style.overflowY = modalShow ? 'hidden' : 'auto';
  }, [modalShow]);

  const navigatorItems = [
    {
      label: 'Home',
      href: '/#',
    },
    {
      label: 'About Us',
      href: '/#about',
    },
    {
      label: 'Services',
      href: '/#services',
    },
    {
      label: 'Happy Clients',
      href: '/#clients',
    },
    {
      label: 'Contact Us',
      href: '/#contact',
    },
  ];

  return (
    <header className={`${styles.header} ${scrolledDown ? styles.scrolled : styles.onTop}`}>
      <div className={styles.logoContainer}>
        <a href='/#'>
          <Image src='/logo.png' alt='Logo' width={175} height={112} />
        </a>
      </div>

      <nav className={`${styles.navigation} ${menuOpen ? styles.open : ''}`}>
        <div className={styles.closeButton} onClick={() => setMenuOpen(false)}>
          <svg width='20' height='20' viewBox='0 0 20 20' fill='white' xmlns='http://www.w3.org/2000/svg'>
            <path d='M18.8286 3.82861C19.561 3.09619 19.561 1.90674 18.8286 1.17432C18.0962 0.441895 16.9067 0.441895 16.1743 1.17432L10.0044 7.3501L3.82861 1.18018C3.09619 0.447754 1.90674 0.447754 1.17432 1.18018C0.441895 1.9126 0.441895 3.10205 1.17432 3.83447L7.3501 10.0044L1.18018 16.1802C0.447754 16.9126 0.447754 18.1021 1.18018 18.8345C1.9126 19.5669 3.10205 19.5669 3.83447 18.8345L10.0044 12.6587L16.1802 18.8286C16.9126 19.561 18.1021 19.561 18.8345 18.8286C19.5669 18.0962 19.5669 16.9067 18.8345 16.1743L12.6587 10.0044L18.8286 3.82861Z' />
          </svg>
        </div>
        {navigatorItems.map((item, index) => (
          <a key={index} href={item.href} className={styles.navigationItem} onClick={handleNavigate}>
            {item.label}
          </a>
        ))}
        <Button style='primary' onClick={handleButtonClick}>
          Free Consultation
        </Button>
      </nav>
      <div className={styles.hamburgerMenu} onClick={() => setMenuOpen((v) => !v)}>
        <svg width='24' height='24' viewBox='0 0 24 24' stroke='#ffffff' xmlns='http://www.w3.org/2000/svg'>
          <path d='M10 9L22 9' strokeWidth='2' strokeLinecap='round' />
          <path d='M2 14L22 14' strokeWidth='2' strokeLinecap='round' />
          <path d='M10 19L22 19' strokeWidth='2' strokeLinecap='round' />
          <path d='M2 4L22 4' strokeWidth='2' strokeLinecap='round' />
        </svg>
      </div>
      <FormContact show={modalShow} setShow={setModalShow} />
    </header>
  );
};

export default Header;
