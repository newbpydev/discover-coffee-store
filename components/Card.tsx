import cls from "classnames";

import Image from "next/image";
import Link from "next/link";

import styles from "./Card.module.css";

interface Props {
  title: string;
  imageUrl: string;
  href: string;
}

function Card({ imageUrl, title, href }: Props) {
  return (
    <Link href={href} className={styles.cardLink}>
      <div className={cls("glass", styles.container)}>
        <div className={styles.cardHeaderWrapper}>
          <h2 className={styles.cardHeader}>{title}</h2>
        </div>
        <div className={styles.cardImageWrapper}>
          <Image
            src={imageUrl}
            className={styles.cardImage}
            alt={title}
            width={260}
            height={160}
          />
        </div>
      </div>
    </Link>
  );
}

export default Card;
