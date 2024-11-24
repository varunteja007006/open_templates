export default function logger(req: any, res: any, next: any) {
  console.log("\n\n------------------");
  console.log("Request URL:", req.url);
  console.log("Request Method:", req.method);
  console.log("Request Headers:", req.headers);
  console.log("------------------");
  next();
}
