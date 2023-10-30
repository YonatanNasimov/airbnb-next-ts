import "./globals.css";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Navbar from "../components/navbar/navbar";
// import ClientOnly from "@/components/clientOnly";
import Modal from "@/components/modals/modal";
import RegisterModal from "@/components/modals/registerModal";
import RentModal from "@/components/modals/rentModal";
import LoginModal from "@/components/modals/loginModal";
import ToasterProvider from "@/providers/toasterProvider";
import getCurrentUser from "@/actions/getCurrentUser";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airbnb-clone",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser()
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <LoginModal />
        <RegisterModal />
        <RentModal />
        <Navbar currentUser={currentUser} />
        <main className="pb-20 pt-28">
          {children}
        </main>
      </body>
    </html>
  );
}
