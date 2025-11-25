# Supabase Changelog - November 2025

## Dashboard Updates (November 10-25, 2025)

### Storage UI Update
- Improved file management interface
- Better organization and navigation
- Enhanced upload/download experience

### Bug Fixes and Improvements
- Various dashboard performance improvements
- UI/UX refinements across all sections
- Stability enhancements

## Security Notifications (November 2025)

### Account Security Alerts
- Email notifications for security-sensitive actions
- Alerts for account changes
- Enhanced security monitoring
- Multi-factor authentication status updates

## Dashboard Updates (October 20 - November 3, 2025)

### Upcoming: Storage UI Update
- Major redesign of storage interface
- Improved file browser
- Better performance for large file sets

### Auth Reports Improvements
- Enhanced security insights
- Better visualization of auth metrics
- Improved filtering and search

### Additional Settings for Realtime
- New configuration options for Realtime subscriptions
- Performance tuning capabilities
- Better connection management

### Support for Sentry Log Drains
- Integration with Sentry for error tracking
- Automatic log forwarding
- Enhanced debugging capabilities

## October 2025

### Enhanced Type Inference for Embedded Functions
- Better TypeScript support for computed relationships
- Improved type safety for embedded functions
- Enhanced autocomplete in IDEs

### Authentication Users Page Update
- Redesigned user management interface
- Better search and filtering
- Bulk operations support

### Supabase Remote MCP Server
- Model Context Protocol integration
- Connect AI tools directly to Supabase
- Secure remote access for LLMs
- Enhanced security with proper authentication

### Breaking Change: pgmq Extension
- Temporary halt on pgmq upgrades (1.4.4 to 1.5.1)
- Potential breaking changes identified
- Migration guide provided for affected projects

## September 2025

### Supabase Select Event
- Major community event completed
- New features announced
- Community feedback incorporated

### Assistant Improvements
- Better understanding of security issues
- Improved code suggestions
- Enhanced error detection
- More transparent tool calls

### Contextual Error Handling in Table Editor
- Better error messages
- Contextual help for common issues
- Improved user experience

### Supabase JS Client Libs: Migration to Monorepo
- Consolidated repository structure
- Easier contribution process
- Better package management
- Improved development workflow

### Query Performance Advisor Improvements
- Better optimization recommendations
- More detailed analysis
- Actionable insights

### Auth Audit Logs in Project Database
- Save auth audit logs directly in your database
- Better compliance and auditing
- Custom retention policies

## August 2025

### Personal Access Tokens: Expiration & Usage Tracking
- Set expiration dates for PATs
- Track token usage
- Enhanced security

### 3x Cheaper Egress for Cache Hits
- Significant cost reduction for cached content
- Better performance
- Automatic optimization

### OAuth 2.1 Server Capabilities
**Major Feature**: Full OAuth authorization server

**Use Cases**:
- MCP (Model Context Protocol) Auth
- "Login with Supabase Project"
- Enterprise SSO via OIDC
- API access for partner integrations

**Features**:
- Flexible authorization UI
- Access token structure customization
- RLS integration with OAuth scopes
- Secure client management

### Deno 2.1 for Edge Functions
- All regions now run Deno 2.1
- Fallback to Deno 1.45 available
- Better performance
- Enhanced compatibility

### Change in realtime-js for Node.js <22
- Breaking change for older Node versions
- Migration guide provided
- Upgrade recommended

## July 2025

### Deprecation Notices

**Python Libraries**:
- Dropping support for `gotrue` and `supafunc`
- Timeline: 6-month deprecation period
- Migration to official libraries recommended

**Node.js 18**:
- Dropping support for Node.js 18
- Upgrade to Node.js 20+ recommended
- Affected libraries documented

### Dashboard Navigation Updates
- Project Settings reorganization
- Improved routing
- Better auto-redirects
- New /organizations page
- Enhanced account settings

### Combined View for Logs
- Unified logging interface
- All log types in one view
- Better filtering and search
- Improved debugging experience

### Realtime Settings
- New configuration panel
- Advanced settings for subscriptions
- Performance tuning options

## June 2025

### Edge Functions Regional Invocations Update
- Improved regional routing
- Better latency
- Cost optimization

### Deno 2.1 Preview
- Test environment for Deno 2 compatibility
- Migration tools provided
- Full rollout timeline announced

### Postgres 17 Release Notes
- Latest PostgreSQL version support
- New features and improvements
- Migration guide

### Feature Preview: Tabs for Table and SQL Editor
- Multi-tab interface
- Better workflow
- Improved productivity

## May 2025

### Developer Update - April 2025

**Project Scoped Roles**:
- Granular permission control
- Better team management
- Enhanced security

**MCP Server Enhancements**:
- VS Code integration
- Create and deploy Edge Functions via MCP
- Better AI tool integration

**Supabase UI Library**:
- Infinite Query block
- Social Auth components
- Pre-built UI elements

## April 2025

### Dashboard Updates

**Table Editor**:
- Sort columns through column headers
- Improved UX
- Faster operations

**Billing**:
- Add billing address during org creation
- Better invoice management
- Enhanced payment options

**Project Scoped Roles in Team Plans**:
- Now available for all team plans
- Granular access control
- Better collaboration

### Dashboard Layout Update for Organizations
- Revamped organization settings
- Better billing breakdown
- Database upgrade logs
- Feature previews for local/self-hosted Studio

## March 2025

### Developer Update

**Supabase MCP Server**:
- Connect AI tools to Supabase
- Secure access management
- Enhanced productivity

**Supabase UI Library**:
- Pre-built components
- Faster development
- Consistent design

**Studio Improvements**:
- Better performance
- Enhanced UX
- New features

**Edge Functions Deploy from Dashboard**:
- No CLI required
- Visual deployment
- Easier management

**Realtime Broadcast from Database**:
- Send messages based on DB changes
- Real-time notifications
- Event-driven architecture

**Declarative Schemas**:
- Infrastructure as code
- Version control for schemas
- Better collaboration

**Postgres Language Server**:
- Enhanced SQL editing
- Better autocomplete
- Error detection

## February 2025

### Developer Update

**Deploy Edge Functions**:
- From Supabase dashboard
- From CLI (no Docker required)
- Using the API
- Via Assistant

**Connect AI Tools to Supabase**:
- MCP integration
- LLM access
- Secure connections

**Third-Party Auth**:
- Firebase integration GA
- Less expensive pricing
- Better compatibility

**New Billing Documentation**:
- Clearer pricing
- Better examples
- Comprehensive guides

**Postgres as Graph Database**:
- New use cases
- Better performance
- Enhanced capabilities

### Deno 2.1 Preview (Local Only)
- Test locally before production
- Migration tools
- Compatibility checking

### Increased Third-Party Auth MAU Quota
- Higher limits for Free plans
- Better value for Paid plans
- More flexibility

### Inline Editor (Feature Preview)
- Write queries from anywhere
- Better workflow
- Improved productivity

### Deploy Edge Functions via Management API
- Programmatic deployment
- CI/CD integration
- Automation support

## January 2025

### Developer Update

**Third-Party Auth with Firebase GA**:
- Generally available
- Production-ready
- Full support

**Enhanced Type Inference**:
- JSON fields
- Query filter values
- Better TypeScript support

**AI Prompt for Edge Functions**:
- AI-assisted function writing
- Faster development
- Better code quality

**Easier Error Detection in Log Charts**:
- Stacked charts with warnings and errors
- Better visualization
- Faster debugging

### Deprecation: Fly.io Postgres
- Managed by Supabase on Fly.io deprecated
- Migration deadline: April 11, 2025
- Alternative solutions provided

## Key Features

### Authentication
- OAuth 2.1 server capabilities
- Third-party auth (Firebase, etc.)
- Enhanced security notifications
- MFA improvements
- Audit logs in database

### Edge Functions
- Deploy from dashboard, CLI, or API
- Deno 2.1 support
- Regional invocations
- MCP integration

### Database
- Postgres 17 support
- pgvector for AI/ML
- Realtime subscriptions
- Enhanced type safety
- Graph database capabilities

### Developer Experience
- MCP server for AI tools
- UI component library
- Inline editor
- Multi-tab interface
- Better error messages

### Platform
- Cheaper egress for cache hits
- Personal access token management
- Project scoped roles
- Combined log view
- Dashboard improvements

## Key Topics
- Auth enhancements
- Dashboard updates
- Edge functions
- Realtime features
- Type inference
- AI integration
- MCP support
- Performance optimization
- Security improvements
