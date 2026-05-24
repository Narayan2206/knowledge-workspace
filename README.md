# Slate

A modern workspace platform for creating, organizing, and managing rich-text documents with authentication, structured workspaces, and permission-aware architecture.

Built with Next.js, Supabase, TypeScript, and TipTap.

## Live Demo

[Live Application](https://knowledge-workspace-three.vercel.app/)

---

## Overview

Slate provides a clean workspace experience where users can create dedicated workspaces and organize documents with a distraction-free editor.

The goal was to build a SaaS-style application with scalable architecture rather than a simple CRUD project — focusing on authentication flows, authorization, onboarding, rich text editing, and backend security.

---

## Features

### Authentication & User Flow

- Secure authentication with Supabase Auth
- Email verification flow
- Custom onboarding experience for first-time users
- Protected routes and session handling
- Resend SMTP integration for transactional emails

### Workspace Management

- Create workspaces
- Rename workspaces
- Delete workspaces
- Workspace switcher
- Dedicated workspace settings page
- Empty state handling

### Document Management

- Create documents
- Rich text editing support
- Delete documents
- Autosave support
- Sidebar document navigation
- Persistent document organization

### Rich Text Editor

Powered by TipTap:

- Bold formatting
- Italic formatting
- Underline support
- Strikethrough support
- Ordered lists
- Bullet lists
- Extensible editor architecture

### Authorization & Security

- Row Level Security (RLS) policies
- Backend permission enforcement
- Role-aware architecture foundation
- Permission-aware UI handling
- Ownership validation

---

## Tech Stack

### Frontend

- Next.js 16
- TypeScript
- Tailwind CSS
- shadcn/ui
- TipTap

### Backend

- Supabase
- PostgreSQL
- Row Level Security (RLS)

### Email

- Resend SMTP

### Deployment

- Vercel

---

## Architecture Highlights

- Service-based architecture for workspace and document operations
- Database triggers for automatic timestamps
- Modular permission layer
- Protected onboarding flow
- Reusable UI components
- Autosave workflow handling
- Scalable workspace-document relationship design

---

## Database Design

Core entities:

- users
- workspaces
- workspace_members
- documents

Architecture supports future role expansion:

- Owner
- Editor
- Viewer

Current implementation automatically assigns workspace creators as owners.

---

## Future Roadmap

- Workspace member invitations
- Configurable roles
- Realtime collaboration
- Presence indicators
- Task checklist support
- Additional editor extensions
- Collaborative editing

---

<!-- ## Screenshots

### Landing Page

Add image here

```md
![Landing Page](./screenshots/landing.png)
```

### Dashboard

```md
![Dashboard](./screenshots/dashboard.png)
```

### Editor

```md
![Editor](./screenshots/editor.png)
```

### Workspace Settings

```md
![Settings](./screenshots/settings.png)
```

--- -->

## Local Setup

Clone repository:

```bash
git clone https://github.com/Narayan2206/knowledge-workspace.git 
```

Install dependencies:

```bash
npm install
```

Create environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=

NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=

NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Run development server:

```bash
npm run dev
```

---

## Author

Narayan Pal

Built as a portfolio project focused on scalable SaaS architecture and real-world application patterns.