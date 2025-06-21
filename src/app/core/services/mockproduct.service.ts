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
      discount: 0,
      reviews: [],
      totalQty: 100,
      totalSold: 20,
      _id: '1',
      name: 'Organic Banana',
      description: 'Fresh organic bananas from Ghana.',
      category: 'Fruits',
      subcategory: 'Bananas',
      images: [
        {
          _id: 'img1',
          url: 'https://example.com/banana.jpg',
          alt: 'Organic Banana',
          isPrimary: true,
        },
      ],
      prices: [
        {
          _id: 'price1',
          countryCode: 'GH',
          amount: 10,
          currency: 'GHS',
        },
        {
          _id: 'price2',
          countryCode: 'US',
          amount: 2,
          currency: 'USD',
        },
      ],
      attributes: {
        badges: ['organic'],
        allergens: [],
        _id: 'attr1',
        weight: '1kg',
        ingredients: 'Banana',
        organic: true,
        isNew: true,
      },
      stock: 80,
      sku: 'BANANA-ORG-001',
      isActive: true,
      __v: 0,
      metadata: [],
      qtyLeft: '80',
      totalReviews: 5,
      averageRating: 4.8,
      id: '1',
    },
    {
      inStock: false,
      discount: 5,
      reviews: [],
      totalQty: 50,
      totalSold: 50,
      _id: '2',
      name: 'Almond Milk',
      description: 'Dairy-free almond milk, unsweetened.',
      category: 'Beverages',
      subcategory: 'Milk Alternatives',
      images: [
        {
          _id: 'img2',
          url: 'https://example.com/almondmilk.jpg',
          alt: 'Almond Milk',
          isPrimary: true,
        },
      ],
      prices: [
        {
          _id: 'price3',
          countryCode: 'GH',
          amount: 25,
          currency: 'GHS',
        },
        {
          _id: 'price4',
          countryCode: 'US',
          amount: 5,
          currency: 'USD',
        },
      ],
      attributes: {
        badges: ['vegan', 'dairy-free'],
        allergens: ['almond'],
        _id: 'attr2',
        weight: '1L',
        ingredients: 'Water, Almonds',
        organic: false,
        isNew: false,
      },
      stock: 0,
      sku: 'ALMOND-MILK-001',
      isActive: false,
      __v: 0,
      metadata: [],
      qtyLeft: '0',
      totalReviews: 12,
      averageRating: 4.2,
      id: '2',
    },
  ];

  constructor() {}

  getProducts(filter?: any): Observable<Product[]> {
    return of(this.mockProducts).pipe(delay(800));
  }

  getProduct(id: string): Observable<Product | undefined> {
    const product = this.mockProducts.find((p) => p.id === id);
    return of(product).pipe(delay(500));
  }

  getFeaturedProducts(): Observable<Product[]> {
    const featured = this.mockProducts.filter(
      (p) => p.attributes?.badges?.includes('Bestseller') && p.stock > 0
    );
    return of(featured).pipe(delay(800));
  }

  getNewArrivals(): Observable<Product[]> {
    const newProducts = this.mockProducts.filter(
      (p) =>
        (p.attributes?.badges?.includes('New') || p.attributes?.isNew) &&
        p.stock > 0
    );
    return of(newProducts).pipe(delay(800));
  }

  getPopularProducts(): Observable<Product[]> {
    const popularIds = ['1', '2', '5', '10'];
    const popular = this.mockProducts.filter(
      (p) => popularIds.includes(p.id) && p.stock > 0
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
