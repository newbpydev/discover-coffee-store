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
import { CoffeeStore } from "../Types/FourSquare";

// * Interfaces
// export interface CoffeeStore {
//   id: number;
//   name: string;
//   imgUrl: string;
//   websiteUrl: string;
//   address: string;
//   neighbourhood: string;
// }

// export interface FourSquareResult {

// }

interface Props {
  coffeeStoreData: CoffeeStore[];
}

// * getStaticProps()
export async function getStaticProps<GetStaticProps>(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<Props>> {
  const limit = 6;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "fsq31OuoVnQjNveaU85nRAn+qxodUsm0L7l8OdIJcl2u8Ro=",
    },
  };

  const response = await fetch(
    `https://api.foursquare.com/v3/places/search?query=coffee&ll=-19.37%2C-40.06&limit=${limit}`,
    options
  );
  const data = await response.json();
  const coffeeStoreData: CoffeeStore[] = data.results;
  console.log({ coffeeStoreData });
  // .then((response) => response.json())
  // .then((response) => console.log(response))
  // .catch((err) => console.error(err));

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
            <h2 className={styles.heading2}>{location} Stores</h2>
            <div className={styles.cardLayout}>
              {coffeeStores.map((store) => {
                return (
                  <Card
                    key={store.fsq_id}
                    name={store.name}
                    href={`/coffee-store/${store.fsq_id}`}
                    imageUrl={
                      "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                    }
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
