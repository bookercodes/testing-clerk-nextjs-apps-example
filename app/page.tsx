import { SignInButton, SignOutButton, SignedIn, SignedOut } from "@clerk/nextjs"
import dogAtRestaurant from "./images/dog_at_restaurant.jpg"
import "./home.css"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <>
      <main className="bg-[#FAFAFA] relative">
        <div className="w-full bg-white mx-auto flex flex-col border-l border-r border-[#F2F2F2] row-span-3">
          <div className="p-10 border-b border-[#F2F2F2] text-center">
            <h1 className="text-5xl font-bold tracking-tight text-[#131316] relative">
              Welcome to Pup Party!
            </h1>

            <p className="text-[#5E5F6E] pt-3 pb-6 text-[1.0625rem] relative">
              An application for dog owners to find dog-friendly restaurants, cafes, and more
            </p>
            <div className="relative flex gap-3">
              <SignedIn>
                <Link
                  href="/submit-review"
                  className="px-4 py-2 rounded-full bg-[#131316] text-white text-sm font-semibold"
                >
                  Submit a review
                </Link>
                <SignOutButton>
                  <button className="px-4 py-2 rounded-full bg-[#131316] text-white text-sm font-semibold">
                    Sign out
                  </button>
                </SignOutButton>
              </SignedIn>
            </div>
            <div>
              <SignedOut>
                <SignInButton>
                  <button className="px-4 py-2 rounded-full bg-[#131316] text-white text-sm font-semibold">
                    Sign in
                  </button>
                </SignInButton>
               </SignedOut>
            </div>
          </div>
          <div className="flex gap-8">
            <div>
              <Image
                alt="Device"
                src={dogAtRestaurant}
                unoptimized
                className="flex-none rounded-xl bg-white shadow-[0_5px_15px_rgba(0,0,0,0.08),0_15px_35px_-5px_rgba(25,28,33,0.2)] ring-1 ring-gray-950/5"
              />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
