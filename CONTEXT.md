1. We are in a dockerized environemnt. 
2. You have to install every new library within the docker containers.
3. You must be very careful abuot what do you use: This is the tech stack and you must use these when implementing something new

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

4. If you see linter errors in the editor that may not be a problem since the editor is not connected to dockerized environment, does not see the installed packages there. 

5. The colors are also specified in the tailwind component. 

6. AGAIN, LINTER ERRORS ARE FINE, DO NOT FIX THEM