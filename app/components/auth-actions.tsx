'use client';

import { SignInButton, SignOutButton, SignedIn, SignedOut, ClerkLoaded, ClerkLoading } from '@clerk/nextjs';
import Link from 'next/link';

export function AuthActions() {
  return (
    <>
    <ClerkLoading>
      <div className="flex items-center gap-2 text-sm text-black pl-4 py-4">
        <div className="flex items-center gap-2 text-base text-black pl-4 py-4">
          <span className="animate-spin inline-block text-2xl">🐾</span>
          <span className="text-base font-medium">Loading buttons…</span>
        </div>
      </div>
    </ClerkLoading>
    <ClerkLoaded>
      <div className="relative flex gap-3">
        <SignedIn>
          <Link href="/submit-review" className="px-4 py-2 rounded-full bg-black text-white text-sm font-semibold">
            Submit a review
          </Link>
          <SignOutButton>
            <button className="px-4 py-2 rounded-full bg-black text-white text-sm font-semibold">
              Sign out
            </button>
          </SignOutButton>
        </SignedIn>
        <SignedOut>
          <SignInButton>
            <button className="px-4 py-2 rounded-full bg-black text-white text-sm font-semibold">
              Sign in
            </button>
          </SignInButton>
        </SignedOut>
      </div>
    </ClerkLoaded>
    </>
  )
}