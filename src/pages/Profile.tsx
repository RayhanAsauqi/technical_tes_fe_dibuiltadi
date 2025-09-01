import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Shield, KeyRound, ArrowLeft, Mail, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useDisclosure from "@/hooks/use-disclosure";
import ChangePasswordModal from "@/components/container/modals/change-password";
import { API_ENDPOINT } from "@/lib/constants/endpoint";
import type { ProfileRes } from "@/lib/types/res/profile";
import { useFetch } from "@/hooks/use-fetch";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { data: userData, loading } = useFetch<ProfileRes>(`${API_ENDPOINT}/auth/profile`);
  const { isOpen, onOpen, setIsOpenAction } = useDisclosure();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        <Button
          variant="ghost"
          onClick={handleBack}
          className="mb-2 flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <User className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Profile</h1>
            <p className="text-muted-foreground">Manage your account information</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Profile Card */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
              <CardDescription>Your account details and contact information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                {loading ? (
                  <Skeleton className="h-20 w-20 rounded-full" />
                ) : (
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={userData?.profileImage} alt={userData?.name} />
                    <AvatarFallback>{userData?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                )}
                <div className="space-y-2">
                  {loading ? (
                    <>
                      <Skeleton className="h-6 w-40" />
                      <Skeleton className="h-5 w-28" />
                    </>
                  ) : (
                    <>
                      <h3 className="text-xl font-semibold">{userData?.name}</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <Shield className="h-3 w-3" />
                          {userData?.roleName}
                        </Badge>
                        <Badge variant="outline">ID: {userData?.code}</Badge>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <Separator />

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <p className="text-sm font-medium flex items-center gap-2">
                    <Mail className="h-4 w-4" /> Email Address
                  </p>
                  {loading ? (
                    <Skeleton className="h-10 w-full rounded-md" />
                  ) : (
                    <div className="rounded-md border bg-muted/50 px-3 py-2">{userData?.email}</div>
                  )}
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium flex items-center gap-2">
                    <Phone className="h-4 w-4" /> Phone Number
                  </p>
                  {loading ? (
                    <Skeleton className="h-10 w-full rounded-md" />
                  ) : (
                    <div className="rounded-md border bg-muted/50 px-3 py-2">{userData?.phone}</div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <KeyRound className="h-5 w-5" />
                Security
              </CardTitle>
              <CardDescription>Manage your account security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {loading ? (
                <Skeleton className="h-10 w-full rounded-md" />
              ) : (
                <Button variant="outline" className="w-full justify-start" onClick={onOpen}>
                  <KeyRound className="mr-2 h-4 w-4" />
                  Change Password
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <ChangePasswordModal isOpen={isOpen} setIsOpenAction={setIsOpenAction} />
    </div>
  );
}
