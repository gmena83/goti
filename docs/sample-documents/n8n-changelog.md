# n8n Release Notes - November 2025 Highlights

## Version 1.122.1 (November 24, 2025)

### Bug Fixes
- Fixed workflow execution issues in complex scenarios
- Improved error handling for API nodes
- Enhanced stability for long-running workflows
- Resolved memory leaks in certain node types

## Version 1.122.0 (November 24, 2025)

### New Features
- **Enhanced AI Agent Support**: Improved AI agent capabilities with better context handling
- **New Integrations**: Added 15+ new node integrations including popular SaaS tools
- **Workflow Templates**: Expanded template library with 50+ new pre-built workflows
- **Performance Improvements**: 30% faster execution for multi-step workflows

### Bug Fixes
- Fixed trigger reliability issues
- Resolved connection timeout problems
- Improved error messages for failed executions
- Enhanced webhook handling

## Version 1.121.2 (November 20, 2025)

### Bug Fixes
- Fixed issues with OAuth2 authentication
- Resolved data transformation bugs
- Improved node execution order
- Enhanced error recovery mechanisms

## Version 1.121.0 (November 18, 2025)

### New Features
- **AI-Powered Workflow Builder**: AI suggestions for workflow optimization
- **Advanced Scheduling**: More flexible cron expressions and scheduling options
- **Bulk Operations**: Process multiple items more efficiently
- **Enhanced Debugging**: Better debugging tools with step-by-step execution

### Improvements
- Faster workflow loading
- Better UI responsiveness
- Improved documentation
- Enhanced search functionality

## Version 1.120.x Series (November 2025)

### Key Updates
- **MCP Integration**: Model Context Protocol support for AI workflows
- **Custom Code Improvements**: Enhanced JavaScript and Python code execution
- **Database Nodes**: Better support for PostgreSQL, MySQL, and MongoDB
- **API Rate Limiting**: Smart rate limiting for external API calls

## October 2025 Highlights

### Version 1.119.0
- **Workflow Versioning**: Track and restore previous workflow versions
- **Collaboration Features**: Real-time collaboration on workflows
- **Enhanced Security**: Improved credential management and encryption
- **Performance Monitoring**: Built-in performance analytics

### Version 1.118.0
- **New Nodes**: 
  - Supabase integration
  - OpenAI GPT-4 Turbo
  - Anthropic Claude 4
  - Google Gemini Pro
- **Workflow Optimization**: Automatic workflow optimization suggestions
- **Error Handling**: Better error recovery and retry mechanisms

## September 2025 Highlights

### AI & Automation
- **AI Workflow Templates**: Pre-built templates for common AI use cases
- **Smart Data Mapping**: AI-assisted data transformation
- **Predictive Execution**: Predict workflow execution time and resource usage

### Platform Improvements
- **Cloud Hosting**: Enhanced n8n Cloud with better performance
- **Self-Hosting**: Improved Docker images and deployment guides
- **API Enhancements**: New REST API endpoints for workflow management

## August 2025 Highlights

### Enterprise Features
- **SSO Integration**: Support for SAML and OIDC
- **Audit Logs**: Comprehensive audit logging for compliance
- **Role-Based Access Control**: Granular permissions for teams
- **Workflow Approval**: Approval workflows for production deployments

### Developer Experience
- **VS Code Extension**: Edit workflows directly in VS Code
- **CLI Improvements**: Better command-line tools for automation
- **SDK Updates**: Enhanced JavaScript/TypeScript SDK
- **Testing Framework**: Built-in testing for workflows

## Key Features Summary

### Workflow Automation
- 400+ integrations with popular services
- Visual workflow builder
- Code nodes for custom logic
- Scheduled and event-driven execution

### AI Capabilities
- Native AI node support
- MCP integration
- AI-powered workflow suggestions
- Smart data transformation

### Enterprise Ready
- Self-hosted or cloud options
- SSO and RBAC
- Audit logs
- High availability

### Developer Tools
- REST API
- CLI tools
- VS Code extension
- Testing framework

## Breaking Changes

### Version 1.120.0+
- **Node.js 18 Support Dropped**: Minimum version is now Node.js 20
- **Webhook URL Format**: New format for webhook URLs (migration guide available)
- **Credential Storage**: Enhanced encryption (automatic migration on upgrade)

## Migration Notes

### Upgrading to 1.122.x
1. Backup your workflows and credentials
2. Update to Node.js 20 or higher
3. Run database migrations
4. Test critical workflows
5. Update webhook URLs if needed

### Self-Hosted Deployments
```bash
# Docker
docker pull n8nio/n8n:1.122.1

# npm
npm update -g n8n

# Verify version
n8n --version
```

## Performance Benchmarks

### Version 1.122.0 vs 1.110.0
- **Workflow Execution**: 30% faster
- **Memory Usage**: 20% reduction
- **API Response Time**: 40% improvement
- **Database Queries**: 25% optimization

## Community Highlights

### Popular Workflows
- AI Content Generation Pipeline
- Multi-Platform Social Media Automation
- E-commerce Order Processing
- Customer Support Ticket Routing
- Data Synchronization Across Tools

### New Community Nodes
- 50+ community-contributed nodes
- Enhanced documentation
- Better testing and quality

## Upcoming Features (December 2025)

- **Workflow Marketplace**: Share and monetize workflows
- **Advanced Analytics**: Detailed execution analytics
- **Mobile App**: iOS and Android apps for monitoring
- **Enhanced AI**: GPT-5 and Claude 5 support

## Key Topics
- Workflow automation
- AI integration
- MCP support
- Performance optimization
- Enterprise features
- Developer tools
- Community contributions
- Breaking changes
- Version updates
