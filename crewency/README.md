# Crewency - AI-Powered Social Media Manager

A modular SaaS platform for managing social media with AI-powered content generation and scheduling. Built for SMBs and agencies with extensibility in mind.

## 🚀 Features

### Current MVP Features (Social Manager Module)

- **User Management**: Multi-tenant support with role-based permissions (Admin, Editor, Viewer, Owner)
- **Account Integration**: Connect up to 3 social accounts (per free tier) with OAuth2
- **Scheduling**: Visual calendar UI for scheduling posts with recurring campaigns
- **AI Content Generation**: Stub endpoints for captions, hashtags, images, and video prompts
- **Analytics & Alerts**: Track engagement, reach, follower growth, and sentiment
- **Admin Dashboard**: User management and system monitoring
- **Security & Compliance**: GDPR-compliant with encrypted data storage

### Supported Social Platforms

- Facebook & Instagram
- LinkedIn
- X (Twitter)
- TikTok (stub)
- YouTube (stub)
- Threads (stub)
- Reddit (stub)
- Pinterest (stub)
- Tumblr (stub)

## 🏗️ Architecture

### Frontend
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS with custom brand colors
- **Animations**: Framer Motion
- **State Management**: React hooks + Context (future: Zustand/Redux)

### Backend
- **API**: Next.js API routes
- **Database**: PostgreSQL via Supabase
- **Authentication**: Supabase Auth + NextAuth.js
- **File Storage**: Supabase Storage (future)

### Database Schema
- Multi-tenant organizations
- Role-based user management
- OAuth account linking
- Scheduled posts with platform-specific data
- Analytics and audit logging
- Row Level Security (RLS) enabled

## 📁 Project Structure

```
crewency/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   ├── auth/              # Authentication pages
│   │   ├── dashboard/         # Dashboard pages
│   │   └── schedule/          # Scheduling pages
│   ├── components/            # Reusable UI components
│   │   ├── layout/           # Layout components
│   │   ├── ui/               # Basic UI components
│   │   └── forms/            # Form components
│   ├── modules/              # Modular feature organization
│   │   ├── social-manager/   # Social media management module
│   │   │   ├── components/   # Module-specific components
│   │   │   ├── pages/        # Module pages
│   │   │   ├── services/     # Social media API services
│   │   │   ├── types/        # Module types
│   │   │   └── utils/        # Module utilities
│   │   └── technician-agent/ # Future MSP module (stub)
│   ├── lib/                  # Shared utilities
│   │   ├── auth/            # Authentication utilities
│   │   ├── database/        # Database configuration
│   │   └── utils/           # General utilities
│   ├── types/               # Global TypeScript types
│   └── constants/           # Application constants
├── .env.local.example       # Environment variables template
└── README.md
```

## 🚀 Getting Started

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
   cp .env.local.example .env.local
   ```
   
   Fill in your environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key
   - `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key
   - OAuth provider credentials (Google, LinkedIn, Facebook)

4. **Set up the database**
   ```bash
   # Run the schema.sql file in your PostgreSQL database
   # Or use Supabase SQL editor to execute the schema
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Supabase Setup

1. Create a new Supabase project
2. Run the provided `schema.sql` in the SQL editor
3. Enable Row Level Security (RLS) policies
4. Set up OAuth providers in Authentication settings

### OAuth Providers

Configure the following OAuth providers:

- **Google**: Google Cloud Console
- **LinkedIn**: LinkedIn Developer Portal
- **Facebook**: Facebook Developers

## 📊 Database Schema

The database is designed with modularity and scalability in mind:

- **Organizations**: Multi-tenant support
- **Users**: Role-based access control
- **OAuth Accounts**: Social media account linking
- **Scheduled Posts**: Cross-platform content scheduling
- **Analytics**: Performance tracking and insights
- **Audit Logs**: Compliance and security tracking

## 🎨 Design System

### Brand Colors
- Primary: Deep-to-light blues from Crewency logo
- Secondary: Complementary blue tones
- Platform-specific colors for social media icons

### Components
- Reusable UI components with TailwindCSS
- Framer Motion animations
- Responsive design (mobile-first)
- Accessibility compliant

## 🔐 Security Features

- **Authentication**: Supabase Auth with JWT tokens
- **Authorization**: Role-based permissions
- **Data Encryption**: All sensitive data encrypted
- **GDPR Compliance**: Data privacy controls
- **Audit Logging**: Complete action tracking
- **Rate Limiting**: API protection (future)

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms

- **AWS**: Use Vercel or deploy to AWS Lambda
- **Railway**: Full-stack deployment
- **DigitalOcean**: App Platform

## 📈 Roadmap

### Phase 1 (Current)
- ✅ Full-stack scaffold with auth
- ✅ Scheduling UI and dashboard
- ✅ API service stubs
- ✅ Multi-tenant architecture

### Phase 2 (Next)
- [ ] Complete analytics dashboard
- [ ] AI content generation integration
- [ ] Advanced scheduling features
- [ ] Mobile responsiveness

### Phase 3 (Future)
- [ ] Advanced automations
- [ ] Additional social networks
- [ ] Mobile apps
- [ ] MSP Technician Agent module

### Phase 4 (Long-term)
- [ ] White-label solutions
- [ ] Enterprise features
- [ ] Advanced AI capabilities
- [ ] Third-party integrations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [docs.crewency.com](https://docs.crewency.com)
- **Issues**: [GitHub Issues](https://github.com/crewency/crewency/issues)
- **Email**: support@crewency.com

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Supabase for the backend infrastructure
- TailwindCSS for the utility-first CSS
- Framer Motion for smooth animations
- All contributors and early adopters

---

**Built with ❤️ by the Crewency Team**