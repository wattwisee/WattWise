import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/app.css';
import App from './App';
import { ClerkProvider } from '@clerk/clerk-react';
import { ConvexProvider } from 'convex/react';
import { ConvexReactClient } from 'convex/react';

// Import your Clerk publishable key - use NEXT_PUBLIC for Create React App
const PUBLISHABLE_KEY = import.meta.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

// Your Convex deployment URL - use NEXT_PUBLIC for Create React App
const CONVEX_URL = import.meta.env.NEXT_PUBLIC_CONVEX_URL || import.meta.env.VITE_CONVEX_URL;

const convex = new ConvexReactClient(CONVEX_URL);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <ConvexProvider client={convex}>
        <App />
      </ConvexProvider>
    </ClerkProvider>
  </React.StrictMode>
);
