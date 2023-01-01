import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

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
