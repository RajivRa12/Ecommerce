import { useState, useEffect, useMemo } from 'react';
import { Search, Filter, Grid, List, Star, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { useCart } from '@/contexts/CartContext';
import { mockProducts, mockCategories } from '@shared/mock-data';
import { Product } from '@shared/types';
import { Link, useSearchParams } from 'react-router-dom';

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const { addItem } = useCart();

  const filteredProducts = useMemo(() => {
    let filtered = mockProducts;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product =>
        selectedCategories.includes(product.category)
      );
    }

    // Price filter
    filtered = filtered.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default: // featured
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return filtered;
  }, [searchQuery, selectedCategories, priceRange, sortBy]);

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories(prev => [...prev, categoryId]);
    } else {
      setSelectedCategories(prev => prev.filter(id => id !== categoryId));
    }
  };

  const handleAddToCart = (product: Product) => {
    addItem(product);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 50000]);
    setSearchQuery('');
    setSearchParams({});
  };

  const ProductCard = ({ product }: { product: Product }) => (
    <Card className="group hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        <Link to={`/product/${product.id}`}>
          <div className="aspect-square relative overflow-hidden">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {product.originalPrice && (
              <Badge className="absolute top-2 left-2 bg-red-500">
                Save ₹{(product.originalPrice - product.price).toFixed(0)}
              </Badge>
            )}
            {product.featured && (
              <Badge className="absolute top-2 right-2 bg-primary">
                Featured
              </Badge>
            )}
          </div>
        </Link>
        
        <div className="p-4">
          <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
          <Link to={`/product/${product.id}`}>
            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-primary transition-colors">
              {product.name}
            </h3>
          </Link>
          
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
            <span className={`text-xs px-2 py-1 rounded ${
              product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={() => handleAddToCart(product)}
          className="w-full"
          size="sm"
          disabled={product.stock === 0}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );

  const ProductListItem = ({ product }: { product: Product }) => (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-4">
          <Link to={`/product/${product.id}`} className="flex-shrink-0">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-24 h-24 object-cover rounded"
            />
          </Link>
          
          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-sm text-gray-500">{product.brand}</p>
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-semibold text-gray-900 hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                </Link>
              </div>
              <div className="text-right">
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
            
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
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
              
              <div className="flex items-center space-x-4">
                <span className={`text-xs px-2 py-1 rounded ${
                  product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </span>
                <Button
                  onClick={() => handleAddToCart(product)}
                  size="sm"
                  disabled={product.stock === 0}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">All Products</h1>
        <p className="text-gray-600">Discover our complete collection of premium products</p>
      </div>

      {/* Search and filters bar */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="flex-1">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="name">Name: A to Z</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex border rounded-md">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-r-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Sidebar Filters */}
        <div className={`w-64 space-y-6 ${showFilters ? 'block' : 'hidden'} lg:block`}>
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Filters</h3>
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear All
                </Button>
              </div>
              
              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Categories</h4>
                <div className="space-y-2">
                  {mockCategories.map((category) => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={category.id}
                        checked={selectedCategories.includes(category.slug)}
                        onCheckedChange={(checked) => 
                          handleCategoryChange(category.slug, checked as boolean)
                        }
                      />
                      <label htmlFor={category.id} className="text-sm capitalize">
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Price Range */}
              <div>
                <h4 className="font-medium mb-3">Price Range</h4>
                <div className="px-2">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={50000}
                    step={500}
                    className="mb-4"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Products Grid/List */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              Showing {filteredProducts.length} of {mockProducts.length} products
            </p>
          </div>
          
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No products found matching your criteria</p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </div>
          ) : (
            <div className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-4'
            }>
              {filteredProducts.map((product) =>
                viewMode === 'grid' ? (
                  <ProductCard key={product.id} product={product} />
                ) : (
                  <ProductListItem key={product.id} product={product} />
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
