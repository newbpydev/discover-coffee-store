import Head from "next/head";
import Image from "next/image";
import {
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPropsResult,
  InferGetStaticPropsType,
} from "next";

import Banner from "../components/Banner";
import Card from "../components/Card";

import coffeeStoreData from "../data/coffee-stores.json";

import styles from "../styles/Home.module.css";

// * Interfaces
interface CoffeeStore {
  id: number;
  name: string;
  imgUrl: string;
  websiteUrl: string;
  address: string;
  neighbourhood: string;
}

interface Props {
  coffeeStoreData: CoffeeStore[];
}

// * getStaticProps()
export async function getStaticProps<GetStaticProps>(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<Props>> {
  console.log({ context });
  return {
    props: {
      coffeeStoreData,
    },
  };
}

// * Home Page
export default function Home({
  coffeeStoreData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const coffeeStores: CoffeeStore[] = coffeeStoreData;

  // @ handleOnBannerBrnClick()
  const handleOnBannerBrnClick = () => {
    console.log("Hi, banner button");
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <link rel="icon" href="favicon.ico" type="image/x-icon" />
      </Head>

      <main className={styles.main}>
        <Banner
          buttonText="View Stores Nearby"
          handleClick={handleOnBannerBrnClick}
        />

        <Image
          src="/static/hero-image.png"
          alt="hero image"
          width={700}
          height={400}
          className={styles.heroImage}
          priority={true}
        />

        {coffeeStores.length > 0 && (
          <>
            <h2 className={styles.heading2}>Toronto Stores</h2>
            <div className={styles.cardLayout}>
              {coffeeStores.map((store) => {
                return (
                  <Card
                    key={store.id}
                    name={store.name}
                    href={`/coffee-store/${store.id}`}
                    imageUrl={store.imgUrl}
                  />
                );
              })}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
