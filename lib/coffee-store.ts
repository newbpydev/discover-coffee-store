import { CoffeeStore } from "../Types/FourSquare";

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

export async function fetchCoffeeStores() {
  const limit = 6;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.FOURSQUARE_API_KEY || "",
    },
  };
  // console.log("Authorization: ", options.headers.Authorization);

  const url = getUrlForCoffeeStores({
    latlong: [-19.37, -40.06],
    query: "coffee",
    limit: 6,
  });

  // console.log({ url });
  const response = await fetch(url, options);
  const data = await response.json();
  const coffeeStoreData: CoffeeStore[] = data.results;

  // console.log(response);
  // console.log(data);
  // console.log(coffeeStoreData);
  return coffeeStoreData;
}
