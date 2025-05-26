import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function FormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if ((await auth()).sessionClaims?.metadata?.walletCreated === false) {
    redirect("/login");
  }

  return <>{children}</>;
}
