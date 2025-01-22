export const fetchProducts = async () => {
    try {
       const response = await fetch('/product.json');
       const data = await response.json();
       return data 
    } catch (error) {
        throw error
    }
}

export const fetchsingleProduct = async (title) => {
    try {
       const response = await fetch('/product.json');
       const data = await response.json();
       const product = data.find(product => product.title === title)
       return product
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