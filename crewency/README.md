# Crewency - Modular SaaS Platform

A modern, modular SaaS platform built with Next.js and TypeScript. Starting with an AI-powered Social Media Manager for SMBs and agencies, with plans to expand into additional business modules.

## 🚀 Features

### Social Media Manager Module (Current)
- **AI Content Generation**: Generate engaging captions, hashtags, and content ideas
- **Multi-Platform Scheduling**: Schedule posts across Facebook, LinkedIn, Twitter, Instagram, and more
- **Advanced Analytics**: Track performance, engagement, and growth with detailed insights
- **Team Collaboration**: Manage multiple users and clients with role-based permissions
- **Visual Calendar**: Intuitive calendar interface for content planning
- **Content Types**: Support for text, image, and video posts

### Planned Modules
- **Technician Agent**: AI-powered IT support and technician services for MSPs
- **Additional modules** will be added based on user needs and market demand

## 🏗️ Architecture

### Frontend
- **Next.js 15** with App Router
- **TypeScript** for type safety
- **TailwindCSS** for styling with custom design system
- **Framer Motion** for smooth animations
- **Heroicons** for consistent iconography

### Backend
- **Next.js API Routes** for serverless functions
- **PostgreSQL** database via Supabase
- **NextAuth.js** for authentication
- **OAuth2** integration for social account linking

### Modular Structure
```
src/
├── modules/
│   ├── social-manager/     # Current module
│   │   ├── pages/         # React components
│   │   └── services/      # API integrations
│   └── technician-agent/  # Future module (stub)
├── components/            # Shared UI components
├── lib/                   # Utilities and configurations
└── types/                 # TypeScript definitions
```

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- PostgreSQL database (or Supabase account)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd crewency
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure the following variables:
   ```env
   # Database
   DATABASE_URL=your_postgresql_url
   
   # Authentication
   NEXTAUTH_SECRET=your_secret_key
   NEXTAUTH_URL=http://localhost:3000
   
   # Social Media APIs
   FACEBOOK_APP_ID=your_facebook_app_id
   FACEBOOK_APP_SECRET=your_facebook_app_secret
   LINKEDIN_CLIENT_ID=your_linkedin_client_id
   LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret
   TWITTER_CLIENT_ID=your_twitter_client_id
   TWITTER_CLIENT_SECRET=your_twitter_client_secret
   INSTAGRAM_APP_ID=your_instagram_app_id
   INSTAGRAM_APP_SECRET=your_instagram_app_secret
   ```

4. **Set up the database**
   ```bash
   npm run db:setup
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Available Pages

### Public Pages
- **Home** (`/`) - Landing page with features and pricing
- **Login** (`/auth/login`) - User authentication
- **Register** (`/auth/register`) - User registration

### Dashboard Pages
- **Dashboard** (`/dashboard`) - Main social media dashboard
- **Schedule** (`/schedule`) - Content scheduling calendar
- **Admin** (`/admin`) - Admin dashboard for user management

## 🎨 Design System

### Colors
- **Primary**: Deep to light blues (#1e40af to #dbeafe)
- **Secondary**: Grays and neutrals
- **Accent**: Platform-specific colors for social media

### Components
- Consistent button styles and form elements
- Responsive grid layouts
- Smooth animations and transitions
- Accessible design patterns

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

### Code Structure
- **Components**: Reusable UI components in `/components`
- **Modules**: Feature-specific code in `/modules`
- **Types**: TypeScript definitions in `/types`
- **Utils**: Helper functions in `/lib`

### Adding New Modules
1. Create a new folder in `/src/modules/`
2. Follow the established structure:
   ```
   module-name/
   ├── pages/        # React components
   ├── services/     # API integrations
   └── README.md     # Module documentation
   ```
3. Update the main navigation to include the new module
4. Add module-specific routes in the app directory

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on every push to main branch

### Other Platforms
- **AWS**: Use AWS Amplify or custom serverless setup
- **Netlify**: Configure for Next.js static export
- **Docker**: Use the included Dockerfile for containerized deployment

## 📊 Database Schema

### Core Tables
- **users**: User accounts and profiles
- **organizations**: Company/agency information
- **social_accounts**: Connected social media accounts
- **scheduled_posts**: Content scheduling data
- **analytics**: Performance metrics and insights

### Sample Data
Use the provided seed scripts to populate the database with sample data:
```bash
npm run db:seed
```

## 🔐 Security

- **Authentication**: Secure JWT-based authentication
- **Authorization**: Role-based access control (RBAC)
- **Data Encryption**: All sensitive data encrypted at rest
- **API Security**: Rate limiting and input validation
- **GDPR Compliance**: Built-in privacy controls

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the `/docs` folder for detailed guides
- **Issues**: Report bugs and request features via GitHub Issues
- **Discussions**: Join community discussions in GitHub Discussions

## 🗺️ Roadmap

### Phase 1 (Current)
- ✅ Complete social media manager module
- ✅ User authentication and authorization
- ✅ Basic scheduling and analytics
- ✅ Admin dashboard

### Phase 2 (Next)
- [ ] AI content generation integration
- [ ] Advanced analytics and reporting
- [ ] Mobile app (React Native)
- [ ] API rate limiting and optimization

### Phase 3 (Future)
- [ ] Technician Agent module
- [ ] Additional business modules
- [ ] Enterprise features
- [ ] White-label solutions

---

**Built with ❤️ by the Crewency Team**