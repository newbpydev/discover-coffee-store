import { useRouter } from "next/router";
import React from "react";

function CoffeeStoreID() {
  const router = useRouter();
  console.log(router);

  return <div>CoffeeStoreID: {router.query.id}</div>;
}

export default CoffeeStoreID;
