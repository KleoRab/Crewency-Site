# Crewency Development Guide

This guide provides detailed information for developers working on the Crewency platform.

## 🏗️ Architecture Overview

Crewency is built as a modular SaaS platform with the following key architectural decisions:

### Frontend Architecture
- **Next.js 14** with App Router for server-side rendering and API routes
- **TypeScript** for type safety and better developer experience
- **TailwindCSS** for utility-first styling with custom brand colors
- **Framer Motion** for smooth animations and transitions
- **Modular component structure** for reusability and maintainability

### Backend Architecture
- **Next.js API Routes** for serverless backend functionality
- **Supabase** for database, authentication, and real-time features
- **PostgreSQL** with Row Level Security (RLS) for data protection
- **JWT tokens** for stateless authentication

### Database Design
- **Multi-tenant architecture** with organization-based data isolation
- **Role-based access control** (RBAC) with four user roles
- **Audit logging** for compliance and security tracking
- **Extensible schema** for future module additions

## 📁 Project Structure Deep Dive

```
crewency/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── api/                     # API routes
│   │   │   ├── auth/               # Authentication endpoints
│   │   │   ├── users/              # User management
│   │   │   ├── posts/              # Post management
│   │   │   └── analytics/          # Analytics endpoints
│   │   ├── auth/                   # Auth pages (login, register)
│   │   ├── dashboard/              # Main dashboard
│   │   ├── schedule/               # Scheduling interface
│   │   ├── admin/                  # Admin panel
│   │   └── globals.css             # Global styles
│   ├── components/                 # Reusable UI components
│   │   ├── layout/                # Layout components (Sidebar, Header)
│   │   ├── ui/                    # Basic UI components
│   │   └── forms/                 # Form components
│   ├── modules/                   # Feature modules
│   │   ├── social-manager/        # Social media management
│   │   │   ├── components/        # Module-specific components
│   │   │   ├── pages/            # Module pages
│   │   │   ├── services/         # Social media API services
│   │   │   ├── types/            # Module-specific types
│   │   │   └── utils/            # Module utilities
│   │   └── technician-agent/     # Future MSP module (stub)
│   ├── lib/                      # Shared utilities
│   │   ├── auth/                 # Authentication utilities
│   │   ├── database/             # Database configuration
│   │   └── utils/                # General utilities
│   ├── types/                    # Global TypeScript types
│   └── constants/                # Application constants
├── .env.local.example            # Environment variables template
├── README.md                     # Project overview
└── DEVELOPMENT.md               # This file
```

## 🔧 Development Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- PostgreSQL database (or Supabase account)
- Git

### Local Development

1. **Clone and install**
   ```bash
   git clone <repository-url>
   cd crewency
   npm install
   ```

2. **Environment setup**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your configuration
   ```

3. **Database setup**
   ```bash
   # Run the schema in your PostgreSQL database
   psql -d your_database -f src/lib/database/schema.sql
   
   # Optional: Add seed data
   psql -d your_database -f src/lib/database/seed.sql
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Schema

### Core Tables

#### Organizations
Multi-tenant support with organization-based data isolation.

```sql
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  logo_url VARCHAR(500),
  website VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status account_status DEFAULT 'active'
);
```

#### Users
Role-based user management with organization association.

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  avatar_url VARCHAR(500),
  role user_role DEFAULT 'viewer',
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  -- ... other fields
);
```

#### Social Accounts
OAuth-linked social media accounts for posting.

```sql
CREATE TABLE social_accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  oauth_account_id UUID REFERENCES oauth_accounts(id) ON DELETE CASCADE,
  platform social_platform NOT NULL,
  platform_username VARCHAR(255) NOT NULL,
  -- ... other fields
);
```

### Row Level Security (RLS)

All tables have RLS enabled with policies for data isolation:

```sql
-- Example RLS policy
CREATE POLICY "Users can view their own data" ON users
  FOR ALL USING (auth.uid() = id);
```

## 🔐 Authentication & Authorization

### Authentication Flow
1. User submits credentials via login form
2. Supabase Auth validates credentials
3. JWT token returned and stored
4. User data fetched from users table
5. Role-based permissions applied

### User Roles
- **Owner**: Full access to organization and billing
- **Admin**: Manage users and organization settings
- **Editor**: Create and manage content
- **Viewer**: View content and analytics only

### Permission Checking
```typescript
// Check if user has specific permission
const hasAccess = hasPermission(user.role, 'posts:write');

// Middleware for protected routes
const user = await requirePermission('posts:write');
```

## 🎨 UI/UX Guidelines

### Design System
- **Colors**: Deep-to-light blues from Crewency logo
- **Typography**: Inter font family
- **Spacing**: TailwindCSS spacing scale
- **Components**: Reusable, accessible components

### Component Structure
```typescript
// Example component structure
interface ComponentProps {
  // Props with TypeScript types
}

export default function Component({ prop1, prop2 }: ComponentProps) {
  // Component logic
  return (
    <div className="tailwind-classes">
      {/* JSX content */}
    </div>
  );
}
```

### Animation Guidelines
- Use Framer Motion for smooth transitions
- Keep animations subtle and purposeful
- Respect user's motion preferences
- Test on various devices and browsers

## 🧪 Testing Strategy

### Unit Testing
```bash
# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch
```

### Integration Testing
```bash
# Run integration tests
npm run test:integration
```

### E2E Testing
```bash
# Run end-to-end tests
npm run test:e2e
```

## 📊 API Development

### API Route Structure
```typescript
// app/api/endpoint/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // API logic
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
```

### Error Handling
- Consistent error response format
- Proper HTTP status codes
- Detailed error logging
- User-friendly error messages

### Rate Limiting
```typescript
// Check rate limits
const rateLimit = await checkRateLimit(userId, 'api_call', 100, 60000);
if (!rateLimit.allowed) {
  return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
}
```

## 🔒 Security Best Practices

### Input Validation
```typescript
// Sanitize user input
const sanitizedInput = SecurityUtils.sanitizeInput(userInput);

// Check for malicious patterns
if (SecurityUtils.detectSQLInjection(input)) {
  throw new Error('Invalid input detected');
}
```

### Data Encryption
```typescript
// Encrypt sensitive data
const encryptedData = await EncryptionUtils.encryptData(data, secretKey);

// Decrypt when needed
const decryptedData = await EncryptionUtils.decryptData(encryptedData, secretKey);
```

### Audit Logging
```typescript
// Log all important actions
await createAuditLog(
  userId,
  organizationId,
  'post_created',
  'scheduled_post',
  postId,
  { platform: 'linkedin', scheduledFor: '2024-01-20T10:00:00Z' }
);
```

## 🚀 Deployment

### Environment Variables
```bash
# Production environment variables
NEXT_PUBLIC_SUPABASE_URL=your_production_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your_nextauth_secret
```

### Build Process
```bash
# Build for production
npm run build

# Start production server
npm start
```

### Database Migrations
```bash
# Run database migrations
npm run db:migrate

# Rollback migrations
npm run db:rollback
```

## 📈 Performance Optimization

### Frontend Optimization
- Image optimization with Next.js Image component
- Code splitting and lazy loading
- Bundle analysis and optimization
- CDN for static assets

### Backend Optimization
- Database query optimization
- Caching strategies
- API response compression
- Connection pooling

### Monitoring
- Application performance monitoring
- Error tracking and logging
- Database performance metrics
- User analytics

## 🐛 Debugging

### Development Tools
- Next.js built-in debugging
- React Developer Tools
- Supabase dashboard
- Database query tools

### Common Issues
1. **Authentication errors**: Check Supabase configuration
2. **Database connection**: Verify connection string
3. **CORS issues**: Check API route configuration
4. **Build errors**: Check TypeScript types and imports

### Logging
```typescript
// Use structured logging
console.log('User action:', {
  userId,
  action: 'post_created',
  timestamp: new Date().toISOString(),
  metadata: { platform: 'linkedin' }
});
```

## 🔄 Git Workflow

### Branch Strategy
- `main`: Production-ready code
- `develop`: Integration branch
- `feature/*`: Feature development
- `bugfix/*`: Bug fixes
- `hotfix/*`: Critical production fixes

### Commit Convention
```
type(scope): description

feat(auth): add OAuth2 integration
fix(api): resolve rate limiting issue
docs(readme): update installation guide
```

### Pull Request Process
1. Create feature branch from develop
2. Implement changes with tests
3. Update documentation
4. Create pull request
5. Code review and approval
6. Merge to develop

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🤝 Contributing

1. Read this development guide
2. Set up local development environment
3. Create feature branch
4. Implement changes following guidelines
5. Write tests and documentation
6. Submit pull request

## 📞 Support

- **Technical Issues**: Create GitHub issue
- **Questions**: Ask in team chat
- **Documentation**: Check this guide and README
- **Emergency**: Contact team lead

---

**Happy coding! 🚀**