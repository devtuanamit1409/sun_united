import Button from '@/components/Button';
import styles from './styles.module.scss';
import Image from 'next/image';

type BannerProps = {
  backgroundUrl: string;
  name: string;
  slogan: string;
  button: {
    style: 'default' | 'primary' | 'secondary';
    text: string;
  };
  onButtonClick: () => void;
};

const Banner = ({ name, slogan, backgroundUrl, button, onButtonClick }: BannerProps) => {
  const renderName = (name: string) => {
    return name.split(' ').map((text, idx) => (
      <span key={idx} className={styles.textBlock}>
        {text.split('').map((letter, letterIdx) => (
          <span
            key={letterIdx}
            className={`gradient-text ${styles.letter}`}
            style={{
              animation: `${styles.checkerboard} 1.6s linear 0.4s 1 normal forwards`,
            }}
          >
            {letter}
          </span>
        ))}
      </span>
    ));
  };

  return (
    <section id='top' className={styles.banner}>
      <div className={styles.backgroundContainer}>
        <Image src={backgroundUrl} alt='banner' fill quality={90} priority={true} />
      </div>
      <div className={styles.title}>{renderName(name)}</div>
      <h3
        className={styles.subtitle}
        style={{
          animation: `${styles.fadeUp} 0.4s ease-out ${(name.length - 1) * 0.04 + 0.8}s 1 normal forwards`,
        }}
      >
        {slogan}
      </h3>
      <Button style={button.style} onClick={onButtonClick}>
        {button.text}
      </Button>
    </section>
  );
};

export default Banner;
