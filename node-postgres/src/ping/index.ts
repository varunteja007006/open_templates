import db from "@/db";

async function main() {
  const res = await db.execute("select 1");
  console.log(res);
}

main();
