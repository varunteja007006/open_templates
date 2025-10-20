import { ModeToggle } from "@/components/mode-toggle";
import { add } from "@workspace/starter-package";

import { Button } from "@workspace/ui/components/button";
import CheckDBConnection from "./check-db";
import { SignUp } from "./sign-up";

export default function Page() {
  const sum = add(2, 3);

  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4 w-full">
        <h1 className="text-2xl font-bold">Hello World</h1>
        <p>Starter Package Result: {sum}</p>
        <Button size="sm">Button</Button>
        <ModeToggle />

        <div className="grid grid-cols-2 w-full p-4 gap-10">
          <div>
            <CheckDBConnection />
          </div>
          <div>
            <SignUp />
          </div>
        </div>
      </div>
    </div>
  );
}
