import { useEffect, useState } from "react";
import Product from "../Product/new";
import { Carousel } from "@mantine/carousel";

const FeaturedProducts = () => {

    const [products, setProducts] = useState(undefined)

    useEffect(() => {
        async function loadProducts() {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/products/featured`, {
                    mode: 'cors'
                })
                const data = await response.json();

                setProducts(data)
            } catch (error) {
                console.error(error)
            }
        }

        loadProducts();
    }, [])

    return (
        <div className="relative">
            <div className="w-full z-2 relative">
                <div className="max-w-3xl px-4 sm:px-6 lg:px-8">
                    <p className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Nuestros Destacados</p>
                    <h2 id="features-heading" className="mt-2 font-medium text-gray-500">
                        Los más pedidos
                    </h2>
                </div>

                <Carousel
                    align='start'
                    loop='true'
                    slideSize='20%'
                    slidesToScroll={1}
                    dragFree
                    slideGap={20}
                    styles={{
                        viewport: {
                            padding: '40px'
                        },
                        control: {
                            backgroundColor: 'white !important'
                        }
                    }}
                    breakpoints={[
                        { maxWidth: 'md', slideSize: '25%' },
                        { maxWidth: 'sm', slideSize: '50%' },
                    ]}
                    className="w-full"
                >
                    {products && products.map((product, index) => (
                        <Carousel.Slide key={index}>
                            <Product product={product} />
                        </Carousel.Slide>
                    ))}
                </Carousel>
            </div>
            <div
                className="absolute z-1 inset-x-0 -top-16 flex transform-gpu justify-center overflow-hidden blur-3xl"
                aria-hidden="true"
            >
                <div
                    className="aspect-[1318/752] w-[82.375rem] flex-none bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-25"
                    style={{
                        clipPath:
                            'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
                    }}
                />
            </div>
        </div>
    )
}

export default FeaturedProducts;