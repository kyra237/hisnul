// lib/doa.ts
export interface Doa {
  id: number;
  grup: string;
  nama: string;
  ar: string;
  tr: string;
  idn: string;
  tentang: string;
  tag: string[];
}

export interface DoaResponse {
  status: string;
  total: number;
  data: Doa[];
}

export async function getAllDoa(): Promise<Doa[]> {
  const res = await fetch("https://equran.id/api/doa", {
    next: { revalidate: 86400 }, // cache 24 jam
  });
  if (!res.ok) throw new Error("Gagal mengambil data doa");
  const json: DoaResponse = await res.json();
  return json.data;
}
