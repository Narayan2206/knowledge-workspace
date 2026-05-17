import LogoutButton from "@/components/auth/logout-button";
import DashboardComponent from "./DashboardComponent";

const Dashboard = () => {
  return (
    <main className="relative h-screen">
      <header className="absolute top-0 right-0 p-4">
        <LogoutButton variant="outline" />
      </header>
      <div className="flex items-center justify-center h-full">
        <DashboardComponent />
      </div>
    </main>
  );
};

export default Dashboard;
