"use client";

import ProductButton from "./ProductButtons/Index";
import ProductTile from "./ProductTile";

const dummyData = [
  {
    _id: "254114",
    name: "Shirt White",
    description: "White shirt for men formals",
    price: 631,
    category: "men",
    sizes: [{ id: "s", label: "S" }],
    deliveryInfo: "Free Delivery",
    onSale: "yes",
    priceDrop: 21,
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/e-commerce-next-ca242.appspot.com/o/e-commerce%2Fmen_shirt_1.jpg-1702385376104-8zeupxre54?alt=media&token=d5704bbf-407d-40e7-9cd3-de54e8b96d6e",
  },
];
export default function CommonListing() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4 lg:mt-16">
          {dummyData && dummyData.length
            ? dummyData.map((item) => (
                <article
                  className="relative flex flex-col overflow-hidden border cursor-pointer"
                  key={item._id}
                >
                  <ProductTile item={item} />
                  <ProductButton item={item} />
                </article>
              ))
            : null}
        </div>
      </div>
    </section>
  );
}
