'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

import Button from '@/components/Button';
import Section from '@/components/Section';
import { environment } from '@/config';
import FormContact from '../FormContact';
import Banner from '../HeroBanner';
import styles from './styles.module.scss';

// TODO
const getImageUrl = (strapiImage: any) => {
  return `${environment.apiHost}${strapiImage.url}`;
};
const Home = ({ data }: any) => {
  console.log('Version 1.0.6 02/02/2024');
  const customersRef = useRef<HTMLDivElement>(null);

  const [modalShow, setModalShow] = useState(false);

  const banner = {
    backgroundUrl: getImageUrl(data.bannerBackground.data.attributes),
    name: data.name,
    slogan: data.slogan,
    button: data.bannerButton,
  };

  const values: any[] = data.values.map((value: any) => ({
    ...value,
    icon: getImageUrl(value.icon.data.attributes),
  }));

  const services: any[] = data.services.map((service: any) => ({
    ...service,
    icon: getImageUrl(service.icon.data.attributes),
  }));

  const projects: any[] = data.projects.data.map((project: any) => ({
    id: project.id,
    ...project.attributes,
    thumbnailUrl: getImageUrl(project.attributes.thumbnail.data.attributes),
  }));

  const customers: any[] = data.customers.data.map((customer: any) => ({
    id: customer.id,
    ...customer.attributes,
    logoUrl: getImageUrl(customer.attributes.logo.data.attributes),
  }));

  const scrollCustomers = useCallback(() => {
    if (customersRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = customersRef.current;
      const itemWidth = 220;
      const blockWidth = customers.length * itemWidth;
      const isRightMost = scrollLeft + clientWidth >= scrollWidth - itemWidth;

      if (isRightMost) {
        customersRef.current.scrollBy({
          top: 0,
          left: -blockWidth,
          behavior: 'instant',
        });
      }

      customersRef.current.scrollBy({
        top: 0,
        left: itemWidth,
        behavior: 'smooth',
      });
    }
  }, [customers.length]);

  const handleButtonClick = () => {
    setModalShow(true);
  };

  useEffect(() => {
    document.getElementsByTagName('html')[0].style.overflowY = modalShow ? 'hidden' : 'auto';
  }, [modalShow]);

  useEffect(() => {
    let scrollTimer: NodeJS.Timeout;
    if (customersRef.current) {
      scrollTimer = setInterval(() => {
        scrollCustomers();
      }, 3000);
    }
    return () => {
      clearInterval(scrollTimer);
    };
  }, [customers.length, scrollCustomers]);

  return (
    <>
      <main className={styles.main}>
        <Banner onButtonClick={handleButtonClick} {...banner} />
        <Section className={styles.about}>
          <div id='about' />
          <div className={styles.card}>
            {values.map((value) => (
              <div className={styles.value} key={value.id}>
                <div className={styles.icon}>{value.icon && <Image src={value.icon} alt={value.title} width={74} height={74} />}</div>
                <h4 className={styles.title}>{value.title}</h4>
                <p className={styles.detail}>{value.detail}</p>
              </div>
            ))}
            <p className={styles.description}>{data.valueDescription}</p>
          </div>
          <div className={styles.content}>
            <h2 className='gradient-text'>{data.aboutTitle}</h2>
            <h3>{data.aboutSubtitle}</h3>
            <p className={styles.description}>{data.aboutDescription}</p>
            <Button style={data.aboutButton.style} onClick={handleButtonClick}>
              {data.aboutButton.text}
            </Button>
          </div>
        </Section>
        <Section className={styles.services} style={{ backgroundColor: '#242424' }}>
          <div id='services' />
          <div className={styles.content}>
            <h2 className='gradient-text'>{data.serviceTitle}</h2>
            <h3>{data.serviceSubtitle}</h3>
            <Button style={data.serviceButton.style} onClick={handleButtonClick}>
              {data.serviceButton.text}
            </Button>
          </div>
          <div className={styles.serviceContainer}>
            <div className={styles.serviceList}>
              {services.map((service) => (
                <div key={service.id} className={styles.service}>
                  {service.icon && <Image src={service.icon} alt={service.title} width={80} height={80} />}

                  <h4>{service.title}</h4>
                  <p>{service.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>
        <Section className={styles.clients} style={{ backgroundColor: '#242424' }}>
          <div id='clients' />
          <div className={styles.content}>
            <h2 className='gradient-text'>{data.clientTitle}</h2>
          </div>
          <div className={styles.projects}>
            {projects.map((project) => (
              <Link key={project.id} href={`/project/${project.slug}`}>
                <div className={styles.project}>
                  <div className={styles.backgroundContainer}>
                    <Image src={project.thumbnailUrl} alt={project.name} fill />
                  </div>
                  <div className={styles.information}>
                    <h4>{project.name}</h4>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <Button style={data.clientButton.style} onClick={handleButtonClick}>
            {data.clientButton.text}
          </Button>
        </Section>
        <Section className={styles.trusted}>
          <div className={styles.content}>
            <h3 className='gradient-text'>{data.customerTitle}</h3>
            <p>{data.customerDescription}</p>
          </div>
          <div className={styles.customers} ref={customersRef}>
            {Array(3)
              .fill(0)
              .map(() =>
                customers.map((customer) => (
                  <div key={customer.id} className={styles.customer}>
                    <Image src={customer.logoUrl} alt='customer logo' width={160} height={160} />
                  </div>
                ))
              )}
          </div>
        </Section>
      </main>
      <FormContact show={modalShow} setShow={setModalShow} />
    </>
  );
};

export default Home;
