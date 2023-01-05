import { CoffeeStore } from "../Types/FourSquare";
import { createApi } from "unsplash-js";
// import nodeFetch from "node-fetch";

interface UnsplashSearch {
  query: string;
  page?: number;
  perPage?: number;
  orientation?: string;
  contentFi1ter?: string;
  color?: string;
  orderBy?: string;
  collectionlds?: string[];
  lang?: string;
}

// @ unsplash api
const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY || "",
});

// @ getUrlForCoffeeStores()
function getUrlForCoffeeStores({
  latlong,
  query,
  limit,
}: {
  latlong: [number, number];
  query: string;
  limit: number;
}): string {
  return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latlong}&limit=${limit}`;
}

// @ getListOfCoffeeStores()
async function getListOfCoffeeStoresPhotos({
  query,
}: UnsplashSearch): Promise<string[] | undefined> {
  const photos = await unsplash.search.getPhotos({
    query,
    page: 1,
    perPage: 30,
  });
  const unsplashResults = photos.response?.results.map(
    (result) => result.urls["small"]
  );
  return unsplashResults;
}

// * export fetchCoffeeStores()
export async function fetchCoffeeStores() {
  const limit = 6;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.FOURSQUARE_API_KEY || "",
    },
  };

  const photos = await getListOfCoffeeStoresPhotos({ query: "coffee stores" });
  console.log(photos);

  const url = getUrlForCoffeeStores({
    latlong: [-19.37, -40.06],
    query: "coffee",
    limit: 6,
  });

  // console.log({ url });
  const response = await fetch(url, options);
  const data = await response.json();
  const coffeeStore: CoffeeStore[] = data.results;
  const coffeeStoreData = coffeeStore.map((result, i) => ({
    ...result,
    imgUrl: photos.length > 0 ? photos[i] : "",
  }));

  // console.log(response);
  // console.log(data);
  // console.log(coffeeStoreData);
  return coffeeStoreData;
}
