import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

function DynnamicRoute() {
  const router = useRouter();
  const dRoute = router.query.dRoute;

  console.log(router);
  return (
    <>
      <Head>
        <title>{dRoute}</title>
      </Head>

      <div>
        <h1>Page {router.query.dRoute}</h1>
      </div>
    </>
  );
}

export default DynnamicRoute;
