import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class MockProductService {
  private mockProducts: Product[] = [
    {
      id: '1',
      name: 'Artisan Sourdough Bread',
      description: 'Handcrafted sourdough bread made with a 24-hour fermentation process for maximum flavor and digestibility. Made with organic flour and our special starter culture.',
      category: 'Bakery',
      subcategory: 'Bread',
      prices: [
        { countryCode: 'GH', amount: 35, currency: 'GHS' },
        { countryCode: 'US', amount: 6.99, currency: 'USD' }
      ],
      images: [
        { id: '1-1', url: 'assets/images/prod-2.png', alt: 'Sourdough Bread', isPrimary: true },
        { id: '1-2', url: 'assets/images/prod-1.png', alt: 'Sliced Sourdough Bread', isPrimary: false }
      ],
      attributes: {
        weight: '500g',
        ingredients: 'Organic white flour, water, salt, sourdough starter',
        organic: true,
        badges: ['Organic'],
        allergens: ['Gluten']
      },
      stock: 15,
      sku: 'BKY-BREAD-001',
      isActive: true,
      createdAt: '2023-05-15T10:30:00Z',
      updatedAt: '2023-05-15T10:30:00Z'
    },
    {
      id: '2',
      name: 'Chocolate Chip Cookies',
      description: 'Soft and chewy cookies loaded with premium chocolate chips. Made fresh daily with real butter and brown sugar for that perfect homemade taste.',
      category: 'Bakery',
      subcategory: 'Cookies',
      prices: [
        { countryCode: 'GH', amount: 25, currency: 'GHS' },
        { countryCode: 'US', amount: 4.99, currency: 'USD' }
      ],
      images: [
        { id: '2-1', url: 'assets/images/prod-3.jpg', alt: 'Chocolate Chip Cookies', isPrimary: true }
      ],
      attributes: {
        weight: '250g (Pack of 6)',
        ingredients: 'Flour, butter, brown sugar, eggs, chocolate chips, vanilla extract, baking soda, salt',
        allergens: ['Gluten', 'Eggs', 'Dairy'],
        badges: ['Bestseller']
      },
      stock: 32,
      sku: 'BKY-COOK-001',
      isActive: true,
      createdAt: '2023-05-16T09:15:00Z',
      updatedAt: '2023-05-16T09:15:00Z'
    },
    {
      id: '3',
      name: 'Organic Quinoa',
      description: 'Premium organic white quinoa. High in protein and containing all nine essential amino acids, quinoa is a versatile superfood perfect for salads, side dishes, or as a rice substitute.',
      category: 'Grocery',
      subcategory: 'Grains',
      prices: [
        { countryCode: 'GH', amount: 65, currency: 'GHS' },
        { countryCode: 'US', amount: 8.99, currency: 'USD' }
      ],
      images: [
        { id: '3-1', url: 'assets/images/prod-1.png', alt: 'Organic Quinoa', isPrimary: true }
      ],
      attributes: {
        weight: '500g',
        organic: true,
        glutenFree: true,
        origin: 'Peru',
        badges: ['Organic', 'Gluten-Free']
      },
      stock: 50,
      sku: 'GRO-GRAIN-001',
      isActive: true,
      createdAt: '2023-05-10T14:20:00Z',
      updatedAt: '2023-05-10T14:20:00Z'
    },
    {
      id: '4',
      name: 'Vanilla Birthday Cake',
      description: 'Celebrate special moments with our classic vanilla birthday cake. Three layers of moist vanilla sponge with creamy vanilla buttercream frosting and colorful sprinkles.',
      category: 'Bakery',
      subcategory: 'Cakes',
      prices: [
        { countryCode: 'GH', amount: 160, currency: 'GHS' },
        { countryCode: 'US', amount: 29.99, currency: 'USD' }
      ],
      images: [
        { id: '4-1', url: 'assets/images/prod-1.png', alt: 'Vanilla Birthday Cake', isPrimary: true },
        { id: '4-2', url: 'assets/images/prod-1.png', alt: 'Vanilla Birthday Cake Slice', isPrimary: false }
      ],
      attributes: {
        weight: '1.2kg',
        ingredients: 'Flour, sugar, butter, eggs, milk, vanilla extract, baking powder, salt, sprinkles',
        allergens: ['Gluten', 'Eggs', 'Dairy'],
        originalPrice: 34.99,
        badges: ['Sale']
      },
      stock: 5,
      sku: 'BKY-CAKE-001',
      isActive: true,
      createdAt: '2023-05-20T11:45:00Z',
      updatedAt: '2023-05-20T11:45:00Z'
    },
    {
      id: '5',
      name: 'Organic Cold-Pressed Coconut Oil',
      description: 'Pure cold-pressed coconut oil made from organic coconuts. Perfect for cooking, baking, or as a natural beauty product for skin and hair care.',
      category: 'Grocery',
      subcategory: 'Oils',
      prices: [
        { countryCode: 'GH', amount: 85, currency: 'GHS' },
        { countryCode: 'US', amount: 12.99, currency: 'USD' }
      ],
      images: [
        { id: '5-1', url: 'assets/images/prod-1.png', alt: 'Coconut Oil', isPrimary: true }
      ],
      attributes: {
        volume: '500ml',
        organic: true,
        vegan: true,
        origin: 'Ghana',
        badges: ['Organic', 'New']
      },
      stock: 25,
      sku: 'GRO-OIL-001',
      isActive: true,
      createdAt: '2023-05-12T16:30:00Z',
      updatedAt: '2023-05-12T16:30:00Z'
    },
    {
      id: '6',
      name: 'Croissant',
      description: 'Authentic French-style croissants made with imported French butter. Flaky, buttery layers with a delicate golden crust. Best enjoyed warm from the oven.',
      category: 'Bakery',
      subcategory: 'Pastries',
      prices: [
        { countryCode: 'GH', amount: 12, currency: 'GHS' },
        { countryCode: 'US', amount: 2.49, currency: 'USD' }
      ],
      images: [
        { id: '6-1', url: 'assets/images/prod-1.png', alt: 'Croissant', isPrimary: true }
      ],
      attributes: {
        weight: '60g',
        ingredients: 'Flour, butter, sugar, yeast, salt, milk',
        allergens: ['Gluten', 'Dairy'],
        originalPrice: 2.99,
        badges: ['Sale']
      },
      stock: 42,
      sku: 'BKY-PAST-001',
      isActive: true,
      createdAt: '2023-05-18T08:00:00Z',
      updatedAt: '2023-05-18T08:00:00Z'
    },
    {
      id: '7',
      name: 'Premium African Black Soap',
      description: 'Traditional handmade black soap from Ghana. Made with locally sourced ingredients including cocoa pod ash, shea butter, and coconut oil. Excellent for all skin types and helps with various skin conditions.',
      category: 'Grocery',
      subcategory: 'Personal Care',
      prices: [
        { countryCode: 'GH', amount: 45, currency: 'GHS' },
        { countryCode: 'US', amount: 9.99, currency: 'USD' }
      ],
      images: [
        { id: '7-1', url: 'assets/images/prod-2.png', alt: 'African Black Soap', isPrimary: true }
      ],
      attributes: {
        weight: '200g',
        organic: true,
        vegan: true,
        handmade: true,
        origin: 'Ghana',
        badges: ['Organic', 'Handmade']
      },
      stock: 30,
      sku: 'GRO-SOAP-001',
      isActive: true,
      createdAt: '2023-05-05T13:10:00Z',
      updatedAt: '2023-05-05T13:10:00Z'
    },
    {
      id: '8',
      name: 'Gluten-Free Blueberry Muffins',
      description: 'Delicious blueberry muffins made with our special gluten-free flour blend. Packed with fresh blueberries and topped with a crunchy streusel topping.',
      category: 'Bakery',
      subcategory: 'Muffins',
      prices: [
        { countryCode: 'GH', amount: 30, currency: 'GHS' },
        { countryCode: 'US', amount: 5.49, currency: 'USD' }
      ],
      images: [
        { id: '8-1', url: 'assets/images/prod-4.jpg', alt: 'Blueberry Muffins', isPrimary: true }
      ],
      attributes: {
        weight: '300g (Pack of 4)',
        ingredients: 'Gluten-free flour blend, sugar, eggs, butter, blueberries, baking powder, vanilla extract, salt',
        allergens: ['Eggs', 'Dairy'],
        glutenFree: true,
        badges: ['Gluten-Free']
      },
      stock: 18,
      sku: 'BKY-MUFF-001',
      isActive: true,
      createdAt: '2023-05-19T10:20:00Z',
      updatedAt: '2023-05-19T10:20:00Z'
    },
    {
      id: '3',
      name: 'Organic Quinoa',
      description: 'Premium organic white quinoa. High in protein and containing all nine essential amino acids, quinoa is a versatile superfood perfect for salads, side dishes, or as a rice substitute.',
      category: 'Grocery',
      subcategory: 'Grains',
      prices: [
        { countryCode: 'GH', amount: 65, currency: 'GHS' },
        { countryCode: 'US', amount: 8.99, currency: 'USD' }
      ],
      images: [
        { id: '3-1', url: 'assets/images/prod-1.png', alt: 'Organic Quinoa', isPrimary: true }
      ],
      attributes: {
        weight: '500g',
        organic: true,
        glutenFree: true,
        origin: 'Peru',
        badges: ['Organic', 'Gluten-Free']
      },
      stock: 50,
      sku: 'GRO-GRAIN-001',
      isActive: true,
      createdAt: '2023-05-10T14:20:00Z',
      updatedAt: '2023-05-10T14:20:00Z'
    },
    {
      id: '3',
      name: 'Organic Quinoa',
      description: 'Premium organic white quinoa. High in protein and containing all nine essential amino acids, quinoa is a versatile superfood perfect for salads, side dishes, or as a rice substitute.',
      category: 'Grocery',
      subcategory: 'Grains',
      prices: [
        { countryCode: 'GH', amount: 65, currency: 'GHS' },
        { countryCode: 'US', amount: 8.99, currency: 'USD' }
      ],
      images: [
        { id: '3-1', url: 'assets/images/prod-1.png', alt: 'Organic Quinoa', isPrimary: true }
      ],
      attributes: {
        weight: '500g',
        organic: true,
        glutenFree: true,
        origin: 'Peru',
        badges: ['Organic', 'Gluten-Free']
      },
      stock: 50,
      sku: 'GRO-GRAIN-001',
      isActive: true,
      createdAt: '2023-05-10T14:20:00Z',
      updatedAt: '2023-05-10T14:20:00Z'
    },
    {
      id: '9',
      name: 'Ghana Single-Origin Coffee Beans',
      description: 'Premium single-origin coffee beans from the highlands of Ghana. Medium roast with notes of chocolate, berries, and a hint of citrus. Sustainably grown and ethically sourced.',
      category: 'Grocery',
      subcategory: 'Coffee',
      prices: [
        { countryCode: 'GH', amount: 55, currency: 'GHS' },
        { countryCode: 'US', amount: 14.99, currency: 'USD' }
      ],
      images: [
        { id: '9-1', url: 'assets/images/prod-3.jpg', alt: 'Coffee Beans', isPrimary: true }
      ],
      attributes: {
        weight: '250g',
        organic: true,
        origin: 'Ghana',
        roastLevel: 'Medium',
        badges: ['Organic', 'Single-Origin'],
        isNew: true
      },
      stock: 0, // Out of stock
      sku: 'GRO-COFF-001',
      isActive: true,
      createdAt: '2023-05-14T15:40:00Z',
      updatedAt: '2023-05-14T15:40:00Z'
    },
    {
      id: '10',
      name: 'Assorted Macaron Box',
      description: 'Elegant box of 12 handcrafted French macarons in six delightful flavors: vanilla, chocolate, raspberry, pistachio, lemon, and salted caramel. Perfect for gifts or special treats.',
      category: 'Bakery',
      subcategory: 'Pastries',
      prices: [
        { countryCode: 'GH', amount: 120, currency: 'GHS' },
        { countryCode: 'US', amount: 24.99, currency: 'USD' }
      ],
      images: [
        { id: '10-1', url: 'assets/images/prod-2.png', alt: 'Assorted Macarons', isPrimary: true }
      ],
      attributes: {
        weight: '180g (Box of 12)',
        ingredients: 'Almond flour, egg whites, sugar, butter, various flavors and colors',
        allergens: ['Nuts', 'Eggs', 'Dairy'],
        glutenFree: true,
        badges: ['Bestseller', 'Gluten-Free']
      },
      stock: 8,
      sku: 'BKY-MACAR-001',
      isActive: true,
      createdAt: '2023-05-17T12:50:00Z',
      updatedAt: '2023-05-17T12:50:00Z'
    }
  ];

  constructor() { }

  getProducts(filter?: any): Observable<Product[]> {
    return of(this.mockProducts).pipe(delay(800));
  }

  

  getProduct(id: string): Observable<Product | undefined> {
    const product = this.mockProducts.find(p => p.id === id);
    return of(product).pipe(delay(500));
  }



  getFeaturedProducts(): Observable<Product[]> {
    const featured = this.mockProducts.filter(p =>
      p.attributes?.badges?.includes('Bestseller') && p.stock > 0
    );
    return of(featured).pipe(delay(800));
  }

  getNewArrivals(): Observable<Product[]> {
    const newProducts = this.mockProducts.filter(p =>
      (p.attributes?.badges?.includes('New') || p.attributes?.isNew) && p.stock > 0
    );
    return of(newProducts).pipe(delay(800));
  }

  getPopularProducts(): Observable<Product[]> {
    const popularIds = ['1', '2', '5', '10'];
    const popular = this.mockProducts.filter(p =>
      popularIds.includes(p.id) && p.stock > 0
    );
    return of(popular).pipe(delay(800));
  }

  searchProducts(term: string): Observable<Product[]> {
    const results = this.mockProducts.filter(p =>
      p.name.toLowerCase().includes(term.toLowerCase()) ||
      p.description.toLowerCase().includes(term.toLowerCase())
    );
    return of(results).pipe(delay(800));
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    const results = this.mockProducts.filter(p =>
      p.category.toLowerCase() === category.toLowerCase()
    );
    return of(results).pipe(delay(800));
  }

  getHomePageContent(countryCode: string): Observable<any> {
    // Simulated home page content that could be different per country
    const content = {
      banners: [
        {
          id: '1',
          title: countryCode === 'GH' ? 'Authentic Ghanaian Ingredients' : 'Discover Global Flavors',
          description: countryCode === 'GH' ?
            'Explore our collection of locally sourced Ghanaian ingredients' :
            'Experience the finest imported foods from around the world',
          imageUrl: countryCode === 'GH' ?
            'assets/images/banners/ghana-banner.jpg' :
            'assets/images/banners/global-banner.jpg',
          buttonText: 'Shop Now',
          buttonLink: '/products/category/grocery'
        },
        {
          id: '2',
          title: 'Fresh Baked Goods Daily',
          description: 'Our artisan bakers create fresh, delicious treats every morning',
          imageUrl: 'assets/images/banners/bakery-banner.jpg',
          buttonText: 'View Bakery',
          buttonLink: '/products/category/bakery'
        }
      ],
      featuredCategories: [
        {
          id: '1',
          name: 'Bakery',
          image: 'assets/images/categories/bakery.jpg',
          link: '/products/category/bakery'
        },
        {
          id: '2',
          name: 'Grocery',
          image: 'assets/images/categories/grocery.jpg',
          link: '/products/category/grocery'
        }
      ],
      specialOffers: countryCode === 'GH' ?
        [
          {
            id: '1',
            title: 'Free Delivery in Accra',
            description: 'On orders over GHS 200',
            image: 'assets/images/offers/delivery.jpg'
          }
        ] :
        [
          {
            id: '1',
            title: 'Free Shipping',
            description: 'On orders over $50',
            image: 'assets/images/offers/shipping.jpg'
          }
        ]
    };

    return of(content).pipe(delay(1000));
  }
}