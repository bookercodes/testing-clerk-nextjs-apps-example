import { AuthActions } from "./components/auth-actions"
import "./home.css"
import Image from "next/image"

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
              An application for dog owners to find dog-friendly restaurants,
              cafes, and more
            </p>
            <AuthActions />
          </div>
        </div>
      </main>
    </>
  )
}
