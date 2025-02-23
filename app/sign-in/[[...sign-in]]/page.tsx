import { SignIn } from "@clerk/nextjs";

export default function Page () {
  return (
    <div className="flex justify-center py-24" data-testid="clerk-sign-in">
      <SignIn />
    </div>
  );
}
