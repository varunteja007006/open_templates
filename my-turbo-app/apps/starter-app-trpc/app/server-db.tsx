import { db, dbSchemas } from "@workspace/starter-trpc-backend";

export default async function ServerDB() {
  const res = await db.execute("select 1");
  const posts = await db.select().from(dbSchemas.postSchema.postTable);

  return (
    <div>
      Drizzle output: {JSON.stringify(res, null, 2)}
      Drizzle Posts: {JSON.stringify(posts, null, 2)}
    </div>
  );
}
