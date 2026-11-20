import WeddingInvitation from "@/components/organisms/WeddingInvitation";

// Nama tamu dari link, mis. /?to=Bapak%20Budi. Tanpa ?to= tampil "Tamu Undangan".
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ to?: string | string[] }>;
}) {
  const { to } = await searchParams;
  const guest = (Array.isArray(to) ? to[0] : to)?.trim().slice(0, 60) || undefined;
  return <WeddingInvitation guest={guest} />;
}
