# Expense Minder

A web-based application for managing orders between **shopkeepers** and **suppliers**. The system enables shopkeepers to place orders for products, view order history, and manage inventory. Suppliers can receive orders and send updates in real time.

## Features

### Shopkeeper Features
- **Product Order Form**: Shopkeepers can select products and specify the quantity to place an order.
- **Shopping Cart**: Add multiple items to the cart and place orders.
- **Order History**: View past orders and details of each order.
- **Inventory Management**: Manage inventory by updating stock and prices.
- **Bulk Order Upload**: Upload a CSV file to place bulk orders for products.

### Supplier Features
- **Order Reception**: Receive orders from shopkeepers, view product details, and quantities.
- **Order Updates**: Suppliers can confirm the received order and update its status.
- **Invoice Generation**: Generate downloadable invoices with order details and amounts.
- **Payment Tracking**: Track payment statuses and send reminders to shopkeepers.

### Admin Features
- **Add Supplier**: Admin can add new suppliers to the system.
- **Reminders & Notifications**: Automatically send reminders for pending payments via text, email, and WhatsApp.

## Technologies Used
- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **PDF Generation**: jsPDF, jsPDF-AutoTable
- **Real-Time Communication**: Socket.io (for real-time chat and order updates)
- **Authentication**: JWT for secure login and authorization

## Installation

### Clone the repository
```bash
git clone https://github.com/your-username/supplier-order-management.git
cd supplier-order-management

