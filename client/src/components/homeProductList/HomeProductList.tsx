import './index.css'

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
const products = [
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 2,
    name: 'Classic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Classic Tee in white.",
    price: '$40',
    color: 'White',
  },
  {
    id: 3,
    name: 'Premium Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Premium Tee in navy.",
    price: '$45',
    color: 'Navy',
  },
  {
    id: 4,
    name: 'Vintage Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Vintage Tee in grey.",
    price: '$38',
    color: 'Grey',
  },
  {
    id: 5,
    name: 'Graphic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Graphic Tee in red.",
    price: '$42',
    color: 'Red',
  },
  {
    id: 6,
    name: 'V-Neck Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's V-Neck Tee in blue.",
    price: '$37',
    color: 'Blue',
  },
  {
    id: 7,
    name: 'Sport Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Sport Tee in green.",
    price: '$39',
    color: 'Green',
  },
  {
    id: 8,
    name: 'Long Sleeve Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Long Sleeve Tee in black.",
    price: '$50',
    color: 'Black',
  },
];

export default function HomeProductList() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Trending</h2>

        {/* Horizontal scrollable product container */}
        <div className="mt-6 overflow-x-auto scrollbar-hide">
          <div className="flex space-x-6">
            {products.map((product) => (
              <div key={product.id} className="group relative min-w-[250px]">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    alt={product.imageAlt}
                    src={product.imageSrc}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href={product.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


// export default function HomeProductList() {
//   return (
//     <div className="bg-white">
//       <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
//         <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>

//         <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
//           {products.map((product) => (
//             <div key={product.id} className="group relative">
//               <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
//                 <img
//                   alt={product.imageAlt}
//                   src={product.imageSrc}
//                   className="h-full w-full object-cover object-center lg:h-full lg:w-full"
//                 />
//               </div>
//               <div className="mt-4 flex justify-between">
//                 <div>
//                   <h3 className="text-sm text-gray-700">
//                     <a href={product.href}>
//                       <span aria-hidden="true" className="absolute inset-0" />
//                       {product.name}
//                     </a>
//                   </h3>
//                   <p className="mt-1 text-sm text-gray-500">{product.color}</p>
//                 </div>
//                 <p className="text-sm font-medium text-gray-900">{product.price}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }