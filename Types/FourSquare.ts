interface Category {
  id: number;
  names: string;
  icon: { prefixs: string; suffixs: string };
}

interface Location {
  address: string;
  country: string;
  cross_street: string;
  formatted_address: string;
  locality: string;
  postcode: string;
  region: string;
}

interface RelatedPlaces {
  parent: { fsq_id: string; name: string };
}

export interface CoffeeStore {
  fsq_id: string;
  categories: Category[];
  chains: any[];
  distance: number;
  geocodes: { main: { latitude: number; longitude: number } };
  link: string;
  location: Location;
  name: string;
  related_places: RelatedPlaces;
  timezone: string;
  imgUrl: string;
}
