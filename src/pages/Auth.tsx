import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "@/components/container/form/login";
import RegisterForm from "@/components/container/form/register";

export default function AuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-4 md:py-8 px-4">
      <div className="w-full max-w-md md:max-w-3xl mx-auto">
        <Card className="shadow-2xl py-3 md:py-5 border-0 backdrop-blur-sm">
          <CardHeader className="space-y-2 md:space-y-4 pb-3 md:pb-6">
            <CardTitle className="text-lg md:text-2xl text-center">
              <span className="text-base md:text-xl font-medium">Get Started</span>
            </CardTitle>
            <p className="text-center text-xs md:text-sm text-muted-foreground">
              Access your dashboard and start managing your data
            </p>
          </CardHeader>
          <CardContent className="space-y-3 md:space-y-6 px-3 md:px-6">
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 p-1">
                <TabsTrigger value="signin" className="font-medium text-xs md:text-sm">
                  Login
                </TabsTrigger>
                <TabsTrigger value="signup" className="font-medium text-xs md:text-sm">
                  Register
                </TabsTrigger>
              </TabsList>
              <TabsContent value="signin" className="mt-3 md:mt-6 space-y-3">
                <div className="text-center mb-3">
                  <h3 className="font-semibold text-sm md:text-lg">Welcome back!</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Sign in to access your dashboard
                  </p>
                </div>
                <LoginForm />
              </TabsContent>
              <TabsContent value="signup" className="mt-3 md:mt-6 space-y-3">
                <div className="text-center mb-3">
                  <h3 className="font-semibold text-sm md:text-lg">Create Account</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Join us and start managing your business today
                  </p>
                </div>
                <RegisterForm />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
