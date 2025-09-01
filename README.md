# Technical Test - Customer & Transaction Dashboard

[![React](https://img.shields.io/badge/React-19.1.1-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.12-green.svg)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-7.1.2-yellow.svg)](https://vitejs.dev/)

A Single Page Application (SPA) dashboard for managing customers and transactions built with React, TypeScript, and Tailwind CSS.

## 🚀 Technologies Used

### Frontend Framework

- **React 19.1.1** - JavaScript library for building user interfaces
- **TypeScript 5.8.3** - JavaScript superset with static typing
- **Vite 7.1.2** - Fast build tool for development

### Styling & UI Components

- **Tailwind CSS 4.1.12** - Utility-first CSS framework
- **Shadcn/UI** - Customizable UI components built with Radix UI primitives
- **Lucide React** - Beautiful & consistent icon toolkit

### Form Handling

- **React Hook Form 7.62.0** - Performant forms with easy validation
- **Zod 4.1.4** - TypeScript-first schema validation
- **React Hot Toast** - Beautiful and customizable notifications

### Routing & Navigation

- **React Router DOM 7.8.2** - Routing library for React applications

### Data Visualization

- **Recharts 2.15.4** - Composable charting library for React

### HTTP Client & Utilities

- **Custom useFetch Hook** - Custom hook for data fetching
- **JS Cookie 3.0.5** - API for handling cookies
- **Date-fns 4.1.0** - Utility library for date manipulation
- **CMDK** - Fast, composable, unstyled command menu

## 📋 Implemented Features

### 🔐 Authentication

- [x] **Register** - User registration
- [x] **Login** - Login with email and password
- [x] **Logout** - Sign out from application
- [x] **My Profile** - View and manage user profile
- [x] **Update Password** - Change user password

### 📊 Summary Menu

- [x] **Daily Transactions** - Daily transaction charts
- [x] **Monthly Transactions** - Monthly transaction charts
- [x] **Yearly Transactions** - Yearly transaction charts
- [x] **Top Customers** - Top customers list

### 👥 Customer Menu

- [x] **List All Customers** - Customer table with pagination, search, and filters
- [x] **Customer Detail** - Modal with complete customer information
- [x] **Add Customer** - Form to add new customer
- [x] **Edit Customer** - Form to edit customer data with auto-refresh

### 💰 Transaction Menu

- [x] **List All Transactions** - Transaction table with pagination, search, and filters
- [x] **Transaction Detail** - Complete transaction detail page

## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── container/       # Container components (forms, charts, tables, modals)
│   ├── layouts/         # Layout components
│   └── ui/             # UI primitives (shadcn/ui components)
├── hooks/              # Custom React hooks
├── lib/                # Utilities and configuration
│   ├── api/           # API client functions
│   ├── constants/     # Constants and endpoints
│   ├── context/       # React contexts
│   ├── middleware/    # Route middleware
│   ├── types/         # TypeScript type definitions
│   └── validation/    # Zod schemas
├── pages/              # Page components
├── utils/              # Utility functions
└── assets/             # Static assets
```

## 🛠️ Installation and Running the Project

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

```bash
# Clone repository
git clone [repository-url]
cd technical_tes_dibuiltadi

# Install dependencies
pnpm install
```

### Development

```bash
# Run development server
pnpm dev
```

Application will run at `http://localhost:5173`

## 📱 Responsive Features

This dashboard is fully responsive and works well on:

- 📱 Mobile devices (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large screens (1280px+)


## 🔧 Custom Hooks

- **`useFetch`** - Hook for data fetching with loading states
- **`useDebounce`** - Hook for debouncing input
- **`useDisclosure`** - Hook for modal state management
- **`useMobile`** - Hook for mobile detection

## 📄 API Integration

This dashboard integrates with REST API for:

- Authentication endpoints
- Customer management
- Transaction data
- Summary statistics
- User profile management

## 👨‍💻 Author

**RayhanAsauqi**


