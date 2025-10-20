import SignOutBtn from "@/components/organisms/sign-out-btn";
import { SignUpCard } from "@/components/organisms/sign-up-card";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const SignUp = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return (
      <div>
        <h2>Sign Up - Better Auth</h2>
        <SignUpCard />
      </div>
    );
  }

  return (
    <div
      className="bg-card rounded-lg shadow border flex flex-col items-center justify-center
    gap-4 p-4"
    >
      <h1>Welcome {session.user.name}</h1>
      <SignOutBtn />
    </div>
  );
};
