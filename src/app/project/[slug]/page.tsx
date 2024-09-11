'use server';

import Image from 'next/image';

import Button from '@/components/Button';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Section from '@/components/Section';
import styles from './styles.module.scss';
import { environment } from '@/config';
import { parseStrapiObject } from '@/utils/strapi';
import Link from 'next/link';

// TODO
const getProject = async (slug: string) => {
  const { apiUrl, apiToken } = environment;

  const searchData = {
    populate: 'bannerBackground, bannerImage, service, about.image, review.avatar, values.icon, previewImages',
  };
  const searchParams = new URLSearchParams(searchData).toString();

  const res = await fetch(`${apiUrl}/slugify/slugs/project/${slug}?${searchParams}`, {
    headers: { Authorization: `Bearer ${apiToken}` },
    cache: 'no-store',
  });
  const { data } = await res.json();

  return parseStrapiObject(data);
};

// TODOgetImageUrl
const getImageUrl = (strapiImage: any) => {
  return `${environment.apiHost}${strapiImage.url}`;
};

// TODO
const parseDate = (dateString: string) => {
  const date = new Date(dateString);
  const options = { month: 'long' as 'long', day: '2-digit' as '2-digit', year: 'numeric' as 'numeric' };

  return date.toLocaleDateString('en-US', options);
};

const ProjectDetail = async (props: any) => {
  const project = await getProject(props.params.slug);

  const banner = {
    background: getImageUrl(project.bannerBackground.data.attributes),
    image: project.bannerImage.data.attributes,
  };

  const service = parseStrapiObject(project.service.data);

  const about: any[] = project.about.map((section: any) => ({
    ...section,
    image: section.image.data.attributes,
  }));

  const review = {
    ...project.review,
    avatar: project.review.avatar.data.attributes,
  };

  const values: any[] = project.values.map((value: any) => ({
    ...value,
    icon: value.icon.data.attributes,
  }));

  const previewImages: any[] = project.previewImages.data.map(parseStrapiObject);

  return (
    <main className={styles.main}>
      <Section className={styles.banner} style={{ backgroundImage: `url(${banner.background})` }}>
        <div className={styles.information}>
          <h1>{project.name}</h1>
          <h2>{service.name}</h2>
          <p className={styles.description}>{project.description}</p>
          <div className={styles.moreDetail}>
            <article>
              <p className={styles.label}>Brand</p>
              <p className={styles.value}>{project.brand}</p>
            </article>
            <article>
              <p className={styles.label}>Service</p>
              <p className={styles.value}>{service.shortName}</p>
            </article>
            <article>
              <p className={styles.label}>Time</p>
              <p className={styles.value}>{parseDate(project.time.toLocaleString())}</p>
            </article>
          </div>
        </div>
        <Image src={getImageUrl(banner.image)} alt='banner-image' width={banner.image.width} height={banner.image.height} />
      </Section>
      <Section className={styles.about}>
        {about.map((section) => (
          <section key={section.id}>
            <div className={styles.imageContainer}>
              <Image src={getImageUrl(section.image)} alt='about' width={section.image.width} height={section.image.height} />
            </div>
            <div className={styles.description}>
              <h3 className={styles.title}>{section.title}</h3>
              <p className={styles.content}>{section.content}</p>
            </div>
          </section>
        ))}
      </Section>
      <Section className={styles.review}>
        <div className={styles.quote}>
          <p>{review.quote}</p>
        </div>
        <div className={styles.reviewer}>
          <Image src={getImageUrl(review.avatar)} alt='reviewer' width={130} height={130} />
          <div className={styles.information}>
            <p className={styles.name}>{review.name}</p>
            <p className={styles.title}>{review.title}</p>
          </div>
        </div>
      </Section>
      <Section className={styles.helped} style={{ backgroundColor: '#ede7d4' }}>
        <h3>{`What we helped with`}</h3>
        <div className={styles.values}>
          {values.map((value) => (
            <div key={value.id} className={styles.value}>
              {value.icon && <Image src={getImageUrl(value.icon)} alt={value.label} width={100} height={100} />}
              <p>{value.label}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section className={styles.preview}>
        {previewImages.map((image) => (
          <div key={image.id} className={styles.imageContainer}>
            <Image src={getImageUrl(image)} alt='preview' width={image.width} height={image.height} />
          </div>
        ))}
        <Button style='primary'>
          <Link href={project.projectUrl} target='_blank'>{`View live site`}</Link>
        </Button>
      </Section>
    </main>
  );
};

export default ProjectDetail;
