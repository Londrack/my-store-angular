export interface Product {
    id: string;
    images: string[];
    title: string;
    price: number;
    description: string;
    category: Category;
    taxes?: number;
}

export interface Category{
    id: string;
    name: string;
}

export interface CreateProductDTO extends Omit<Product, 'id' | 'category'>{
    categoryId: number;
}

export interface UpdateProductDTO extends Partial<CreateProductDTO>{}