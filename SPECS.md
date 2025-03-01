# ONLY USED FOR LAUNCHING THE PROJECT

## Overview
A versatile web application skeleton with built-in features for authentication, payment processing, content management, and user handling. This skeleton provides a solid foundation for building various web applications with a minimalist design approach.

## Tech Stack

### Frontend
- **Framework**: Next.js (TypeScript)
- **UI Components**: Radix UI
- **Styling**: Tailwind CSS
- **Icons**: Lucide.dev

### Backend
- **API Framework**: FastAPI (Python 3.6+)
- **Database ORM**: SQLAlchemy
- **Database Migrations**: Alembic
- **Package Management**: Poetry
- **CMS**: Strapi
- **Authentication**: Firebase (Google Login)
- **Payment Processing**: Stripe
- **Testing**: pytest

### Hosting & DevOps
- **Containerization**: Docker
- **Cloud Hosting**: Render.com or DigitalOcean
- **Infrastructure as Code**: Terraform
- **Domain Management**: Namecheap

## Project Structure

```
webapp-skeleton/
│
├── frontend/                      # Next.js frontend application
│   ├── .next/                     # Next.js build directory
│   ├── components/                # Reusable UI components
│   │   ├── common/                # Common components (buttons, inputs, etc.)
│   │   ├── layout/                # Layout components (header, footer, etc.)
│   │   ├── auth/                  # Authentication components
│   │   ├── payment/               # Payment-related components
│   │   └── blog/                  # Blog and content components
│   ├── contexts/                  # React contexts for state management
│   ├── hooks/                     # Custom React hooks
│   ├── pages/                     # Next.js pages
│   │   ├── api/                   # API routes
│   │   ├── auth/                  # Authentication pages
│   │   ├── blog/                  # Blog pages
│   │   ├── dashboard/             # User dashboard
│   │   ├── admin/                 # Admin panel
│   │   ├── pricing.tsx            # Pricing page
│   │   └── index.tsx              # Landing page
│   ├── public/                    # Static assets
│   ├── styles/                    # Global styles and Tailwind configuration
│   ├── types/                     # TypeScript type definitions
│   ├── utils/                     # Utility functions
│   ├── next.config.js             # Next.js configuration
│   ├── tailwind.config.js         # Tailwind CSS configuration
│   ├── tsconfig.json              # TypeScript configuration
│   └── package.json               # Frontend dependencies
│
├── backend/                       # FastAPI backend application
│   ├── app/                       # Main application package
│   │   ├── api/                   # API endpoints
│   │   │   ├── auth/              # Authentication endpoints
│   │   │   ├── users/             # User management endpoints
│   │   │   ├── payments/          # Payment-related endpoints
│   │   │   └── blog/              # Blog API endpoints
│   │   ├── core/                  # Core functionality
│   │   │   ├── config.py          # Application configuration
│   │   │   ├── security.py        # Security utilities
│   │   │   └── dependencies.py    # FastAPI dependencies
│   │   ├── db/                    # Database models and utilities
│   │   │   ├── base.py            # Base DB setup
│   │   │   ├── session.py         # DB session management
│   │   │   └── models/            # SQLAlchemy models
│   │   ├── schemas/               # Pydantic schemas
│   │   ├── services/              # Business logic services
│   │   └── main.py                # FastAPI application entry point
│   ├── alembic/                   # Database migrations
│   │   ├── versions/              # Migration versions
│   │   └── env.py                 # Alembic environment
│   ├── tests/                     # pytest test suite
│   │   ├── conftest.py            # Test configuration and fixtures
│   │   ├── api/                   # API endpoint tests
│   │   ├── services/              # Service tests
│   │   └── db/                    # Database tests
│   ├── pyproject.toml             # Poetry dependencies and configuration
│   ├── poetry.lock                # Poetry lock file
│   ├── alembic.ini                # Alembic configuration
│   └── pytest.ini                 # pytest configuration
│
├── cms/                           # Strapi CMS
│   ├── api/                       # Strapi API
│   ├── config/                    # Strapi configuration
│   ├── public/                    # Public assets
│   └── package.json               # CMS dependencies
│
├── infrastructure/                # Infrastructure as code
│   ├── terraform/                 # Terraform configurations
│   │   ├── main.tf                # Main Terraform configuration
│   │   ├── variables.tf           # Terraform variables
│   │   └── outputs.tf             # Terraform outputs
│   └── docker/                    # Docker configurations
│       ├── docker-compose.yml     # Development Docker Compose
│       ├── docker-compose.prod.yml # Production Docker Compose
│       ├── frontend.Dockerfile    # Frontend Docker configuration
│       ├── backend.Dockerfile     # Backend Docker configuration
│       └── cms.Dockerfile         # CMS Docker configuration
│
├── scripts/                       # Utility scripts
│   ├── setup.sh                   # Setup script
│   ├── deploy.sh                  # Deployment script
│   └── seed.py                    # Database seeding script
│
├── .github/                       # GitHub configuration
│   └── workflows/                 # GitHub Actions workflows
│       ├── ci.yml                 # Continuous Integration workflow
│       └── cd.yml                 # Continuous Deployment workflow
│
├── docs/                          # Documentation
│   ├── api/                       # API documentation
│   ├── setup/                     # Setup guides
│   └── development/               # Development guides
│
├── .gitignore                     # Git ignore file
├── README.md                      # Project README
└── LICENSE                        # Project license
```

## Testing Framework

### Backend Testing (pytest)
- **Unit Tests**: Test individual functions and methods
- **Integration Tests**: Test API endpoints and database interactions
- **Fixtures**: Reusable test components and data
- **Mocking**: Mock external services like Firebase and Stripe
- **Coverage**: Track test coverage with pytest-cov

### Test Structure
```
backend/tests/
├── conftest.py                    # Test configuration and shared fixtures
├── api/                           # API endpoint tests
│   ├── test_auth.py               # Authentication endpoint tests
│   ├── test_users.py              # User management endpoint tests
│   ├── test_payments.py           # Payment endpoint tests
│   └── test_blog.py               # Blog API endpoint tests
├── services/                      # Service layer tests
│   ├── test_auth_service.py       # Authentication service tests
│   ├── test_user_service.py       # User service tests
│   ├── test_payment_service.py    # Payment service tests
│   └── test_blog_service.py       # Blog service tests
└── db/                            # Database tests
    └── test_models.py             # Database model tests
```

### Frontend Testing
- **Unit Tests**: Jest for component testing
- **Integration Tests**: React Testing Library
- **End-to-End Tests**: Cypress

### CI/CD Testing Pipeline
- Run backend tests with pytest
- Run frontend tests with Jest
- Generate test coverage reports
- Validate TypeScript types
- Lint code with ESLint and Flake8
- Run end-to-end tests with Cypress

## API Endpoints Overview

### Authentication
- `POST /api/auth/login` - User login with credentials
- `POST /api/auth/google` - Google login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user info

### User Management
- `GET /api/users` - List users (admin only)
- `GET /api/users/{id}` - Get user details
- `POST /api/users` - Create new user
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

### Payment
- `GET /api/payments/plans` - List available plans
- `POST /api/payments/subscribe` - Create subscription
- `GET /api/payments/subscriptions` - Get user subscriptions
- `POST /api/payments/cancel` - Cancel subscription
- `GET /api/payments/invoices` - Get user invoices

### Blog/CMS
- `GET /api/blog/articles` - List blog articles
- `GET /api/blog/articles/{id}` - Get article details
- `POST /api/blog/articles` - Create article (admin)
- `PUT /api/blog/articles/{id}` - Update article (admin)
- `DELETE /api/blog/articles/{id}` - Delete article (admin)

## Development Workflow

1. **Local Development**:
   - Run frontend, backend, and CMS with Docker Compose
   - Hot-reloading for both frontend and backend
   - Local database for development

2. **Testing**:
   - Run pytest for backend tests
   - Run Jest for frontend tests
   - Generate test coverage reports

3. **Deployment Pipeline**:
   - Commit code to trigger CI/CD
   - Run tests and linting
   - Build Docker images
   - Deploy to staging/production using Terraform

4. **Monitoring**:
   - Log management with application logs
   - Error tracking
   - Performance monitoring

## Design Requirements
- Minimalist design with clean typography
- Limited color palette (1 primary color, 1 accent color + neutrals)
- Consistent spacing and layout
- Mobile-responsive

## PLG (Product Led Growth Element)

### Free Trial Without Registration
- Limited but meaningful access to core functionality without creating an account
- Clear value demonstration before asking for user information
- Seamless transition from trial to registration when users hit feature limits

### Implementation Approaches
1. **Interactive Demo Mode**:
   - Allows users to test core features with sample data
   - Session-based storage for temporary user actions
   - Clear CTA to save progress by creating an account

2. **Feature-Limited Free Tier**:
   - Access to basic functionality without registration
   - Premium features shown but locked (with visual indicators)
   - Registration wall only for advanced features

3. **Time-Limited Full Access**:
   - Full product experience for a limited time
   - Browser storage to track usage period
   - Registration prompt before trial expiration

### PLG User Flow
1. User lands on homepage
2. Prominent "Try it now" button (no registration required)
3. Immediate access to core product experience
4. Contextual registration prompts appear when:
   - Trying to save work
   - Accessing premium features
   - Reaching usage limits
5. One-click registration with progress preservation

### Technical Implementation
- Cookie or localStorage to maintain anonymous user state
- Backend support for anonymous sessions with upgrade path
- Feature flags to control access levels
- Clear visual indicators for premium/locked features

### Project Structure Additions
```
webapp-skeleton/
├── frontend/
│   ├── components/
│   │   ├── demo/         # Demo-specific components
│   │   └── upgrade/      # Upgrade prompts and flows
│   └── pages/
│       └── try/          # No-registration demo pages
│
├── backend/
│   └── app/
│       ├── api/
│       │   └── demo/     # Anonymous user endpoints
│       └── services/
│           └── trial/    # Trial management logic
```