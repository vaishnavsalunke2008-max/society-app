# SocietyHub

A mobile-first web app for managing apartment communities in India.

## Features

- **Authentication**: Phone number login with OTP
- **Dashboard**: Overview of notices, complaints, meetings
- **Notices**: Post and view community announcements
- **Complaints**: Raise and track maintenance issues
- **Meetings**: Schedule meetings with built-in polls
- **Roles**: Resident, Admin, Security permissions

## Tech Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Mock authentication (ready for Firebase integration)
- **Icons**: Lucide React

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run the development server**
   ```bash
   npm run dev
   ```

3. **Open [http://localhost:3000](http://localhost:3000) in your browser**

## Demo Instructions

1. **Login**: Enter any phone number, click "Send OTP"
2. **OTP**: Enter `123456` as the OTP
3. **Role Selection**: Choose Resident, Admin, or Security
4. **Dashboard**: View notices, complaints, meetings, and quick actions
5. **Navigation**: Use the bottom navigation to switch between sections

## Features Implemented

- ✅ Phone authentication (mock)
- ✅ Role selection (Resident/Admin/Security)
- ✅ Dashboard with quick actions
- ✅ Notices management (view and post)
- ✅ Complaint raising and tracking
- ✅ Meeting scheduling with polls
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