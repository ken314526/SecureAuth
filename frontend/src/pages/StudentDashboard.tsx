import { useEffect, useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import { studentApi } from '@/services/api';
import { AvatarInitials } from '@/components/AvatarInitials';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Loader2, Mail, BookOpen, Calendar, User } from 'lucide-react';

interface ProfileData {
  _id: string;
  name: string;
  email: string;
  course: string;
  role: string;
  enrollmentDate: string;
  createdAt: string;
}

export default function StudentDashboard() {
  const { user } = useAppSelector((state) => state.auth);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await studentApi.getProfile();
        setProfile(response.data.user);
      } catch (error: any) {
        toast.error('Failed to load profile');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const displayData = profile || user;
  if (!displayData) return null;

  const enrollmentDate = displayData.enrollmentDate 
    ? new Date(displayData.enrollmentDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'N/A';

  const joinedDate = displayData.createdAt 
    ? new Date(displayData.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'N/A';

  return (
    <div className="min-h-[calc(100vh-4rem)] py-8 px-4">
      <div className="container max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Student Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back, {displayData.name}!</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="animate-slide-up border-border/50 shadow-lg md:col-span-2">
            <CardHeader>
              <CardTitle>My Profile</CardTitle>
              <CardDescription>Your personal information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0 flex justify-center">
                  <AvatarInitials name={displayData.name} size="xl" />
                </div>
                <div className="flex-1 grid gap-4 sm:grid-cols-2">
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                    <User className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">Full Name</p>
                      <p className="font-medium">{displayData.name}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                    <Mail className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="font-medium">{displayData.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                    <BookOpen className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">Course</p>
                      <p className="font-medium">{profile?.course || 'Not enrolled'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                    <Calendar className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">Enrollment Date</p>
                      <p className="font-medium">{enrollmentDate}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up border-border/50 shadow-lg" style={{ animationDelay: '0.1s' }}>
            <CardHeader>
              <CardTitle className="text-lg">Account Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Verification</span>
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-success/10 text-success">
                    Verified
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Member Since</span>
                  <span className="text-sm font-medium">{joinedDate}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-up border-border/50 shadow-lg" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <CardTitle className="text-lg">Current Course</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Course Name</span>
                  <span className="text-sm font-medium">{profile?.course || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Role</span>
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary capitalize">
                    {displayData.role}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
