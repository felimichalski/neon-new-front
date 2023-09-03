import React from 'react'
import { useNavigate } from 'react-router-dom'

const Product = ({ product }) => {

    const navigate = useNavigate();

    const parsePrice = (price) => {
        const numStr = price.toString();

        const parsedPrice = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

        return parsedPrice;
    }

    return (
        <div
            className="cursor-pointer group relative flex flex-col overflow-hidden rounded-lg bg-white shadow-xl hover:scale-105 transition"
            onClick={() => navigate(`/product/${product.id}`)}
        >
            <div className="w-full aspect-square bg-gray-200">
                <img
                    src={`${process.env.REACT_APP_API_URL}/mediafiles/${product.images[0].key}`}
                    alt={product.title}
                    className="w-full aspect-square object-cover object-center"
                />
            </div>
            <div className="flex flex-1 flex-col space-y-2 p-4">
                <h3 className="text-sm font-medium text-gray-900">
                    <span>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.title}
                    </span>
                </h3>
                <p className="text-sm text-gray-500">{product.description}</p>
                <div className="flex flex-1 flex-col justify-end">
                    {/* <p className="text-sm italic text-gray-500">{product.options}</p> */}
                    <p className="text-base font-medium text-gray-900">${parsePrice(product.price.small)}</p>
                </div>
            </div>
        </div>
    )
}

export default Product