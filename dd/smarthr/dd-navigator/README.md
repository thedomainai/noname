# DD Navigator

M&A Due Diligence Management Web Application

## Overview

DD Navigator is a comprehensive web application designed to streamline M&A due diligence processes. Built with Next.js 16 App Router, Supabase, and TypeScript, it provides teams with powerful tools for managing deals, Q&A tracking, document management, findings tracking, and checklist management.

## Features

- **Deal Management**: Track deals through multiple phases (sourcing, NDA, IM review, LOI, DD, negotiation, closing)
- **Q&A Management**: Create, track, and manage Q&A items with automatic duplicate detection using pg_trgm similarity search
- **Document Management**: Upload and organize documents with category support and storage quota management
- **Findings Tracking**: Record and categorize findings by risk, opportunity, issue, or information
- **Checklist Templates**: Apply predefined DD checklist templates (BDD, FDD, LDD, ITDD, HRDD)
- **Longlist Management**: Maintain a database of potential acquisition targets with fit scoring
- **Team Collaboration**: Role-based access control (owner, admin, member, viewer) with team-based data isolation
- **Dashboard**: Real-time metrics and deal distribution visualization

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict mode)
- **Database**: Supabase (PostgreSQL with Row Level Security)
- **Authentication**: Supabase Auth
- **Validation**: Zod
- **Styling**: Tailwind CSS 4.0
- **Date Handling**: date-fns
- **Form Management**: React Hook Form

## Prerequisites

- Node.js 22+ (via Volta)
- Supabase account and project
- pnpm/npm/yarn

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd dd-navigator

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Run database migrations
# (via Supabase CLI or dashboard)

# Start development server
npm run dev
```

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Database Setup

Run the migrations in order:

1. `20260330000001_create_extensions_and_functions.sql` - Extensions and helper functions
2. `20260330000002_create_tables.sql` - Core tables
3. `20260330000003_create_indexes.sql` - Performance indexes
4. `20260330000004_enable_rls.sql` - Row Level Security policies
5. `20260330000005_create_triggers.sql` - Timestamp triggers

## Project Structure

```
src/
├── app/
│   ├── api/                 # API Routes
│   │   ├── auth/
│   │   ├── deals/
│   │   ├── longlist/
│   │   ├── dashboard/
│   │   └── teams/
│   └── ...                  # Pages (to be implemented)
├── lib/
│   ├── actions/             # Server Actions
│   ├── constants/           # Constants and labels
│   ├── schemas/             # Zod validation schemas
│   ├── services/            # Business logic
│   ├── supabase/            # Supabase clients
│   └── utils/               # Utility functions
├── types/                   # TypeScript type definitions
└── middleware.ts            # Authentication middleware
```

## API Endpoints

### Deals
- `GET /api/deals` - List deals (with filters)
- `POST /api/deals` - Create deal
- `GET /api/deals/[id]` - Get deal details
- `PATCH /api/deals/[id]` - Update deal

### Q&A
- `GET /api/deals/[id]/qa` - List Q&A items
- `POST /api/deals/[id]/qa` - Create Q&A item
- `POST /api/deals/[id]/qa/check-duplicate` - Check for duplicate questions
- `GET /api/deals/[id]/qa/export` - Export Q&A (text/CSV)

### Documents
- `GET /api/deals/[id]/documents` - List documents
- `POST /api/deals/[id]/documents` - Upload document

### Findings
- `GET /api/deals/[id]/findings` - List findings
- `POST /api/deals/[id]/findings` - Create finding

### Checklist
- `POST /api/deals/[id]/checklist/apply-template` - Apply checklist template
- `PATCH /api/deals/[id]/checklist/[itemId]` - Toggle checklist item

### Longlist
- `GET /api/longlist` - List companies
- `POST /api/longlist` - Create company
- `POST /api/longlist/import` - Import companies from CSV

### Dashboard
- `GET /api/dashboard` - Get dashboard metrics

### Teams
- `GET /api/teams` - List user's teams
- `POST /api/teams` - Create team

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint
npm run lint
```

## Key Features Implementation

### Duplicate Question Detection

Uses PostgreSQL's `pg_trgm` extension for similarity-based duplicate detection:

```sql
SELECT similarity(question, 'search text') AS score
FROM qa_items
WHERE similarity(question, 'search text') > 0.3
ORDER BY score DESC;
```

### Row Level Security

All tables use RLS policies to ensure team-based data isolation. Users can only access data from teams they belong to.

### Storage Quota Management

Teams have storage limits enforced at the application level. The `update_storage_usage` function tracks usage across document uploads/deletions.

### Server Actions vs API Routes

- **Server Actions**: Used for form submissions with revalidation (e.g., creating deals, Q&A items)
- **API Routes**: Used for data fetching, external integrations, and complex operations

## Security Considerations

- All API routes require authentication (except `/api/auth/*`)
- Row Level Security enforces team-based data isolation
- File uploads are validated for size and storage quota
- Input validation with Zod schemas on all endpoints
- SQL injection prevention via parameterized queries (Supabase client)

## License

[License Type]

## Contributing

[Contributing Guidelines]

## Support

[Support Information]
