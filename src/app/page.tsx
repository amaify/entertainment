import Button from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getSupabaseUser() {
  const supabase = createClient(cookies());
  const user = await supabase.auth.getUser();
  return user;
}

export default async function Home() {
  const user = await getSupabaseUser();
  // console.log(JSON.stringify(user, undefined, 4));

  const handleAddMovie = async () => {
    "use server";
    const supabase = createClient(cookies());
    // const { error, status, data } = await supabase
    //   .from("bookmarked_movies")
    //   .select("title");

    // const { error, status, data } = await supabase
    //   .from("bookmarked_movies")
    //   .delete()
    //   .eq("title", "thor");

    const { data, error, status } = await supabase
      .from("bookmarked_movies")
      .insert([{ title: "for john.ugwuanyi", user_id: user.data.user?.id }])
      .select();

    if (error) {
      console.log(error);
      return redirect(`/?message=${error.message}`);
    }

    console.log("STATUS: ", data);
    return status;
  };

  return (
    <div>
      <h1 className="text-primary text-heading-lg">Welcome to entertainment</h1>
      <form action={handleAddMovie}>
        <Button type="submit">Add to bookmarks</Button>
      </form>
    </div>
  );
}
