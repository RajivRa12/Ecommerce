import { useCart } from '@/contexts/CartContext';
import { mockProducts } from '@shared/mock-data';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Minus, Plus, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CartSidebar() {
  const { state, removeItem, updateQuantity, closeCart } = useCart();

  const cartItems = state.items.map(item => {
    const product = mockProducts.find(p => p.id === item.productId);
    return {
      ...item,
      product,
      subtotal: (product?.price || 0) * item.quantity
    };
  });

  const total = cartItems.reduce((sum, item) => sum + item.subtotal, 0);

  return (
    <Sheet open={state.isOpen} onOpenChange={closeCart}>
      <SheetContent side="right" className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Shopping Cart ({state.itemCount})</SheetTitle>
        </SheetHeader>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <p className="text-gray-500 mb-4">Your cart is empty</p>
            <Button asChild onClick={closeCart}>
              <Link to="/products">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            {/* Cart items */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                  {item.product && (
                    <>
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{item.product.name}</h4>
                        <p className="text-primary font-semibold">₹{item.product.price.toLocaleString('en-IN')}</p>
                        
                        {/* Quantity controls */}
                        <div className="flex items-center space-x-2 mt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.productId)}
                          className="h-8 w-8 p-0 text-gray-400 hover:text-red-500"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <p className="text-sm font-semibold mt-2">₹{item.subtotal.toLocaleString('en-IN')}</p>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Cart summary */}
            <div className="border-t pt-4 space-y-4">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
              
              <div className="space-y-2">
                <Button asChild className="w-full" onClick={closeCart}>
                  <Link to="/checkout">Proceed to Checkout</Link>
                </Button>
                <Button variant="outline" asChild className="w-full" onClick={closeCart}>
                  <Link to="/cart">View Cart</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
