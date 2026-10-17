import Decoration from "@/components/atoms/Decoration";
import BackgroundLayers from "@/components/atoms/BackgroundLayers";
import Cover from "@/components/organisms/Cover";
import BrideGroom from "@/components/organisms/BrideGroom";
import WeddingEvent from "@/components/organisms/WeddingEvent";
import WeddingGift from "@/components/organisms/WeddingGift";
import Wishes from "@/components/organisms/Wishes";

export default function WeddingInvitation() {
  return (
    <main className="relative mx-auto flex h-full w-full flex-col items-center bg-cream">
      <BackgroundLayers />

      <Cover />

      <BrideGroom />

      <WeddingEvent />

      <WeddingGift />

      <Wishes />
    </main>
  );
}
