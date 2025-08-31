import { useEffect, useState } from "react";

export default function LoadingPage() {
  const [dots, setDots] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev === "...") return "";
        return prev + ".";
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center space-y-6">
        <div className="w-12 h-12 mx-auto border-4 border-muted border-t-primary rounded-full animate-spin"></div>

        <div className="space-y-2">
          <h1 className="text-xl font-medium text-foreground">Preparing your page{dots}</h1>
          <p className="text-muted-foreground">Hang tight, this won’t take long.</p>
        </div>
      </div>
    </div>
  );
}
