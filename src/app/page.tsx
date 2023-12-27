import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import Thumbnail from "@/components/thumbnail/thumbnail";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import LogoutButton from "@/components/ui/logout-button";
import HomePageLayout from "@/layout/pages-layout";
import { createClient } from "@/lib/supabase/server";
import movieData from "../../starter-code/data.json";

export async function getSupabaseUser() {
  const supabase = createClient(cookies());
  const user = await supabase.auth.getUser();
  return user;
}

async function getBookmarkedMovies() {
  const supabase = createClient(cookies());
  const movies = await supabase.from("bookmarked_movies").select();
  return movies;
}

const navLinks = [
  { title: "login", link: "/login" },
  { title: "signup", link: "/signup" }
];

export default async function Home() {
  const user = await getSupabaseUser();
  const movies = await getBookmarkedMovies();
  // console.log(JSON.stringify(user, undefined, 4));

  const handleAddMovie = async () => {
    "use server";
    const supabase = createClient(cookies());

    const { error, status } = await supabase
      .from("bookmarked_movies")
      .insert([{ title: "for john.ugwuanyi", user_id: user.data.user?.id }])
      .select();

    if (error) {
      console.info(error);
      return redirect(`/?message=${error.message}`);
    }
    revalidatePath("/");
    return status;
  };

  // console.log(movieData);

  return (
    <HomePageLayout placeholderText="Search for movies or TV series">
      <div className="grid grid-cols-4 gap-4">
        {/* {movieData.map((movie) => (
          <Thumbnail variant="popular" key={movie.title} />
        ))} */}
      </div>
      <div></div>
      <div className="flex gap-4">
        {navLinks.map((link) => (
          <Link key={link.title} href={link.link} className="text-body-md text-white">
            {link.title}
          </Link>
        ))}
      </div>
      <h1 className="text-primary text-heading-lg">Welcome to entertainment</h1>
      <h2 className="text-heading-medium-sm text-primary">Hi, {user.data.user?.email}</h2>
      <div className="flex flex-col gap-6">
        <form action={handleAddMovie}>
          <Button type="submit">Add to bookmarks</Button>
        </form>
        <LogoutButton />
      </div>
      <pre className="text-white text-body-md">{JSON.stringify(movies.data, null, 2)}</pre>
    </HomePageLayout>
  );
}
