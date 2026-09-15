import HeaderSubtitle from "@/components/molecules/HeaderSubtitle";
import CoupleNames from "@/components/molecules/CoupleNames";
import GuestAddress from "@/components/molecules/GuestAddress";
import Decoration from "@/components/atoms/Decoration";
import PhotoFrame from "@/components/atoms/PhotoFrame";
import Button from "@/components/atoms/Button";
import BackgroundLayers from "@/components/atoms/BackgroundLayers";
import BrideGroom from "@/components/organisms/BrideGroom";
import WeddingEvent from "@/components/organisms/WeddingEvent";

export default function WeddingInvitation() {
  return (
    <main className="relative mx-auto flex h-full w-full flex-col items-center bg-cream">
      <BackgroundLayers />

      <section id="cover" className="relative flex min-h-dvh w-full flex-col justify-between px-15 sm:px-6 md:px-10 lg:px-24 xl:px-36">
        <div className="relative flex w-full flex-col px-4 pt-14 sm:px-6 sm:pt-20 md:pt-16 lg:pt-20">
          <HeaderSubtitle />

          <div className="relative">
            <CoupleNames />
          </div>
        </div>

        <div className="relative flex w-full flex-1 flex-col items-center justify-center px-4">
          <PhotoFrame />
        </div>

        <div className="relative mb-25 flex flex-col items-center gap-4 px-4 sm:mb-35 sm:gap-6 md:mb-24 lg:mb-28">
          <GuestAddress />

          <Button />
        </div>

        <div className="absolute bottom-10 right-0 sm:bottom-10 sm:right-5 lg:right-12 xl:right-24" >
          <img
            src="/assets/cover/leafs.svg"
            alt=""
            aria-hidden="true"
            className="h-16 w-16 sm:h-24 sm:w-24 lg:h-28 lg:w-28"
          />
        </div>
      </section>

      <BrideGroom />

      <WeddingEvent />
    </main>
  );
}
