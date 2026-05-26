# Admin Dashboard Quick Reference Guide

## Getting Started

### Access the Dashboard
1. Open `admin/index.html` in your browser
2. All data persists in localStorage automatically
3. No login required (authentication can be added later)

## Dashboard Overview (index.html)

### Real-Time Metrics
- **Total Revenue**: Sum of all monthly revenue from dashboardData
- **Total Orders**: Count of all orders from data
- **Active Users**: Count of users with "Active" status
- **Total Vehicles**: Sum of stock across all products

### Charts
- **Revenue Graph**: Monthly revenue trends (line chart)
- **Sales by Category**: Vehicle type distribution (doughnut chart)

### Recent Transactions Table
- Shows last 4 orders
- Click order ID to view full details
- Click "View All" to go to orders page

---

## Inventory Management (products.html)

### Viewing Vehicles
- Table shows: ID, Model, Make, Price, Stock, Status
- Status auto-calculated: In Stock (>2), Low Stock (1-2), Out of Stock (0)

### Adding a Vehicle
1. Click "+ Add New Vehicle" button
2. Fill in: Make, Model, Price, Stock Quantity
3. Click "Add Vehicle"
4. Data saved to localStorage automatically

### Editing a Vehicle
1. Click the **pencil icon** on any vehicle row
2. Update Make, Model, Price, or Stock
3. Click "Save Changes"

### Deleting a Vehicle
1. Click the **trash icon** on any vehicle row
2. Confirm deletion
3. Vehicle removed from inventory

### Duplicating a Vehicle
1. Click the **copy icon** on any vehicle row
2. New vehicle created with Stock = 1
3. Same specs as original

---

## Order Management (orders.html)

### Viewing Orders
- Table shows: Order ID, Date, Customer, Vehicle, Amount, Status
- Click order ID to view full details

### Updating Order Status
- Use dropdown under "Status" column
- Options: Processing, Completed, Cancelled
- Auto-saves to localStorage

### Processing an Order
- Click "Process" button on Processing orders
- Changes status to Completed
- Prints confirmation

### Viewing Order Details
- Click **eye icon** to view full details
- Shows customer info, vehicle, total amount
- Option to send payment reminder email

### Printing Invoice
- Click **print icon** to generate invoice
- (Currently simulated - ready for PDF integration)

---

## Support Tickets (support.html)

### Viewing Tickets
- **Left sidebar**: List of all support tickets
- **Main area**: Full ticket conversation
- Click ticket to open

### Ticket Information
- **Priority**: High (red), Medium (yellow), Low (blue)
- **Status**: Open or Resolved
- **Details**: Customer name, date, subject

### Responding to Tickets
1. Type message in reply box at bottom
2. Click paper plane icon to send
3. Message added to conversation

### Managing Tickets
- **Transfer**: Assign ticket to another agent
- **Close Ticket**: Mark as Resolved
- **Attachments**: Add files, images, or invoices

### Tab Switching
- Click "Active (3)" to show open tickets
- Click "Closed" to show resolved tickets

---

## Financial Management (finance.html)

### Financial Metrics
- **Gross Volume (YTD)**: Total revenue this year
- **Pending Deposits**: Money from incomplete orders
- **Total Refunds**: Amount refunded this year

### Transaction History
- Shows all orders as transactions
- Details: Transaction ID, Date, Customer, Amount, Payment Gateway, Status

### Transaction Status
- **Succeeded**: Paid and complete
- **Pending**: Awaiting payment
- **Refunded**: Refund processed

### Processing Refunds
1. Click "Refund" button on any transaction
2. Confirm refund action
3. Refund initiated
4. Amount moved to "Total Refunds" metric

### Searching Transactions
- Use search box to filter by transaction ID or customer name
- Results update in real-time

---

## User Management (users.html)

### Viewing Users
- Table shows: Name, Email, Role, Registration Date, Status
- Status indicators: Active (green), Inactive (yellow), Banned (red)

### Editing User
1. Click **pencil icon** on user row
2. Update Name, Email, or Status
3. Click "Save Changes"

### Resetting User Password
1. Click **lock icon** on user row
2. Temporary password generated automatically
3. Click to copy password
4. User will be prompted to change on next login

### Banning a User
1. Click **trash icon** on user row
2. Confirm ban action
3. User status changed to "Banned"
4. User loses account access

### Activity Logs
- Bottom section shows recent user management actions
- View who made changes and when

---

## System Settings (settings.html)

### Navigation Tabs

#### General Settings
- Site name and branding
- Contact information
- Email preferences
- Notification settings

#### User Roles
- Define admin levels
- Set permissions
- Manage role types

#### API Keys
- Store API credentials
- Generate new keys
- Revoke old keys

#### Database Management
- **System Health**: Current database status
- **Storage Usage**: How much space is used
- **Backup**: Click "Generate Manual Backup"
- **Restore**: Restore from previous backup

### Saving Settings
1. Make changes in any tab
2. Click "Save Settings" button
3. Settings persisted to localStorage
4. Confirmation message shown

### Discarding Changes
1. Click "Discard Changes"
2. Confirm you want to lose unsaved changes
3. Page reloads to last saved state

---

## Tips & Tricks

### Data Persistence
- All changes auto-save to browser localStorage
- Data persists across page reloads
- Clear browser localStorage to reset all data

### Filtering & Search
- **Products**: Click category/status dropdowns
- **Orders**: Sort by clicking column headers (when implemented)
- **Finance**: Use search box to find transactions
- **Support**: Use Active/Closed tabs

### Quick Actions
- **View Details**: Click on ID/subject links
- **Bulk Edits**: Each item can be edited individually
- **Confirmation Dialogs**: Confirm before deleting

### Mobile Navigation
- Sidebar collapses on mobile
- Click **hamburger menu** to toggle
- All functions work on mobile

### Keyboard Shortcuts
- Tab through form fields
- Enter to submit forms
- Escape to close modals

---

## Common Tasks

### Add a New Car to Inventory
1. Go to Inventory (products.html)
2. Click "+ Add New Vehicle"
3. Fill in details
4. Click "Add Vehicle"

### Process a Customer Order
1. Go to Orders (orders.html)
2. Find order with status "Processing"
3. Click "Process" button
4. Status becomes "Completed"

### Manage Support Ticket
1. Go to Support (support.html)
2. Click ticket in left sidebar
3. Read conversation
4. Type reply and send
5. Click "Close Ticket" when resolved

### Check Financial Status
1. Go to Finance (finance.html)
2. View top metrics for overview
3. Search specific transaction if needed
4. Process refunds as required

### Manage User Accounts
1. Go to Users (users.html)
2. Click pencil to edit user
3. Click lock to reset password
4. Click trash to ban user

---

## Troubleshooting

### Data Not Saving
- Check if localStorage is enabled in browser
- Clear cache and reload
- Verify JavaScript errors in console

### Buttons Not Working
- Refresh page
- Check if admin-app.js loaded correctly
- Verify no JavaScript errors

### Charts Not Showing
- Clear browser cache
- Reload page
- Verify Chart.js CDN is loading

### Modal Not Opening
- Check for JavaScript errors
- Try different browser
- Clear localStorage and reload

---

**Last Updated**: 2024  
**Version**: 1.0
