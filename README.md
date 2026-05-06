# SocietyHub

A mobile-first web app for managing apartment communities in India with Firebase authentication and role-based access control.

## Features

- **Firebase Authentication**: Email/password authentication with persistent login
- **Role-Based Access Control**: Admin, Resident, and Security roles with appropriate permissions
- **Dashboard**: Role-specific dashboards with quick actions
- **Notices**: Post and view community announcements
- **Complaints**: Raise and track maintenance issues
- **Meetings**: Schedule meetings with built-in polls
- **Signup**: Role-based registration with admin code validation

## Tech Stack

- **Frontend**: Next.js 14 with TypeScript
- **Authentication**: Firebase Auth with Firestore
- **Styling**: Tailwind CSS with shadcn/ui components
- **Icons**: Lucide React

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env.local` file with your Firebase configuration:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000) in your browser**

## Firebase Setup

1. Create a Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Enable Authentication with Email/Password provider
3. Enable Firestore Database
4. Copy your Firebase config to `.env.local`

## User Roles

- **Admin**: Requires invite code "ADMIN2024" during signup, full access to all features
- **Resident**: Standard user access to complaints, notices, and meetings
- **Security**: Access to security-related features and complaint management

## Deployment

The app is production-ready and builds successfully. Deploy to Vercel, Netlify, or any Node.js hosting platform with the environment variables configured.
- ✅ Mobile-first responsive design
- ✅ Sample dummy data
- ✅ Bottom navigation

## Backend Integration

The app is structured to easily integrate with Firebase:

1. Uncomment Firebase imports in `lib/firebase.ts`
2. Add your Firebase config to `.env.local`
3. Update authentication logic in `components/Login.tsx`
4. Add Firestore operations for data persistence

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── dashboard/         # Dashboard page
│   ├── notices/           # Notices page
│   ├── complaints/        # Complaints page
│   ├── meetings/          # Meetings page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Login page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── ...               # Page components
├── lib/                  # Utility functions
│   ├── firebase.ts       # Firebase configuration (commented)
│   └── utils.ts          # Helper functions
└── ...
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.