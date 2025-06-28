import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class MockProductService {
  private mockProducts: Product[] = [
    {
      inStock: true,
      name: 'Organic Banana',
      description: 'Fresh organic bananas from Ghana.',
      prices: [
        {
          countryCode: 'GH',
          amount: 10,
          discount: 0,
          currency: 'GHS',
        },
        {
          countryCode: 'US',
          amount: 2,
          discount: 0,
          currency: 'USD',
        },
      ],
      images: ['https://example.com/banana.jpg'],
      reviews: [],
      category: 'Fruits',
      categoryId: 'cat1',
      subcategory: 'Bananas',
      quantity: {
        GH: { totalQty: 100, totalSold: 20 },
        US: { totalQty: 50, totalSold: 10 },
      },
      metadata: [],
      attributes: {
        badges: [{ display: 'Organic', value: 'organic' }],
        allergens: [{ display: 'None', value: 'none' }],
        weight: '1',
        weightUnit: 'kg',
        ingredients: [{ display: 'Banana', value: 'banana' }],
        organic: true,
      },
      _id: '',
      brand: '',
      discount: 0,
      user: '',
      url: '',
      __v: 0,
      qtyLeft: null,
      totalReviews: 0,
      averageRating: '',
    },
    {
      inStock: false,
      name: 'Almond Milk',
      description: 'Dairy-free almond milk, unsweetened.',
      prices: [
        {
          countryCode: 'GH',
          amount: 25,
          discount: 5,
          currency: 'GHS',
        },
        {
          countryCode: 'US',
          amount: 5,
          discount: 0,
          currency: 'USD',
        },
      ],
      images: ['https://example.com/almondmilk.jpg'],
      reviews: [],
      category: 'Beverages',
      categoryId: 'cat2',
      subcategory: 'Milk Alternatives',
      quantity: {
        GH: { totalQty: 50, totalSold: 50 },
        US: { totalQty: 30, totalSold: 20 },
      },
      metadata: [],
      attributes: {
        badges: [
          { display: 'Vegan', value: 'vegan' },
          { display: 'Dairy-free', value: 'dairy-free' },
        ],
        allergens: [{ display: 'Almond', value: 'almond' }],
        weight: '1',
        weightUnit: 'L',
        ingredients: [
          { display: 'Water', value: 'water' },
          { display: 'Almonds', value: 'almonds' },
        ],
        organic: false,
      },
      _id: '',
      brand: '',
      discount: 0,
      user: '',
      url: '',
      __v: 0,
      qtyLeft: null,
      totalReviews: 0,
      averageRating: '',
    },
  ];

  constructor() {}

  getProducts(filter?: any): Observable<Product[]> {
    return of(this.mockProducts).pipe(delay(800));
  }

  getProduct(id: string): Observable<Product | undefined> {
    const product = this.mockProducts.find((p) => p._id === id);
    return of(product).pipe(delay(500));
  }

  getFeaturedProducts(): Observable<Product[]> {
    const featured = this.mockProducts.filter(
      (p) =>
        p.attributes?.badges?.find((item) => item.value === 'Bestseller') &&
        p.quantity.GH.totalQty - p.quantity.GH.totalSold > 0
    );
    return of(featured).pipe(delay(800));
  }

  getNewArrivals(): Observable<Product[]> {
    const newProducts = this.mockProducts.filter(
      (p) =>
        p.attributes?.badges?.find(
          (item) => item.value.toLowerCase() === 'new'
        ) && p.quantity.GH.totalQty - p.quantity.GH.totalSold > 0
    );
    return of(newProducts).pipe(delay(800));
  }

  getPopularProducts(): Observable<Product[]> {
    const popularIds = ['1', '2', '5', '10'];
    const popular = this.mockProducts.filter(
      (p) => p.quantity.GH.totalQty - p.quantity.GH.totalSold > 0
    );
    return of(popular).pipe(delay(800));
  }

  searchProducts(term: string): Observable<Product[]> {
    const results = this.mockProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(term.toLowerCase()) ||
        p.description.toLowerCase().includes(term.toLowerCase())
    );
    return of(results).pipe(delay(800));
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    const results = this.mockProducts.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
    return of(results).pipe(delay(800));
  }

  getHomePageContent(countryCode: string): Observable<any> {
    // Simulated home page content that could be different per country
    const content = {
      banners: [
        {
          id: '1',
          title:
            countryCode === 'GH'
              ? 'Authentic Ghanaian Ingredients'
              : 'Discover Global Flavors',
          description:
            countryCode === 'GH'
              ? 'Explore our collection of locally sourced Ghanaian ingredients'
              : 'Experience the finest imported foods from around the world',
          imageUrl:
            countryCode === 'GH'
              ? 'assets/images/banners/ghana-banner.jpg'
              : 'assets/images/banners/global-banner.jpg',
          buttonText: 'Shop Now',
          buttonLink: '/products/category/grocery',
        },
        {
          id: '2',
          title: 'Fresh Baked Goods Daily',
          description:
            'Our artisan bakers create fresh, delicious treats every morning',
          imageUrl: 'assets/images/banners/bakery-banner.jpg',
          buttonText: 'View Bakery',
          buttonLink: '/products/category/bakery',
        },
      ],
      featuredCategories: [
        {
          id: '1',
          name: 'Bakery',
          image: 'assets/images/categories/bakery.jpg',
          link: '/products/category/bakery',
        },
        {
          id: '2',
          name: 'Grocery',
          image: 'assets/images/categories/grocery.jpg',
          link: '/products/category/grocery',
        },
      ],
      specialOffers:
        countryCode === 'GH'
          ? [
              {
                id: '1',
                title: 'Free Delivery in Accra',
                description: 'On orders over GHS 200',
                image: 'assets/images/offers/delivery.jpg',
              },
            ]
          : [
              {
                id: '1',
                title: 'Free Shipping',
                description: 'On orders over $50',
                image: 'assets/images/offers/shipping.jpg',
              },
            ],
    };

    return of(content).pipe(delay(1000));
  }
}
