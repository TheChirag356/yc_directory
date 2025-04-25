import Link from "next/link";
import Image from "next/image";
import { auth, signIn, signOut } from "@/auth";
import ThemeToggle from "@/components/theme-toggle";

export default async function Navbar() {
  const session = await auth();

  return (
    <header className="px-5 py-3 bg-white shadow-sm dark:text-black">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={144} height={30} />
        </Link>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-5">
            {session && session?.user ? (
              <>
                <Link href="/startup/create">
                  <span>Create</span>
                </Link>
                <form
                  action={async () => {
                    "use server";
                    await signOut();
                  }}
                  className="cursor-pointer"
                >
                  <span>Logout</span>
                </form>

                <Link href={`/user/${session?.user?.id}`}>
                  <span>{session?.user?.name}</span>
                </Link>
              </>
            ) : (
              <form
                action={async () => {
                  "use server";
                  await signIn("github");
                }}
              >
                <button type="submit" className="cursor-pointer">
                  Signin with GitHub
                </button>
              </form>
            )}
          </div>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
