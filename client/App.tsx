import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminPage from "./pages/AdminPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import PlaceholderPage from "./pages/PlaceholderPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/search" element={<ProductsPage />} />
              <Route path="/category/:category" element={<ProductsPage />} />
              <Route path="/category/:category/:subcategory" element={<ProductsPage />} />

              {/* Placeholder routes */}
              <Route path="/deals" element={<PlaceholderPage title="Deals & Offers" description="Discover amazing deals and exclusive offers on your favorite products." />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/account" element={<PlaceholderPage title="My Account" description="Manage your account settings, addresses, and preferences." />} />
              <Route path="/orders" element={<PlaceholderPage title="My Orders" description="Track your orders and view order history." />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/contact" element={<PlaceholderPage title="Contact Us" description="Get in touch with our customer service team." />} />
              <Route path="/about" element={<PlaceholderPage title="About Us" description="Learn more about our company and mission." />} />
              <Route path="/shipping" element={<PlaceholderPage title="Shipping Information" description="Learn about our shipping policies and delivery options." />} />
              <Route path="/returns" element={<PlaceholderPage title="Returns & Exchanges" description="Information about our return and exchange policies." />} />
              <Route path="/faq" element={<PlaceholderPage title="FAQ" description="Frequently asked questions and answers." />} />
              <Route path="/privacy" element={<PlaceholderPage title="Privacy Policy" description="Our commitment to protecting your privacy." />} />
              <Route path="/terms" element={<PlaceholderPage title="Terms of Service" description="Terms and conditions for using our service." />} />
              <Route path="/careers" element={<PlaceholderPage title="Careers" description="Explore open positions and join our team." />} />
              <Route path="/press" element={<PlaceholderPage title="Press" description="Media resources and press contacts." />} />
              <Route path="/cookies" element={<PlaceholderPage title="Cookie Policy" description="How we use cookies and your choices." />} />
              <Route path="/safety" element={<PlaceholderPage title="Safety" description="Product and platform safety information." />} />
              <Route path="/accessibility" element={<PlaceholderPage title="Accessibility" description="Accessibility statement and options." />} />

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
