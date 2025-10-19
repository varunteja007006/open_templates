import { ModeToggle } from "@/components/mode-toggle";
import { add } from "@workspace/starter-package";

import { Button } from "@workspace/ui/components/button";

export default function Page() {
  const sum = add(2, 3);

  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Hello World</h1>
        <p>{sum}</p>
        <Button size="sm">Button</Button>
        <ModeToggle />
      </div>
    </div>
  );
}
