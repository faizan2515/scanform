import { useRef } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Intro from "@/components/layout/Intro";
import Benefits from "@/components/layout/Benefits";
import HelpDialog from "@/components/HelpDialog";
import QRStudio from "@/components/studio/QRStudio";

export default function App() {
  const helpDialog = useRef<HTMLDialogElement>(null);
  const openHelp = () => helpDialog.current?.showModal();
  return (
    <>
      <Header onOpenHelp={openHelp} />
      <main className="mx-auto max-w-275 px-6 wide:max-w-280 max-desktop:px-7 max-tablet:px-4.75">
        <Intro />
        <QRStudio />
        <Benefits />
      </main>
      <Footer onOpenHelp={openHelp} />
      <HelpDialog dialog={helpDialog} />
    </>
  );
}
