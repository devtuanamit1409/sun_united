import styles from './styles.module.scss';

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  children: React.ReactNode;
};

const Section = ({ children, style, ...props }: SectionProps) => {
  return (
    <section className={styles.section} style={style}>
      <div {...props}>{children}</div>
    </section>
  );
};

export default Section;
