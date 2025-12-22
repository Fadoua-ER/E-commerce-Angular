import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { GuestGuard } from './guards/guest.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/user/home', pathMatch: 'full' },
  {
    path: 'user',
    children: [
      { path: 'home', loadComponent: () => import('./pages/user/home/home').then(m => m.HomeComponent) },
      { path: 'product/:id', loadComponent: () => import('./pages/user/product-detail/product-detail').then(m => m.ProductDetailComponent) },
      { path: 'category/:id', loadComponent: () => import('./pages/user/category-products/category-products').then(m => m.CategoryProductsComponent) },
      { path: 'search', loadComponent: () => import('./pages/user/search-results/search-results').then(m => m.SearchResultsComponent) },
      { path: 'cart', canActivate: [AuthGuard], loadComponent: () => import('./pages/user/cart/cart').then(m => m.CartComponent) },
      { path: 'wishlist', canActivate: [AuthGuard], loadComponent: () => import('./pages/user/wishlist/wishlist').then(m => m.WishlistComponent) },
      { path: 'checkout', canActivate: [AuthGuard], loadComponent: () => import('./pages/user/checkout/checkout').then(m => m.CheckoutComponent) },
      { path: 'order-history', canActivate: [AuthGuard], loadComponent: () => import('./pages/user/order-history/order-history').then(m => m.OrderHistoryComponent) },
      { path: 'orders/:id', canActivate: [AuthGuard], loadComponent: () => import('./pages/user/orders/orders').then(m => m.OrdersComponent) },
      { path: 'order-success', canActivate: [AuthGuard], loadComponent: () => import('./pages/user/order-success/order-success').then(m => m.OrderSuccessComponent) },
      { path: 'profile', canActivate: [AuthGuard], loadComponent: () => import('./pages/user/profile/profile').then(m => m.ProfileComponent) }
    ]
  },
  {
    path: 'admin',
    canActivate: [AdminGuard],
    children: [
      { path: 'dashboard', loadComponent: () => import('./pages/admin/admin-dashboard/admin-dashboard').then(m => m.AdminDashboardComponent) },
      { path: 'analytics', loadComponent: () => import('./pages/admin/dashboard-analytics/dashboard-analytics').then(m => m.DashboardAnalyticsComponent) },
      { path: 'products', loadComponent: () => import('./pages/admin/products-management/products-management').then(m => m.ProductsManagementComponent) },
      { path: 'product-form', loadComponent: () => import('./pages/admin/product-form/product-form').then(m => m.ProductFormComponent) },
      { path: 'categories', loadComponent: () => import('./pages/admin/categories-management/categories-management').then(m => m.CategoriesManagementComponent) },
      { path: 'users', loadComponent: () => import('./pages/admin/users-management/users-management').then(m => m.UsersManagementComponent) },
      { path: 'user/:id', loadComponent: () => import('./pages/admin/user-detail/user-detail').then(m => m.UserDetailComponent) },
      { path: 'orders', loadComponent: () => import('./pages/admin/orders-management/orders-management').then(m => m.OrdersManagementComponent) },
      { path: 'order/:id', loadComponent: () => import('./pages/admin/orders-detail/orders-detail').then(m => m.OrdersDetailComponent) },
      { path: 'reviews', loadComponent: () => import('./pages/admin/reviews-management/reviews-management').then(m => m.ReviewsManagementComponent) }
    ]
  },
  { path: 'login', canActivate: [GuestGuard], loadComponent: () => import('./pages/user/login/login').then(m => m.LoginComponent) },
  { path: 'register', canActivate: [GuestGuard], loadComponent: () => import('./pages/user/register/register').then(m => m.RegisterComponent) },
  { path: 'admin-login', canActivate: [GuestGuard], loadComponent: () => import('./pages/admin/admin-login/admin-login').then(m => m.AdminLoginComponent) },
  { path: 'loading', loadComponent: () => import('./pages/loading/loading').then(m => m.LoadingComponent) },
  { path: 'unauthorized', loadComponent: () => import('./pages/unauthorized/unauthorized').then(m => m.UnauthorizedComponent) },
  { path: '**', loadComponent: () => import('./pages/not-found/not-found').then(m => m.NotFoundComponent) }
];
