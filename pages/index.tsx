import Head from "next/head";
import Banner from "../components/Banner";

import styles from "../styles/Home.module.css";

export default function Home() {
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
      </main>
    </div>
  );
}
