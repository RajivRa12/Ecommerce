import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ShoppingCart, Truck, Shield, CreditCard, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { mockProducts, mockCategories, getFeaturedProducts } from '@shared/mock-data';
import { Product } from '@shared/types';

export default function Index() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const { addItem } = useCart();

  useEffect(() => {
    setFeaturedProducts(getFeaturedProducts());
  }, []);

  const handleAddToCart = (product: Product) => {
    addItem(product);
  };

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/10 via-purple-50 to-blue-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="secondary" className="w-fit">
                New Collection 2024
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Discover Your
                <span className="text-primary block">Perfect Style</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-lg">
                Shop the latest trends and timeless classics. From premium electronics to stylish furniture, 
                find everything you need with unbeatable quality and service.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link to="/products">
                    Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/deals">View Deals</Link>
                </Button>
              </div>
              
              {/* Stats */}
              <div className="flex items-center gap-8 pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">50K+</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">10K+</div>
                  <div className="text-sm text-gray-600">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">4.8</div>
                  <div className="flex items-center justify-center text-sm text-gray-600">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    Rating
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=400&fit=crop"
                  alt="Featured Product 1"
                  className="rounded-2xl shadow-lg"
                />
                <img
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=400&fit=crop"
                  alt="Featured Product 2"
                  className="rounded-2xl shadow-lg mt-8"
                />
              </div>
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-white p-4 rounded-full shadow-lg">
                <ShoppingCart className="h-6 w-6 text-primary" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-full shadow-lg">
                <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Free Shipping</h3>
              <p className="text-sm text-gray-600">On orders over ₹5000</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Secure Payment</h3>
              <p className="text-sm text-gray-600">100% secure transactions</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Easy Returns</h3>
              <p className="text-sm text-gray-600">30-day return policy</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">24/7 Support</h3>
              <p className="text-sm text-gray-600">Customer service</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our wide range of categories and find exactly what you're looking for
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockCategories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                className="group block"
              >
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold">{category.name}</h3>
                      <p className="text-sm opacity-90">{category.description}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Products</h2>
              <p className="text-gray-600">Handpicked favorites just for you</p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/products">View All</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.originalPrice && (
                      <Badge className="absolute top-2 left-2 bg-red-500">
                        Sale
                      </Badge>
                    )}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                    
                    <div className="flex items-center mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating)
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 ml-2">({product.reviewCount})</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-primary">₹{product.price.toLocaleString('en-IN')}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            ₹{product.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="p-4 pt-0">
                  <Button
                    onClick={() => handleAddToCart(product)}
                    className="w-full"
                    size="sm"
                  >
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to know about new products, 
            exclusive deals, and special offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900"
            />
            <Button variant="secondary" size="lg">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
