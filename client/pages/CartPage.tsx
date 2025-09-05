import { Link } from 'react-router-dom';
import { Minus, Plus, X, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import { mockProducts } from '@shared/mock-data';

export default function CartPage() {
  const { state, removeItem, updateQuantity } = useCart();

  const cartItems = state.items.map(item => {
    const product = mockProducts.find(p => p.id === item.productId);
    return {
      ...item,
      product,
      subtotal: (product?.price || 0) * item.quantity
    };
  });

  const subtotal = cartItems.reduce((sum, item) => sum + item.subtotal, 0);
  const shipping = subtotal > 5000 ? 0 : 499;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="h-12 w-12 text-gray-400" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
          </p>
          
          <div className="space-y-4">
            <Button asChild size="lg" className="w-full">
              <Link to="/products">Continue Shopping</Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Button variant="ghost" className="mb-4" asChild>
          <Link to="/products">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Link>
        </Button>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
        <p className="text-gray-600">{state.itemCount} item{state.itemCount !== 1 ? 's' : ''} in your cart</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-6">
                {item.product && (
                  <div className="flex items-center space-x-4">
                    <Link to={`/product/${item.product.id}`} className="flex-shrink-0">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    </Link>
                    
                    <div className="flex-1 min-w-0">
                      <Link to={`/product/${item.product.id}`}>
                        <h3 className="font-semibold text-gray-900 hover:text-primary transition-colors">
                          {item.product.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-gray-500 mb-2">{item.product.brand}</p>
                      <p className="text-lg font-bold text-primary">₹{item.product.price.toLocaleString('en-IN')}</p>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      {/* Quantity controls */}
                      <div className="flex items-center border rounded-md">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-12 text-center text-sm font-medium">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="h-8 w-8 p-0"
                          disabled={item.quantity >= (item.product.stock || 0)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      {/* Subtotal */}
                      <div className="text-right min-w-[80px]">
                        <p className="font-semibold">₹{item.subtotal.toLocaleString('en-IN')}</p>
                      </div>
                      
                      {/* Remove button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.productId)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    `₹${shipping.toFixed(0)}`
                  )}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span>Tax</span>
                <span>₹{tax.toLocaleString('en-IN')}</span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
              
              {shipping > 0 && (
                <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                  💡 Add ₹{(5000 - subtotal).toLocaleString('en-IN')} more to your order to get free shipping!
                </div>
              )}
              
              <div className="space-y-3 pt-4">
                <Button asChild className="w-full" size="lg">
                  <Link to="/checkout">Proceed to Checkout</Link>
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <Link to="/products">Continue Shopping</Link>
                </Button>
              </div>
              
              {/* Security badges */}
              <div className="text-center text-xs text-gray-500 pt-4">
                <p>🔒 Secure checkout with SSL encryption</p>
                <p>✓ 30-day money-back guarantee</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recommended Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">You might also like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockProducts.slice(0, 4).map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <Link to={`/product/${product.id}`}>
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>
                
                <div className="p-4">
                  <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">₹{product.price.toLocaleString('en-IN')}</span>
                    <Button size="sm">Add to Cart</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
