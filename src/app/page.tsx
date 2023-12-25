import { createServerActionClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import Button from "@/components/ui/button";

export async function getSupabaseUser() {
  const supabase = createServerComponentClient({ cookies });
  const user = await supabase.auth.getUser();
  return user;
}

const navLinks = [
  { title: "login", link: "/login" },
  { title: "signup", link: "/signup" }
];

export default async function Home() {
  const user = await getSupabaseUser();
  // console.log(JSON.stringify(user, undefined, 4));

  const handleAddMovie = async () => {
    "use server";
    const supabase = createServerActionClient({ cookies });

    const { error, status } = await supabase
      .from("bookmarked_movies")
      .insert([{ title: "for john.ugwuanyi", user_id: user.data.user?.id }])
      .select();

    if (error) {
      console.info(error);
      return redirect(`/?message=${error.message}`);
    }

    return status;
  };

  const handleLogout = async () => {
    "use server";
    const supabase = createServerActionClient({ cookies });
    const { error } = await supabase.auth.signOut();
    if (error) {
      // console.log(error);
      return redirect(`/?message=${error.message}`);
    }
    return redirect("/");
  };

  return (
    <div>
      {navLinks.map((link) => (
        <Link key={link.title} href={link.link} className="text-body-md text-white">
          {link.title}
        </Link>
      ))}
      <h1 className="text-primary text-heading-lg">Welcome to entertainment</h1>
      <div className="flex flex-col gap-6">
        <form action={handleAddMovie}>
          <Button type="submit">Add to bookmarks</Button>
        </form>
        <form action={handleLogout}>
          <Button type="submit">Logout</Button>
        </form>
      </div>
    </div>
  );
}
