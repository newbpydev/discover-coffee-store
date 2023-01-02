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

import coffeeStoreData from "../../data/coffee-stores.json";
import { CoffeeStore } from "..";
import { ParsedUrlQuery } from "querystring";
import Head from "next/head";

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

  return (
    <>
      <Head>
        <title>{coffeeStore?.name}</title>
      </Head>

      <div>
        <Link href={"/"}>Back to home</Link>
        <p>{coffeeStore?.address}</p>
        <p>{coffeeStore?.name}</p>
        <p>{coffeeStore?.neighbourhood}</p>
      </div>
    </>
  );
}

export default CoffeeStoreID;
