export const fetchProducts = async () => {
    try {
       const response = await fetch('/product.json');
       const data = await response.json();
       return data 
    } catch (error) {
        throw error
    }
}


export const searchProducts = async (query) => {
    try {
      const response = await fetch("/product.json");
      const data = await response.json();
  
      if (!query) return [];
  
      const searchResults = data.filter(
        (product) =>
          product.title.toLowerCase().includes(query.toLowerCase()) ||
          product.shortdesc.toLowerCase().includes(query.toLowerCase()) ||
          product.Decription.toLowerCase().includes(query.toLowerCase())
      );
  
      return searchResults;
    } catch (error) {
      console.error(error);
      return [];
    }
  };


export const getAllCategoriesAndSubCategories = async () => {
    try {
       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category`);
       const data = await response.json();
       return data 
    } catch (error) {
        throw error
    }
}   

export const fetchCategoryProducts = async ({ categoryName = '', subcategoryName = '' }) => {
  try {
    let url;
    
    // Determine the appropriate URL based on the parameters
    if (subcategoryName && subcategoryName !== 'all') {
      // Subcategory products
      url = `${process.env.NEXT_PUBLIC_API_URL}/subcategory/products?subcategory=${
        subcategoryName.toLowerCase().replace(/\s+/g, '-')
      }`;
    } else if (categoryName && categoryName !== 'all' && categoryName !== 'Uncategorized') {
      // Category products
      url = `${process.env.NEXT_PUBLIC_API_URL}/category/products?category=${
        categoryName.toLowerCase().replace(/\s+/g, '-')
      }`;
    } else {
      // All products
      url = `${process.env.NEXT_PUBLIC_API_URL}/product/all`;
    }

    const response = await fetch(url);
    const rawData = await response.json();

    // Normalize the response data
    const products = rawData.data?.products || rawData.data || [];

    return {
      success: rawData.success || rawData.statusCode === 200,
      data: {
        products: products.map(product => ({
          id: product.id,
          title: product.title,
          description: product.description,
          shortDesc: product.shortDesc || product.description,
          price: product.price,
          saleprice: product.salePrice >= 0 ? product.salePrice : null,
          image: product.image,
          slug: product.slug,
          images: Array.isArray(product.images) 
            ? product.images.map(img => typeof img === 'string' ? img : img.url)
            : [],
          categories: Array.isArray(product.categories)
            ? product.categories.map(c => c.category?.name)
            : product.categories?.split(',').map(c => c.trim()) || [],
          subCategories: Array.isArray(product.subCategories)
            ? product.subCategories.map(s => s.subCategory?.name)
            : []
        }))
      },
      message: rawData.message
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return {
      success: false,
      data: { products: [] },
      message: error.message
    };
  }
};


export const submitContactForm = async (formData) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchsingleProduct = async (slug) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/product/${slug}`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch product");
    }

    return data; 
  } catch (error) {
    throw error;
  }
};