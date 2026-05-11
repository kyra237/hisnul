import { getAllDoa } from "@/lib/doa";
import { DoaClient } from "./_components/doa-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Doa Harian",
  description:
    "Kumpulan doa dan dzikir harian bersumber dari Al-Qur'an dan Hadits Shahih.",
};

export default async function DoaHarianPage() {
  const doas = await getAllDoa();
  return <DoaClient initialDoas={doas} />;
}
