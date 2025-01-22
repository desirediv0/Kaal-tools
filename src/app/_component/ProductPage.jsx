"use client";

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { fetchProducts } from '@/Api';
import { filteredProducts, setProducts, filtersubcategory } from '@/ProductSlicer';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

export default function ProductPage() {
    const dispatch = useDispatch();
    const { filteredProducts: products = [] } = useSelector((state) => state.products || {});

    const [activeCategory, setActiveCategory] = useState('all');
    const [openCategory, setOpenCategory] = useState(null);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const data = await fetchProducts();
                dispatch(setProducts(data));
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        getProducts();
    }, [dispatch]);

    const handleCategory = (category) => {
        setActiveCategory(category);
        dispatch(filteredProducts(category));
    }

    const handlesubCategory = (subcategory) => {
        setActiveCategory(subcategory);
        dispatch(filtersubcategory(subcategory));
    }

    const toggleDropdown = (categoryName, hasSubcategories) => {
        if (!hasSubcategories) {
            handleCategory(categoryName);
            setOpenCategory(null);
        } else {
            setOpenCategory(openCategory === categoryName ? null : categoryName);
        }
    };

    const renderProducts = () => {
        if (!Array.isArray(products)) {
            return <div>No products available</div>;
        }

        return products.map(product => (
            <Link
                href={`/product/${product.title}`}
                key={product?.title}
                className="border rounded-lg p-2  hover:shadow-lg transition-shadow"
            >
                <div className='flex flex-col pb-3 '>
                    <div className='relative border-b'>
                        <Image className="w-full h-full  object-cover" alt={product.title} width={300} height={300} src={product.image} />
                    </div>
                    <h2 className='pt-5 px-4'>{product.title}</h2>
                    <h2 className='pt-2 px-4'>₹{product.price}</h2>
                </div>
            </Link>
        ));
    };

    const category = [
        {
            name: "All",
            activeCategory: "all",
        },
        {
            name: "LATHE ACCESSORIES",
            activeCategory: "Earthmoving Equipment",
            subcategories: ["Motor Grader", "KNURLING TOOL HOLDERS", "TURNING TOOL HOLDERS"]
        },
        {
            name: "MILLING ACCESSORIES",
            activeCategory: "Material Handling Equipment",
            subcategories: ["Forklift Truck", "KNURLING TOOL HOLDERS", "TURNING TOOL HOLDERS"]
        },
        {
            name: "Construction Equipment",
            activeCategory: "Construction Equipment",
            subcategories: ["Concrete Mixers", "Compactors", "Pavers"]
        },
    ];

    return (
        <>
            <div className="w-full flex gap-4 sm:gap-8">
                <section className="lg:w-1/5 w-2/5 flex border-r flex-1 items-center flex-col">
                    <h1 className="md:text-2xl text-lg border-b border-gray-200 flex pl-4 xl:pl-12 w-full sm:justify-start justify-center py-4">Categories:</h1>
                    {category.map((item, index) => (
                        <div key={index} className="w-full">
                            <button
                                onClick={() => toggleDropdown(item.activeCategory, !!item.subcategories)}
                                className={`flex md:text-md text-sm px-4 xl:pl-12 sm:justify-start justify-between items-center py-2 w-full hover:bg-[var(--lightcolor)] ${activeCategory === item.activeCategory ? 'bg-[var(--lightcolor)]' : ''}`}
                            >
                                <span>{item.name}</span>
                                {item.subcategories && (
                                    <div className={`transform transition-transform duration-300 ${openCategory === item.activeCategory ? 'rotate-180' : ''}`}>
                                        <ChevronDown className="h-4 w-4" />
                                    </div>
                                )}
                            </button>
                            {item.subcategories && (
                                <div
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${openCategory === item.activeCategory ? 'max-h-48' : 'max-h-0'}`}
                                >
                                    <div className="bg-gray-50">
                                        {item.subcategories.map((subcategory, subIndex) => (
                                            <button
                                                key={subIndex}
                                                onClick={() => handlesubCategory(subcategory)}
                                                className={`flex md:text-sm text-xs px-4 xl:pl-16 sm:justify-start justify-center py-2 w-full hover:bg-[var(--lightcolor)] ${activeCategory === subcategory ? 'bg-[var(--lightcolor)]' : ''}`}
                                            >
                                                {subcategory}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </section>
                <section className="lg:w-4/5 w-3/5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-8 sm:px-8 gap-4">
                    {renderProducts()}
                </section>
            </div>
        </>
    );
}