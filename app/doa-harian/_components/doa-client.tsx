"use client";

import * as React from "react";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox";
import type { Doa } from "@/lib/doa";
import { DoaCard } from "./doa-card";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon, SearchIcon } from "@hugeicons/core-free-icons";

// ── Ekstrak semua grup & tag unik ─────────────────────────────────────────
function extractMeta(doas: Doa[]) {
  const grupSet = new Set<string>();
  const tagSet = new Set<string>();
  doas.forEach((d) => {
    grupSet.add(d.grup);
    d.tag.forEach((t) => tagSet.add(t));
  });
  return {
    grups: Array.from(grupSet),
    // "umum" ditaruh paling belakang supaya tag spesifik lebih mudah ditemukan
    tags: Array.from(tagSet)
      .filter((t) => t !== "umum")
      .sort()
      .concat("umum"),
  };
}

// ── Sub-komponen: Tag Combobox ─────────────────────────────────────────────
interface TagComboboxProps {
  tags: string[];
  selectedTags: string[];
  onChange: (tags: string[]) => void;
}

function TagCombobox({ tags, selectedTags, onChange }: TagComboboxProps) {
  const anchor = useComboboxAnchor();

  return (
    <Combobox
      multiple
      autoHighlight
      items={tags}
      value={selectedTags}
      onValueChange={onChange}
    >
      <ComboboxChips ref={anchor} className="min-h-9 w-full flex-1 text-xs">
        <ComboboxValue>
          {(values: string[]) => (
            <React.Fragment>
              {values.map((value) => (
                <ComboboxChip key={value} className="text-xs h-5 px-1.5">
                  {value}
                </ComboboxChip>
              ))}
              <ComboboxChipsInput
                placeholder={
                  selectedTags.length === 0 ? "Filter berdasarkan tag…" : ""
                }
                className="text-xs"
              />
            </React.Fragment>
          )}
        </ComboboxValue>
      </ComboboxChips>

      <ComboboxContent anchor={anchor} className="text-xs">
        <ComboboxEmpty>Tag tidak ditemukan.</ComboboxEmpty>
        <ComboboxList>
          {(tag: string) => (
            <ComboboxItem key={tag} value={tag} className="text-xs">
              {tag}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

// ── Komponen Utama ─────────────────────────────────────────────────────────
interface DoaClientProps {
  initialDoas: Doa[];
}

export function DoaClient({ initialDoas }: DoaClientProps) {
  const [query, setQuery] = useState("");
  const [activeGrup, setActiveGrup] = useState<string>("semua");
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const { grups, tags } = useMemo(
    () => extractMeta(initialDoas),
    [initialDoas],
  );

  // ── Filter Logic ────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return initialDoas.filter((doa) => {
      const matchGrup = activeGrup === "semua" || doa.grup === activeGrup;
      // Doa harus memiliki SEMUA tag yang dipilih (AND logic)
      const matchTags =
        activeTags.length === 0 || activeTags.every((t) => doa.tag.includes(t));
      const matchQuery =
        !q ||
        doa.nama.toLowerCase().includes(q) ||
        doa.ar.toLowerCase().includes(q) ||
        doa.tr.toLowerCase().includes(q) ||
        doa.idn.toLowerCase().includes(q) ||
        doa.grup.toLowerCase().includes(q);
      return matchGrup && matchTags && matchQuery;
    });
  }, [initialDoas, query, activeGrup, activeTags]);

  const hasFilter = query || activeGrup !== "semua" || activeTags.length > 0;

  function resetFilter() {
    setQuery("");
    setActiveGrup("semua");
    setActiveTags([]);
  }

  // Saat klik tag dari card, tambahkan ke activeTags jika belum ada
  function handleTagClick(tag: string) {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 space-y-8">
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Doa Harian</h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {initialDoas.length} doa &amp; dzikir bersumber dari Al-Qur&apos;an
          dan Hadits Shahih.
        </p>
      </div>

      {/* ── Sticky Filter Area ─────────────────────────────────────────── */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm py-3 -mx-4 px-4 border-b space-y-3">
        {/* Search */}
        <div className="relative">
          <HugeiconsIcon
            icon={SearchIcon}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none"
          />
          <Input
            placeholder="Cari doa, terjemahan, atau transliterasi…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9 pr-9"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <HugeiconsIcon icon={Cancel01Icon} className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Grup + Tag Combobox */}
        <div className="flex gap-2 items-start">
          {/* Grup dropdown */}
          <Select value={activeGrup} onValueChange={setActiveGrup}>
            <SelectTrigger className="w-50 shrink-0 h-9 text-xs">
              <SelectValue placeholder="Semua Grup" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="semua" className="text-xs">
                Semua Grup
              </SelectItem>
              {grups.map((g) => (
                <SelectItem key={g} value={g} className="text-xs">
                  {g}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Tag combobox multiple */}
          <TagCombobox
            tags={tags}
            selectedTags={activeTags}
            onChange={setActiveTags}
          />
        </div>

        {/* Hasil + active tags + reset */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-xs text-muted-foreground">
              Menampilkan{" "}
              <strong className="text-foreground">{filtered.length}</strong>{" "}
              dari {initialDoas.length} doa
            </p>
            {/* Tampilkan active tags sebagai badge kecil */}
            {activeTags.length > 0 && (
              <div className="flex gap-1 flex-wrap">
                {activeTags.map((t) => (
                  <Badge
                    key={t}
                    variant="default"
                    className="text-xs h-5 px-1.5 cursor-pointer"
                    onClick={() => handleTagClick(t)}
                  >
                    {t} ×
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {hasFilter && (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 text-xs shrink-0"
              onClick={resetFilter}
            >
              <HugeiconsIcon icon={Cancel01Icon} className="w-3 h-3 mr-1" />
              Reset
            </Button>
          )}
        </div>
      </div>

      {/* ── Daftar Doa ───────────────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 space-y-2">
          <p className="text-4xl">🔍</p>
          <p className="font-medium">Doa tidak ditemukan</p>
          <p className="text-sm text-muted-foreground">
            Coba ubah kata kunci atau filter yang digunakan.
          </p>
          <Button variant="outline" size="sm" onClick={resetFilter}>
            Reset filter
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((doa, i) => (
            <DoaCard
              key={doa.id}
              doa={doa}
              index={i}
              onTagClick={handleTagClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}
