import Link from "next/link";
import { useRouter } from "next/router";
import {
  GetStaticPaths,
  GetStaticPathsContext,
  GetStaticPathsResult,
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPropsResult,
  InferGetStaticPropsType,
} from "next";
import cls from "classnames";

import coffeeStoreData from "../../data/coffee-stores.json";
import { CoffeeStore } from "..";
import { ParsedUrlQuery } from "querystring";
import Head from "next/head";

import styles from "../../styles/coffee-store.module.css";
import Image from "next/image";

// *                                                        Interfaces
interface ParamsProps extends ParsedUrlQuery {
  id: string;
}

// interface StaticProps {
//   coffeeStore
// }

interface Props {
  coffeeStore: CoffeeStore | undefined;
}

// *                                                        getStaticPaths()
export async function getStaticPaths<GetStaticPaths>(
  context: GetStaticPathsContext
): Promise<GetStaticPathsResult<ParamsProps>> {
  const paths = coffeeStoreData.map((coffeeStore) => {
    return {
      params: {
        id: coffeeStore.id.toString(),
      },
    };
  });

  return {
    paths,
    // paths: [{ params: { id: "0" } }, { params: { id: "1" } }],
    fallback: true,
  };
}

// *                                                        getStaticProps()
export async function getStaticProps<GetStaticProps>(
  context: GetStaticPropsContext<ParamsProps>
): Promise<GetStaticPropsResult<Props>> {
  const params = context.params;

  const store = coffeeStoreData.find((coffeeStore) => {
    if (params?.id) {
      return coffeeStore.id.toString() === params?.id;
    }
  });

  return {
    props: {
      coffeeStore: store,
    },
  };
}

// *                                                        CoffeeStoreId Page
function CoffeeStoreID({
  coffeeStore,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading</div>;
  }

  if (!coffeeStore) return <div>No Such Store </div>;

  const handleUpvoteButton = () => {
    console.log("handle upvote");
  };

  return (
    <div className={styles.layout}>
      <Head>
        <title>{coffeeStore?.name}</title>
      </Head>

      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href={"/"}>Back to home</Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{coffeeStore?.name}</h1>
          </div>
          <Image
            src={coffeeStore.imgUrl}
            alt={coffeeStore.name}
            width={600}
            height={360}
            className={styles.storeImg}
          />
        </div>

        <div className={cls("glass", styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/places.svg"
              width={24}
              height={24}
              alt="location icon"
            />
            <p className={styles.text}>{coffeeStore?.address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/nearMe.svg"
              width={24}
              height={24}
              alt="location icon"
            />
            <p className={styles.text}>{coffeeStore?.neighbourhood}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/star.svg"
              width={24}
              height={24}
              alt="location icon"
            />
            <p className={styles.text}>1</p>
          </div>
          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Up vote!
          </button>
        </div>
      </div>
    </div>
  );
}

export default CoffeeStoreID;
