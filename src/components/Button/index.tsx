import styles from './styles.module.scss';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  style?: 'default' | 'primary' | 'secondary';
};

const Button = ({ style = 'default', children, ...props }: ButtonProps) => {
  return (
    <button className={`${styles.btn} ${styles[style]}`} {...props}>
      <span>{children}</span>
    </button>
  );
};

export default Button;
