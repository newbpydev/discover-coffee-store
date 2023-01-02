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

// *                                                        Interfaces

// *                                                        getStaticPaths()

// *                                                        getStaticProps()

// *                                                        CoffeeStoreId Page
function CoffeeStoreID() {
  const router = useRouter();
  // console.log(router);

  return (
    <div>
      Coffee Store Page: {router.query.id}
      <Link href={"/"}>Back to home</Link>
    </div>
  );
}

export default CoffeeStoreID;
