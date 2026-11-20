import Decoration from "@/components/atoms/Decoration";
import BackgroundLayers, {
  PaperTexture,
} from "@/components/atoms/BackgroundLayers";
import SmoothScroll from "@/components/atoms/SmoothScroll";
import Cover from "@/components/organisms/Cover";
import BrideGroom from "@/components/organisms/BrideGroom";
import WeddingEvent from "@/components/organisms/WeddingEvent";
import QuranVerse from "@/components/organisms/QuranVerse";
import Wishes from "@/components/organisms/Wishes";
import MusicPlayer from "@/components/molecules/MusicPlayer";
import PetalShower from "@/components/molecules/PetalShower";

export default function WeddingInvitation({ guest }: { guest?: string }) {
  return (
    <>
      <PaperTexture />
      <SmoothScroll>
        <main className="relative mx-auto flex h-full w-full flex-col items-center overflow-x-clip">
          <BackgroundLayers />

          <Cover guest={guest} />

          <QuranVerse />

          <BrideGroom />

          <WeddingEvent />

          {/* hidden sementara: <WeddingGift /> */}

          <Wishes />
        </main>
      </SmoothScroll>
      <MusicPlayer />
      <PetalShower />
    </>
  );
}
