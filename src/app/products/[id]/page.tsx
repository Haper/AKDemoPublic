import DataService from "@/domain/api/dataService";
import PageTitle from "@/app/SharedComponents/PageTitle";
import ProductDetailsGallery from "./Components/ProductDetailsGallery";
import RatingStars from "@/app/SharedComponents/RatingStars";
import ReviewList from "./Components/ReviewList";
import classNames from "classnames";
import BackButton from "./Components/BackButton";
import DummyJsonLink from "@/app/SharedComponents/DummyJsonLink";
import './ProductDetailsPage.scss';

// import { Metadata, ResolvedMetadata } from "next";
// export async function generateMetadata(
//   { params }: { params: PageParamsType; },
//   parent: ResolvedMetadata
// ): Promise<Metadata> {
//   const { id } = await params;
//   const product = await DataService.getProduct(Number(id));

//   const previousImages = parent?.openGraph?.images;

//   const images = [];
//   product.images?.[0] && images.push(product.images[0]);
//   images.push(...(previousImages || []));

//   return {
//     title: product.title,
//     description: product.description,
//     openGraph: {
//       title: product.title,
//       description: product.description,
//       url: `https://ak-demo-site.vercel.app/products/${id}`,
//       siteName: "AK Demo Site",
//       images,
//       locale: "en-US",
//       type: "website",
//     },
//     twitter: {
//       title: product.title,
//       description: product.description,
//     },
//   };
// }

type PageParamsType = Promise<{ id: string; }>;

const backgroundColors = [
  'BgOne', 'BgTwo', 'BgThree',
];

const ProductDetailsPage = async ({ params }: { params: PageParamsType; }) => {
  const { id } = await params;

  const product = await DataService.getProduct(Number(id));

  const bgIndex = Math.floor(Math.random() * 3);

  const { title, price, category, brand, rating, availabilityStatus, description, images } = product;

  return (
    <article className={classNames('BasicPageMainContainer', 'ProductDetailsMainContainer', backgroundColors[bgIndex])}>
      <PageTitle title={title} />
      <div className={'BasicPageCenterContainer'}>
        <div className="flex flex-row items-center gap-2.5">
          <BackButton />
          <RatingStars rating={rating} size={32} />
        </div>

        <div className="BigSectionsContainer">
          <div className="FirstSectionContainer">
            <div className="flex flex-col gap-5 flex-1">
              <section className="ProductDetailsContentContainer">
                <h3 className="text-2xl font-semibold">Price:</h3>
                <h2 className="text-3xl font-bold mb-2.5">{`${price} EUR`}</h2>
                <h3 className="text-2xl font-semibold">{availabilityStatus}</h3>
              </section>

              <section className="ProductDetailsContentContainer flex-1 ">
                <h3 className="text-2xl font-semibold">Category:</h3>
                <h5 className="text-base">{category}</h5>
                {brand && <h3 className="text-2xl font-semibold">Brand:</h3>}
                {brand && <h5 className="text-base">{brand}</h5>}
                <h3 className="text-2xl font-semibold">Description:</h3>
                <h5 className="text-base">{description}</h5>
              </section>
            </div>

            <ProductDetailsGallery images={images} />
          </div>

          <section className="ProductDetailsContentContainer MaxWidth1220 flex-1">
            <ReviewList reviews={product.reviews} />
          </section>
        </div>
      </div>
      <DummyJsonLink />
    </article>
  );
};

export default ProductDetailsPage;
