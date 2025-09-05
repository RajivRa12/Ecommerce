import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Heart, Share2, ShoppingCart, Plus, Minus, Truck, Shield, RotateCcw, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import { mockProducts, getProductById, getReviewsByProductId, getProductsByCategory } from '@shared/mock-data';
import { Product, Review } from '@shared/types';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  useEffect(() => {
    if (id) {
      const foundProduct = getProductById(id);
      if (foundProduct) {
        setProduct(foundProduct);
        setReviews(getReviewsByProductId(id));
        
        // Get related products from same category
        const related = getProductsByCategory(foundProduct.category)
          .filter(p => p.id !== id)
          .slice(0, 4);
        setRelatedProducts(related);
      }
    }
  }, [id]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Link to="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : product.rating;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-primary">Products</Link>
        <span>/</span>
        <Link to={`/category/${product.category}`} className="hover:text-primary capitalize">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      {/* Back button */}
      <Button variant="ghost" className="mb-6" asChild>
        <Link to="/products">
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Link>
      </Button>

      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg border">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {product.images.length > 1 && (
            <div className="flex space-x-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-20 h-20 rounded border-2 overflow-hidden ${
                    selectedImage === index ? 'border-primary' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(averageRating)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-lg font-medium">{averageRating.toFixed(1)}</span>
              <span className="text-gray-600">({reviews.length} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-3xl font-bold text-primary">₹{product.price.toLocaleString('en-IN')}</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-gray-500 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                  <Badge className="bg-red-500">
                    Save ₹{(product.originalPrice - product.price).toFixed(0)}
                  </Badge>
                </>
              )}
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                product.stock > 0
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            </div>

            <p className="text-gray-600 mb-6">{product.description}</p>

            {/* Features */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Key Features:</h3>
              <ul className="space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600">
                    <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium">Quantity:</label>
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="h-10 w-10 p-0"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="h-10 w-10 p-0"
                  disabled={quantity >= product.stock}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button 
                onClick={handleAddToCart} 
                className="flex-1"
                disabled={product.stock === 0}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
              <Button variant="outline" size="icon">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Shipping Info */}
          <Card>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <Truck className="h-4 w-4 mr-3 text-green-600" />
                  <span>Free shipping on orders over ₹5000</span>
                </div>
                <div className="flex items-center text-sm">
                  <RotateCcw className="h-4 w-4 mr-3 text-blue-600" />
                  <span>30-day return policy</span>
                </div>
                <div className="flex items-center text-sm">
                  <Shield className="h-4 w-4 mr-3 text-purple-600" />
                  <span>2-year warranty included</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Product Details Tabs */}
      <Tabs defaultValue="specifications" className="mb-16">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
          <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
        </TabsList>
        
        <TabsContent value="specifications" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Product Specifications</h3>
              {product.specifications ? (
                <div className="space-y-3">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                      <span className="font-medium text-gray-700">{key}:</span>
                      <span className="text-gray-600">{value}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No specifications available for this product.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reviews" className="mt-6">
          <div className="space-y-6">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold">{review.userName}</h4>
                        <div className="flex items-center space-x-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? 'text-yellow-400 fill-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          {review.verified && (
                            <Badge variant="secondary" className="text-xs">
                              Verified Purchase
                            </Badge>
                          )}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <h5 className="font-medium mb-2">{review.title}</h5>
                    <p className="text-gray-600 mb-3">{review.comment}</p>
                    
                    <div className="text-sm text-gray-500">
                      {review.helpful} people found this helpful
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="shipping" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Shipping Information</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Free standard shipping on orders over ₹5000</li>
                    <li>• Standard shipping (5-7 business days): ₹499</li>
                    <li>• Express shipping (2-3 business days): ₹999</li>
                    <li>• Next-day delivery available in select areas: ₹1499</li>
                  </ul>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Returns & Exchanges</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• 30-day return policy for all items</li>
                    <li>• Items must be in original condition and packaging</li>
                    <li>• Free returns for defective or damaged items</li>
                    <li>• Return shipping fee applies for other returns</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Card key={relatedProduct.id} className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <Link to={`/product/${relatedProduct.id}`}>
                    <div className="aspect-square relative overflow-hidden">
                      <img
                        src={relatedProduct.images[0]}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </Link>
                  
                  <div className="p-4">
                    <p className="text-sm text-gray-500 mb-1">{relatedProduct.brand}</p>
                    <Link to={`/product/${relatedProduct.id}`}>
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-primary transition-colors">
                        {relatedProduct.name}
                      </h3>
                    </Link>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary">₹{relatedProduct.price.toLocaleString('en-IN')}</span>
                      <Button size="sm" onClick={() => addItem(relatedProduct)}>
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
