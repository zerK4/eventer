import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <SignIn
        appearance={{
          elements: {
            card: "bg-black",
          },
        }}
      />
    </div>
  );
}
