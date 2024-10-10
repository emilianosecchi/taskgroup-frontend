import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { NotificationContextProvider } from "../context/NotificationContext";

export default function RootLayout() {
  return (
    <NotificationContextProvider>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </NotificationContextProvider>
  );
}
