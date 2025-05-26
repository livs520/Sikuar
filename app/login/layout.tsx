import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if ((await auth()).sessionClaims?.metadata?.walletCreated === true) {
    redirect("/");
  }

  return <>{children}</>;
}
