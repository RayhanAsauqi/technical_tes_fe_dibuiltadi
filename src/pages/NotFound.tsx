import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center text-center p-8">
          <div className="text-8xl font-bold text-muted-foreground mb-4">404</div>

          <h1 className="text-2xl font-semibold text-foreground mb-2">Page Not Found</h1>
          <p className="text-muted-foreground mb-8 text-balance">
            The page you're looking for doesn't exist or has been moved.
          </p>

          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>

          <div className="mt-6 pt-6 border-t border-border w-full">
            <p className="text-sm text-muted-foreground mb-3">Need help finding something?</p>
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Search Site
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
