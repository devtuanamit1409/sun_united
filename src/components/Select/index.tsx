'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import styles from './styles.module.scss';

const Select = ({ selectedValue, options, onSelect }: any) => {
  const [selectOpen, setSelectOpen] = useState<boolean>(false);

  const selectedOption = options.find((option: any) => option.id === selectedValue);

  const handleSelect = (event: any, value: any) => {
    event.stopPropagation();
    setSelectOpen(false);
    onSelect && onSelect(value);
  };

  useEffect(() => {
    console.log('reoivnasv', selectOpen);
  }, [selectOpen]);

  return (
    <>
      <div className={styles.select} onClick={() => setSelectOpen(true)}>
        {selectedOption ? selectedOption.label : 'Select service'}
        <svg width='46' height='46' viewBox='0 0 46 46' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M10.2227 17.9146C10.2243 17.4103 10.375 16.9178 10.6559 16.4991C10.9369 16.0803 11.3354 15.754 11.8013 15.5613C12.2673 15.3685 12.7799 15.3179 13.2745 15.4158C13.7692 15.5138 14.2238 15.7559 14.5812 16.1116L22.9864 24.5092L31.3916 16.1116C31.8706 15.668 32.5013 15.4246 33.1542 15.4312C33.807 15.4379 34.4326 15.6943 34.9024 16.1476C35.3723 16.6009 35.6508 17.2169 35.6808 17.8691C35.7109 18.5213 35.4901 19.1603 35.0639 19.6549L35.0013 19.7175L24.7893 29.9193C24.3102 30.3972 23.6612 30.6656 22.9845 30.6656C22.3078 30.6656 21.6587 30.3972 21.1796 29.9193L10.9714 19.7188C10.7338 19.4823 10.5453 19.2011 10.4168 18.8915C10.2883 18.5818 10.2223 18.2498 10.2227 17.9146Z'
            fill='#464646'
          />
        </svg>
        {selectOpen && (
          <div className={styles.options}>
            {options.map((option: any) => (
              <div key={option.id} className={styles.option} onClick={(event) => handleSelect(event, option.id)}>
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
      {selectOpen &&
        createPortal(
          <div
            className={styles.backdrop}
            onClick={() => {
              setSelectOpen(false);
              console.log('sdouivbnhrefiovneaklf');
            }}
          ></div>,
          document.body
        )}
    </>
  );
};

export default Select;
