import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PopupWidget } from "@/components/PopupWidget";

export async function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div>{children}</div>
      <Footer />
      <PopupWidget />
    </>
  );
}
