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

import useTrackLocation from "../hooks/useTrackLocation";

import styles from "../styles/Home.module.css";
import { CoffeeStore } from "../Types/FourSquare";
import { fetchCoffeeStores } from "../lib/coffee-store";

// * Interfaces

interface Props {
  coffeeStoreData: CoffeeStore[];
}

// * getStaticProps()
export async function getStaticProps<GetStaticProps>(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<Props>> {
  const coffeeStoreData = await fetchCoffeeStores();

  // console.log(coffeeStoreData);

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
  const location = coffeeStores[0].location.locality;

  const { latLong, handleTrackLocation, locationErrorMsg, isFindingLocation } =
    useTrackLocation();

  console.log({ latLong, locationErrorMsg, isFindingLocation });

  // @ handleOnBannerBrnClick()
  const handleOnBannerBrnClick = () => {
    handleTrackLocation();
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <link rel="icon" href="favicon.ico" type="image/x-icon" />
      </Head>

      <main className={styles.main}>
        <Banner
          buttonText={isFindingLocation ? "Locating..." : "View Stores Nearby"}
          handleClick={handleOnBannerBrnClick}
        />

        {locationErrorMsg && <p>Something went wrong: {locationErrorMsg}</p>}

        <Image
          src="/static/hero-image.png"
          alt="hero image"
          width={700}
          height={400}
          className={styles.heroImage}
          priority={true}
        />

        {coffeeStores.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>{location} Stores</h2>
            <div className={styles.cardLayout}>
              {coffeeStores.map((store) => {
                return (
                  <Card
                    key={store.fsq_id}
                    name={store.name}
                    href={`/coffee-store/${store.fsq_id}`}
                    imageUrl={
                      store.imgUrl ||
                      "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                    }
                  />
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
