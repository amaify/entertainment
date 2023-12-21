import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  profileImage: text("profile_image").notNull(),
  bookmarkedMovies: text("bookmarked_movies").array(),
});
