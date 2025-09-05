# PallaRajiv Ecommerce Website

A modern, full-stack ecommerce platform built with React, Express, and TypeScript. This project features a complete online shopping experience with product catalog, shopping cart, user authentication, and responsive design.

## 🚀 Features

- **Modern UI/UX**: Clean, responsive design with Tailwind CSS and shadcn/ui components
- **Product Catalog**: Browse products with categories and subcategories
- **Shopping Cart**: Add/remove items with real-time updates
- **User Authentication**: Secure login and registration system
- **Admin Panel**: Manage products and orders (admin users)
- **Search Functionality**: Find products quickly with search
- **Mobile Responsive**: Optimized for all device sizes
- **TypeScript**: Full type safety across the application

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern component library
- **Lucide React** - Beautiful icons

### Backend
- **Express.js** - Node.js web framework
- **TypeScript** - Type-safe server code
- **CORS** - Cross-origin resource sharing

### Development Tools
- **pnpm** - Fast package manager
- **Prettier** - Code formatting
- **ESLint** - Code linting
- **Vitest** - Testing framework

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/RajivRa12/Ecommerce.git
   cd Ecommerce
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080`

## 🏗️ Project Structure

```
├── client/                 # React frontend
│   ├── components/         # Reusable UI components
│   │   ├── ui/            # shadcn/ui components
│   │   ├── Header.tsx     # Navigation header
│   │   ├── Footer.tsx     # Site footer
│   │   └── CartSidebar.tsx # Shopping cart
│   ├── pages/             # Page components
│   │   ├── Index.tsx      # Homepage
│   │   ├── ProductsPage.tsx # Product listing
│   │   ├── ProductDetailPage.tsx # Product details
│   │   ├── CartPage.tsx   # Shopping cart
│   │   ├── LoginPage.tsx  # User login
│   │   └── RegisterPage.tsx # User registration
│   ├── contexts/          # React contexts
│   │   ├── AuthContext.tsx # Authentication state
│   │   └── CartContext.tsx # Shopping cart state
│   └── lib/               # Utility functions
├── server/                # Express backend
│   ├── index.ts          # Server entry point
│   └── routes/           # API routes
├── shared/               # Shared types and utilities
├── public/               # Static assets
│   └── logo.svg          # PallaRajiv logo
└── netlify/              # Deployment configuration
```

## 🎨 Customization

### Branding
The website is branded as "PallaRajiv" with a custom logo. To update branding:

1. **Logo**: Replace `/public/logo.svg` with your logo
2. **Brand Name**: Update references in:
   - `client/components/Header.tsx`
   - `client/components/Footer.tsx`
   - `client/pages/RegisterPage.tsx`

### Styling
- **Colors**: Modify `tailwind.config.ts` for custom color scheme
- **Components**: Customize shadcn/ui components in `client/components/ui/`
- **Global Styles**: Update `client/global.css`

## 🚀 Deployment

### Netlify (Recommended)
1. Connect your GitHub repository to Netlify
2. Set build command: `pnpm build`
3. Set publish directory: `dist/spa`
4. Deploy!

### Manual Deployment
1. **Build the project**
   ```bash
   pnpm build
   ```

2. **Serve the built files**
   ```bash
   pnpm start
   ```

## 📱 Pages & Features

### Homepage (`/`)
- Hero section with featured products
- Category navigation
- Product highlights

### Products (`/products`)
- Product grid with filtering
- Category-based browsing
- Search functionality

### Product Details (`/product/:id`)
- Detailed product information
- Image gallery
- Add to cart functionality
- Related products

### Shopping Cart (`/cart`)
- Review selected items
- Quantity adjustments
- Price calculations
- Checkout process

### User Authentication
- **Login** (`/login`): Existing user authentication
- **Register** (`/register`): New user registration
- **Account Management**: User profile and order history

### Admin Panel (`/admin`)
- Product management
- Order processing
- User management (admin only)

## 🔧 Development

### Available Scripts
- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm test` - Run tests
- `pnpm typecheck` - Type checking

### Code Style
- **Prettier**: Automatic code formatting
- **ESLint**: Code quality checks
- **TypeScript**: Strict type checking

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Palla Rajiv**
- GitHub: [@RajivRa12](https://github.com/RajivRa12)
- Repository: [Ecommerce](https://github.com/RajivRa12/Ecommerce)

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [React](https://reactjs.org/) for the amazing frontend library
- [Express](https://expressjs.com/) for the robust backend framework

---

**PallaRajiv Ecommerce** - Your trusted online shopping destination! 🛒✨
