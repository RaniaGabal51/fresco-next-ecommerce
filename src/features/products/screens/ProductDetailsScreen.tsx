import ProductInfo from "../components/productDetails/ProductInfo";
import { getSpecificProduct } from "../services/getSpecificProduct";

export default async function ProductDetailsScreen({ id }: { id: string }) {
  const ProductDetailsResponse = await getSpecificProduct(id);
  return <>
  <ProductInfo productinfo={ProductDetailsResponse.data}/>
  </>;
}
