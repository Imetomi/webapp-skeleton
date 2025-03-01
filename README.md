# Webapp Skeleton

A versatile web application skeleton with built-in features for authentication, payment processing, content management, and user handling. This skeleton provides a solid foundation for building various web applications with a minimalist design approach.

## Features

- **Authentication**: User registration, login, and Google authentication
- **Payment Processing**: Subscription management with Stripe
- **Content Management**: Blog and content features with Strapi CMS
- **User Management**: User profiles, roles, and permissions
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Product-Led Growth**: Free trial without registration

## Tech Stack

### Frontend
- **Framework**: Next.js (TypeScript)
- **UI Components**: Radix UI
- **Styling**: Tailwind CSS
- **Icons**: Lucide.dev

### Backend
- **API Framework**: FastAPI (Python 3.8+)
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

## Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/webapp-skeleton.git
cd webapp-skeleton

# Start all services with Docker
docker-compose up -d
```

Access the applications:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- Strapi CMS: http://localhost:1337
- API Documentation: http://localhost:8000/docs

## Testing Services

Use these curl commands to verify services are running:

```bash
# Test Frontend
curl -I http://localhost:3000

# Test Backend
curl http://localhost:8000

# Test CMS
curl -I http://localhost:1337
```

## Documentation

For detailed setup instructions, manual deployment steps, and troubleshooting, please refer to the [MANUAL.md](MANUAL.md) file.

For project structure and specifications, see [SPECS.md](SPECS.md).

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Strapi](https://strapi.io/)