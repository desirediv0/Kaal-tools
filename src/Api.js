export const fetchProducts = async () => {
  try {
    const response = await fetch("/product.json");
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
export const fetchSalers = async () => {
  try {
    const response = await fetch("/saler.json");
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const searchProducts = async (query) => {
  try {
    if (!query?.trim()) return [];

    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL
      }/product/user-search?q=${encodeURIComponent(query.trim())}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Search failed");
    }

    const data = await response.json();
    // Return the message array which contains products
    return data.success && Array.isArray(data.message) ? data.message : [];
  } catch (error) {
    console.error("Search failed:", error);
    return [];
  }
};

export const getAllCategoriesAndSubCategories = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category`);
    const data = await response.json();

    // Handle the new paginated response structure
    if (data.success && data.data && data.data.categories) {
      return {
        success: true,
        data: data.data.categories, // Return just the categories array
      };
    }

    // Fallback for old structure or error
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return {
      success: false,
      data: [],
    };
  }
};

export const getSubcategoriesByCategory = async (categoryName) => {
  try {
    const encodedCategory = encodeURIComponent(
      categoryName.toLowerCase().trim()
    );
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/subcategory/by-category?category=${encodedCategory}`,
      {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching subcategories by category:", error);
    return {
      success: false,
      data: { subcategories: [] },
      message: error.message,
    };
  }
};

export const getSubcategoryInfoByName = async (subcategoryName) => {
  try {
    console.log("Searching for subcategory:", subcategoryName);
    
    // First get all subcategories to find the one with matching name
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/subcategory`,
      {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );
    const data = await response.json();

    if (data.success && data.data) {
      // Normalize the search name (handle URL encoding and formatting)
      const normalizedSearchName = decodeURIComponent(subcategoryName)
        .toLowerCase()
        .trim()
        .replace(/-/g, " ")
        .replace(/\s+/g, " ");

      console.log("Normalized search name:", normalizedSearchName);

      // Find the subcategory with matching name using multiple matching strategies
      let subcategory = data.data.find(
        (sub) => sub.name.toLowerCase().trim() === normalizedSearchName
      );

      // If exact match not found, try partial matching
      if (!subcategory) {
        subcategory = data.data.find(
          (sub) =>
            sub.name.toLowerCase().trim().includes(normalizedSearchName) ||
            normalizedSearchName.includes(sub.name.toLowerCase().trim())
        );
      }

      // If still not found, try normalized matching
      if (!subcategory) {
        const cleanSearchName = normalizedSearchName
          .replace(/[^a-z0-9\s]/g, "")
          .trim();
        subcategory = data.data.find((sub) => {
          const cleanSubName = sub.name
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, "")
            .trim();
          return cleanSubName === cleanSearchName;
        });
      }

      // If still not found, try URL-encoded matching
      if (!subcategory) {
        const urlEncodedName = encodeURIComponent(subcategoryName.toLowerCase());
        subcategory = data.data.find((sub) => {
          const encodedSubName = encodeURIComponent(sub.name.toLowerCase());
          return encodedSubName === urlEncodedName;
        });
      }

      if (subcategory) {
        console.log("Found subcategory:", subcategory.name);
        // Get detailed info including parent category
        const detailResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/subcategory/${subcategory.id}`,
          {
            headers: {
              "Cache-Control": "no-cache, no-store, must-revalidate",
              Pragma: "no-cache",
              Expires: "0",
            },
          }
        );
        const detailData = await detailResponse.json();
        return detailData;
      } else {
        console.log("Subcategory not found in API response");
        console.log("Available subcategories:", data.data.map(sub => sub.name));
      }
    }

    return {
      success: false,
      data: null,
      message: "Subcategory not found",
    };
  } catch (error) {
    console.error("Error fetching subcategory info:", error);
    return {
      success: false,
      data: null,
      message: error.message,
    };
  }
};

export const submitContactForm = async (formData) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchsingleProduct = async (slug) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/product/product/${slug}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    try {
      return JSON.parse(text);
    } catch (e) {
      console.error("JSON Parse Error:", text);
      throw new Error("Invalid response format from server");
    }
  } catch (error) {
    console.error("Fetch Error:", error);
    throw error;
  }
};

export const fetchCategoryProducts = async ({
  categoryName = "",
  subcategoryName = "",
}) => {
  try {
    let url;
    const timestamp = Date.now();

    if (subcategoryName && subcategoryName !== "all") {
      // Properly encode the subcategory name for URL
      const encodedSubcategory = encodeURIComponent(
        subcategoryName.toLowerCase().trim()
      );

      url = `${process.env.NEXT_PUBLIC_API_URL}/subcategory/products?subcategory=${encodedSubcategory}&_t=${timestamp}`;

      const response = await fetch(url, {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      });
      const rawData = await response.json();

      // If subcategory has no products, return empty array
      if (!rawData.success || !rawData.data?.products?.length) {
        return {
          success: false,
          data: { products: [] },
          message: "No products found in this subcategory",
        };
      }

      return normalizeProductData(rawData);
    }

    // If no subcategory or subcategory is 'all', fetch category products
    if (categoryName && categoryName !== "all") {
      // Properly encode the category name for URL
      const encodedCategory = encodeURIComponent(
        categoryName.toLowerCase().trim()
      );

      url = `${process.env.NEXT_PUBLIC_API_URL}/category/products?category=${encodedCategory}&_t=${timestamp}`;
    } else {
      url = `${process.env.NEXT_PUBLIC_API_URL}/product/all?_t=${timestamp}`;
    }

    const response = await fetch(url, {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
    const rawData = await response.json();
    return normalizeProductData(rawData);
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      success: false,
      data: { products: [] },
      message: error.message,
    };
  }
};

// Helper function to normalize product data
const normalizeProductData = (rawData) => {
  if (!rawData || (!rawData.data?.products && !Array.isArray(rawData.data))) {
    console.warn("Unexpected data format received:", rawData);
    return {
      success: false,
      data: { products: [] },
      message: "Invalid data format received",
    };
  }

  const products = rawData.data?.products || rawData.data || [];

  return {
    success: rawData.success || rawData.statusCode === 200,
    data: {
      products: products.map((product) => ({
        id: product.id,
        title: product.title || "Unnamed Product",
        description: product.description || "",
        shortDesc: product.shortDesc || product.description || "",
        price: product.price,
        saleprice: product.salePrice >= 0 ? product.salePrice : null,
        image: product.image || "",
        slug: product.slug || "",
        images: Array.isArray(product.images)
          ? product.images.map((img) =>
              typeof img === "string" ? img : img.url || ""
            )
          : [],
        categories: Array.isArray(product.categories)
          ? product.categories.map((c) => c.category?.name || "Uncategorized")
          : product.categories?.split(",").map((c) => c.trim()) || [],
        subCategories: Array.isArray(product.subCategories)
          ? product.subCategories.map((s) => s.subCategory?.name || "")
          : [],
      })),
    },
    message: rawData.message || "Products fetched successfully",
  };
};
