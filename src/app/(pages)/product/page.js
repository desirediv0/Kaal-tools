import ProductPage from '@/app/_component/ProductPage'
import React from 'react'

export default function Page({ searchParams }) {

  return (
    <ProductPage
      initialCategory={searchParams.category}
      initialSubCategory={searchParams.subcategory}
    />
  );
}