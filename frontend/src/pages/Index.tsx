import { Link } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import { Button } from '@/components/ui/button';
import { GraduationCap, Shield, Users, BookOpen, ArrowRight } from 'lucide-react';

export default function Index() {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  const dashboardPath = user?.role === 'admin' ? '/admin' : '/student';

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <section className="py-20 px-4">
        <div className="container max-w-6xl">
          <div className="text-center animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <GraduationCap className="h-4 w-4" />
              Student Management Portal
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                SecureAuth
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              A platform for managing students, courses, and academic records. 
              Secure authentication with role-based access control.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isAuthenticated ? (
                <Button asChild size="lg" className="gradient-primary text-lg px-8">
                  <Link to={dashboardPath}>
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              ) : (
                <>
                  <Button asChild size="lg" className="gradient-primary text-lg px-8">
                    <Link to="/signup">
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="text-lg px-8">
                    <Link to="/login">Sign In</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-muted/30">
        <div className="container max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Key Features</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Everything you need to manage your educational platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl bg-card border border-border/50 shadow-md animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Secure Authentication</h3>
              <p className="text-muted-foreground">
                JWT-based authentication with email verification, password reset, and secure password hashing.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border/50 shadow-md animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Role-Based Access</h3>
              <p className="text-muted-foreground">
                Separate dashboards for admins and students with appropriate permissions and controls.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border/50 shadow-md animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Student Management</h3>
              <p className="text-muted-foreground">
                Full CRUD operations for student records with pagination and profile management.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 px-4 border-t border-border">
        <div className="container text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} SecureAuth. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
