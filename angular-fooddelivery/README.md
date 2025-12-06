# Food Delivery Angular App

A modern, responsive Angular application for a food delivery service that integrates with the EFCoreWebApi backend.

## Features

- ?? **Authentication**: User registration, login, logout, and password recovery
- ?? **Browse Restaurants**: View all available restaurants
- ?? **Shopping Cart**: Add/remove items, manage quantities
- ?? **Order Management**: Place orders and track order status
- ?? **User Dashboard**: View order history
- ?? **Responsive Design**: Works on desktop, tablet, and mobile devices
- ?? **Modern UI**: Clean and intuitive user interface with smooth animations

## Project Structure

```
src/
??? app/
?   ??? components/          # Reusable components
?   ?   ??? layout.component.ts          # Main layout with navigation
?   ?   ??? home.component.ts            # Home page
?   ?   ??? login.component.ts           # Login page
?   ?   ??? register.component.ts        # Registration page
?   ?   ??? forget-password.component.ts # Password recovery
?   ?   ??? cart.component.ts            # Shopping cart
?   ?   ??? orders.component.ts          # Order history
?   ??? services/            # API services
?   ?   ??? auth.service.ts              # Authentication
?   ?   ??? food-item.service.ts         # Food items
?   ?   ??? cart.service.ts              # Cart management
?   ?   ??? order.service.ts             # Orders
?   ?   ??? restaurant.service.ts        # Restaurants
?   ??? guards/              # Route guards
?   ?   ??? auth.guard.ts                # Authentication guard
?   ??? interceptors/        # HTTP interceptors
?   ?   ??? auth.interceptor.ts          # JWT token injection
?   ??? app.component.ts     # Root component
?   ??? app.routes.ts        # Route configuration
??? main.ts                  # Application entry point
??? index.html               # HTML template
??? styles.scss              # Global styles
```

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Angular CLI (optional, can use `npx ng` instead)

## Installation

1. **Navigate to the Angular project directory:**
   ```bash
   cd angular-fooddelivery
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## Configuration

1. **Update API Base URL** (if needed):
   
   Update the API_URL in these service files if your backend is running on a different port:
   - `src/app/services/auth.service.ts`
   - `src/app/services/food-item.service.ts`
   - `src/app/services/cart.service.ts`
   - `src/app/services/order.service.ts`
   - `src/app/services/restaurant.service.ts`

   Default: `http://localhost:5000/api`

2. **Update CORS settings** in your backend if necessary to allow requests from `http://localhost:4200`

## Development Server

Run the development server:

```bash
npm start
```

or

```bash
ng serve
```

Navigate to `http://localhost:4200/` in your browser. The application will automatically reload if you change any source files.

## Build for Production

Build the project for production:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## API Integration

This application communicates with the following API endpoints:

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - User logout
- `POST /api/auth/forgetpassword` - Password recovery

### Restaurants
- `GET /api/restaurant` - Get all restaurants
- `GET /api/restaurant/{id}` - Get restaurant details

### Food Items
- `GET /api/fooditems` - Get all food items
- `GET /api/fooditems/{id}` - Get food item details
- `GET /api/fooditems/restaurant/{restaurantId}` - Get items by restaurant

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update/{cartItemId}` - Update cart item quantity
- `DELETE /api/cart/remove/{cartItemId}` - Remove item from cart
- `DELETE /api/cart/clear` - Clear cart

### Orders
- `POST /api/order` - Create new order
- `GET /api/order` - Get user's orders
- `GET /api/order/{id}` - Get order details
- `POST /api/order/{id}/cancel` - Cancel order

## Features Breakdown

### Authentication
- Users can register with username, password, and role (Customer/RestaurantOwner)
- Secure login with JWT token handling
- Automatic token refresh using refresh tokens
- Password recovery feature
- Protected routes based on user roles

### Shopping Experience
- Browse restaurants and their food items
- Add items to cart with quantity selection
- View and modify cart contents
- Calculate total with delivery fees
- Checkout with delivery address

### Order Management
- View order history
- Track order status
- Cancel pending orders
- Order details including items and total

## Security Features

- JWT authentication with secure token storage
- HTTP interceptor for automatic token injection
- Auth guard for protected routes
- Role-based access control
- Secure password hashing (handled by backend)

## Responsive Design

The application is fully responsive and works on:
- Desktop (1200px and above)
- Tablet (768px to 1199px)
- Mobile (below 768px)

## Error Handling

- Network error handling
- User-friendly error messages
- Automatic redirect on authentication failure
- Form validation with helpful error messages

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Styling

The application uses:
- SCSS for styling
- CSS Grid and Flexbox for layouts
- CSS animations for smooth transitions
- CSS custom properties for theme colors

## Future Enhancements

- [ ] Food item search and filtering
- [ ] Restaurant search and filtering
- [ ] User profile management
- [ ] Payment gateway integration
- [ ] Real-time order tracking
- [ ] User reviews and ratings
- [ ] Favorites/Wishlist
- [ ] Multiple address management
- [ ] Order history export
- [ ] Admin dashboard
- [ ] Restaurant owner dashboard

## Troubleshooting

### CORS Errors
- Ensure your backend API has CORS enabled
- Update the API_URL to match your backend configuration
- Check browser console for detailed error messages

### Authentication Issues
- Clear browser localStorage and session storage
- Ensure tokens are being stored correctly
- Verify JWT configuration in backend

### Build Issues
- Delete `node_modules` and run `npm install` again
- Clear Angular CLI cache: `ng cache clean`
- Ensure Node.js version compatibility

## License

This project is part of the EFCoreWebApi demonstration.

## Support

For issues or questions, please check:
- The application's error messages
- Browser console for debugging
- Backend API logs for server-side errors

## Contributing

To contribute to this project:
1. Create a feature branch
2. Make your changes
3. Submit a pull request

---

**Happy ordering! ??????**
