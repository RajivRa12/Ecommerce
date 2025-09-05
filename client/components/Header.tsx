import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, Heart, LogOut, Settings, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { mockCategories } from '@shared/mock-data';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { state: cartState, toggleCart } = useCart();
  const { state: authState, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4 text-center text-sm">
          Free shipping on orders over ₹5000 | 30-day returns
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/logo.svg" alt="Ecommerce Logo" className="w-8 h-8" />
            <span className="text-xl font-bold text-gray-900">Ecommerce</span>
          </Link>

          {/* Search bar - hidden on mobile */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
              <Button type="submit" size="sm" className="absolute right-1 top-1 h-8 w-8 p-0">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Search icon for mobile */}
            <Button variant="ghost" size="sm" className="md:hidden">
              <Search className="h-5 w-5" />
            </Button>

            {/* Wishlist */}
            <Button variant="ghost" size="sm">
              <Heart className="h-5 w-5" />
            </Button>

            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <User className="h-5 w-5" />
                  {authState.isAuthenticated && (
                    <span className="ml-2 hidden sm:inline text-sm">
                      {authState.user?.firstName}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {authState.isAuthenticated ? (
                  <>
                    <div className="px-2 py-1.5 text-sm font-medium text-gray-900 border-b">
                      {authState.user?.firstName} {authState.user?.lastName}
                    </div>
                    <DropdownMenuItem asChild>
                      <Link to="/account">
                        <Settings className="h-4 w-4 mr-2" />
                        My Account
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/orders">
                        <Package className="h-4 w-4 mr-2" />
                        My Orders
                      </Link>
                    </DropdownMenuItem>
                    {authState.user?.role === 'admin' && (
                      <DropdownMenuItem asChild>
                        <Link to="/admin">
                          <Settings className="h-4 w-4 mr-2" />
                          Admin Panel
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={logout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link to="/login">Sign In</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/register">Create Account</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Cart */}
            <Button variant="ghost" size="sm" onClick={toggleCart} className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartState.itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartState.itemCount}
                </span>
              )}
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile search */}
        <form onSubmit={handleSearch} className="md:hidden mt-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
            <Button type="submit" size="sm" className="absolute right-1 top-1 h-8 w-8 p-0">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>

      {/* Navigation */}
      <nav className="border-t bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8 py-3">
            <Link to="/products" className="text-sm font-medium hover:text-primary transition-colors">
              All Products
            </Link>
            {mockCategories.map((category) => (
              <DropdownMenu key={category.id}>
                <DropdownMenuTrigger asChild>
                  <button className="text-sm font-medium hover:text-primary transition-colors">
                    {category.name}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {category.subcategories.map((subcategory) => (
                    <DropdownMenuItem key={subcategory.id} asChild>
                      <Link to={`/category/${category.slug}/${subcategory.slug}`}>
                        {subcategory.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
            <Link to="/deals" className="text-sm font-medium hover:text-primary transition-colors">
              Deals
            </Link>
          </div>

          {/* Mobile navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 space-y-2">
              <Link
                to="/products"
                className="block py-2 text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                All Products
              </Link>
              {mockCategories.map((category) => (
                <div key={category.id}>
                  <Link
                    to={`/category/${category.slug}`}
                    className="block py-2 text-sm font-medium hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                  {category.subcategories.map((subcategory) => (
                    <Link
                      key={subcategory.id}
                      to={`/category/${category.slug}/${subcategory.slug}`}
                      className="block py-2 pl-4 text-sm text-gray-600 hover:text-primary transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {subcategory.name}
                    </Link>
                  ))}
                </div>
              ))}
              <Link
                to="/deals"
                className="block py-2 text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Deals
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
