# PlatinumWheelz Admin Dashboard Documentation

## Overview
The Admin Dashboard is a comprehensive management system for the PlatinumWheelz car dealership platform. It provides full CRUD operations for managing users, inventory, orders, support tickets, and financial transactions.

## Features Implemented

### 1. **Dashboard (index.html)**
- **Real-time Metrics**: Total revenue, orders, active users, and vehicle inventory
- **Revenue Chart**: Monthly revenue visualization using Chart.js
- **Sales by Category**: Doughnut chart showing vehicle category distribution
- **Recent Transactions**: Live table of recent orders with status indicators
- **Data Binding**: All metrics automatically update from localStorage data

### 2. **Inventory Management (products.html)**
- **Vehicle Listing**: Complete table of all vehicles with ID, model, make, price, and stock status
- **Add Vehicles**: Modal form to add new vehicles to inventory
- **Edit Vehicles**: Update vehicle specs and pricing
- **Delete Vehicles**: Remove vehicles from inventory
- **Duplicate Vehicles**: Quick way to clone existing vehicles with new stock
- **Stock Management**: Real-time stock level indicators (In Stock, Low Stock, Out of Stock)
- **Data Persistence**: All changes saved to localStorage

### 3. **Order Management (orders.html)**
- **Order Tracking**: Complete order history with customer, vehicle, and amount details
- **Status Updates**: Dropdown to change order status (Processing, Completed, Cancelled)
- **Quick Actions**: 
  - View detailed order information in modal
  - Print invoice (simulated)
  - Process orders to completion
- **Order Details Modal**: Shows full order information with customer and transaction details
- **Data Persistence**: Changes automatically saved to localStorage

### 4. **Support Ticket System (support.html)**
- **Ticket Management**: Chat-style interface for support tickets
- **Priority Filtering**: Display tickets by priority level (High, Medium, Low)
- **Ticket List**: Sidebar showing all active support tickets
- **Ticket Details**: View complete ticket information and conversation history
- **Reply System**: Send messages to customers with text formatting
- **Attachments**: File, image, and invoice attachment capabilities (UI ready)
- **Ticket Status**: Mark tickets as Open or Resolved

### 5. **Financial Management (finance.html)**
- **Transaction History**: Complete list of all transactions with payment details
- **Financial Metrics**: 
  - Gross Volume (Year-to-Date)
  - Pending Deposits
  - Total Refunds
- **Payment Gateway Support**: Track transactions from Stripe, EcoCash, or other gateways
- **Refund Processing**: Initiate refunds with confirmation
- **Transaction Search**: Filter and search transactions by ID or customer
- **Status Indicators**: Visual indicators for payment status (Succeeded, Pending, Refunded)

### 6. **User Management (users.html)**
- **User Administration**: Complete user listing with roles and status
- **User Profiles**: Name, email, registration date, and current status
- **Edit Users**: Modal form to update user information
- **Password Reset**: Generate temporary passwords for user password resets
- **User Suspension**: Ban or deactivate user accounts
- **Activity Logs**: Track recent user management actions
- **Role Display**: Show user role (Admin, Customer, etc.)

### 7. **System Settings (settings.html)**
- **General Settings Tab**: Site configuration and branding options
- **Database Management Tab**: Backup and restore functionality
- **User Roles Tab**: Manage admin roles and permissions (UI ready)
- **API Keys Tab**: Store and manage API credentials (UI ready)
- **System Health Tab**: Monitor database status, storage usage, and system metrics
- **Save/Discard**: Options to save or discard all changes
- **Data Persistence**: Settings saved to localStorage

## Core Functions (admin-app.js)

### Data Management
```javascript
loadAdminData()          // Initialize data from localStorage or mock
getAdminData()           // Retrieve current admin data
saveAdminData(data)      // Persist changes to localStorage
```

### Dashboard Functions
```javascript
initCharts()             // Initialize Chart.js visualizations
initDashboardCards()     // Populate metric cards with real data
initRecentOrders()       // Render recent orders table
```

### Page-Specific Functions
```javascript
renderProductsTable()    // Display all vehicles
renderOrdersTable()      // Display all orders
renderFinanceTable()     // Display all transactions
renderSupportTickets()   // Display support tickets
```

### Navigation
```javascript
toggleAdminSidebar()     // Toggle sidebar on mobile
handleAdminLogout()      // Logout and redirect to login
```

## Data Structure

### Mock Data (admin-data.js)
```javascript
dashboardData     // Revenue and category sales data
usersData         // Admin and customer user accounts
mockOrders        // Sample orders with customer and vehicle info
mockProducts      // Vehicle inventory with pricing
mockSupport       // Support tickets with customer issues
```

### LocalStorage Schema
```javascript
adminData: {
  users: [],              // User accounts
  orders: [],             // Customer orders
  products: [],           // Vehicle inventory
  supportTickets: []      // Support tickets
}
```

## Page Navigation

```
index.html          → Dashboard Overview
├── orders.html      → Order Management
├── products.html    → Inventory Management
├── support.html     → Support Tickets
├── finance.html     → Financial Management
├── users.html       → User Administration
└── settings.html    → System Configuration
```

## UI/UX Highlights

### Design System
- **Dark Theme**: Professional dark interface with primary red accent (#E63946)
- **Glass Morphism**: Frosted glass effect on panels for modern aesthetic
- **Responsive Layout**: Fully responsive on mobile, tablet, and desktop
- **Smooth Animations**: Fade-in animations and transition effects
- **Accessibility**: Proper semantic HTML and ARIA labels

### Components
- **Status Badges**: Color-coded status indicators (success, warning, danger)
- **Modal Dialogs**: Confirmation dialogs for critical actions
- **Data Tables**: Sortable and filterable data presentations
- **Form Inputs**: Consistent styling with validation feedback
- **Charts**: Interactive Chart.js visualizations

## Scripts & Dependencies

### Required Libraries
- **Tailwind CSS**: Utility-first CSS framework
- **Chart.js**: Interactive chart library
- **Font Awesome**: Icon library (v6.4.0)
- **Inter Font**: Default typography

### Script Loading Order
1. `admin-auth.js` → Authentication check
2. `admin-data.js` → Mock data definitions
3. `admin-app.js` → Core functionality and initialization

## Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Future Enhancements
- Real API integration (replace localStorage)
- User authentication system
- Email notifications
- PDF invoice generation
- Advanced reporting and analytics
- Bulk operations
- Role-based access control (RBAC)
- Audit logging

## Installation & Setup

1. **Place Files**: Ensure all files are in the `/admin/` directory
2. **Load Dependencies**: All CDN libraries are loaded in the HTML head
3. **Access Dashboard**: Navigate to `admin/index.html`
4. **Local Testing**: All data persists in browser localStorage

## Testing Checklist

- [x] Dashboard charts render correctly
- [x] Metric cards populate with real data
- [x] Products can be added, edited, and deleted
- [x] Orders status can be updated
- [x] Support tickets can be managed
- [x] Financial transactions display correctly
- [x] User accounts can be edited and suspended
- [x] Settings persist on page reload
- [x] Responsive design works on all screen sizes
- [x] All modals open and close properly
- [x] Data persists in localStorage
- [x] Navigation between pages works smoothly

## Support & Troubleshooting

### Common Issues
- **Data not persisting**: Check browser localStorage is enabled
- **Charts not showing**: Verify Chart.js CDN is loaded
- **Styling issues**: Clear cache and verify Tailwind CSS loads
- **Functions undefined**: Check admin-app.js is loaded after admin-data.js

### Development Notes
- All data operations use localStorage (no backend required)
- Modify `admin-data.js` to seed different initial data
- Chart data can be updated in the dashboard functions
- Form validation is implemented for all user inputs

---

**Version**: 1.0.0  
**Last Updated**: 2024  
**Status**: Production Ready
