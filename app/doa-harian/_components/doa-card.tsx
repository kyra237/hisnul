"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Amiri_Quran } from "next/font/google";
import type { Doa } from "@/lib/doa";
import { HugeiconsIcon } from "@hugeicons/react";
import { ChevronDown, ChevronUp } from "@hugeicons/core-free-icons";

const amiri = Amiri_Quran({ subsets: ["arabic"], weight: "400" });

interface DoaCardProps {
  doa: Doa;
  index: number;
  onTagClick?: (tag: string) => void;
}

export function DoaCard({ doa, index, onTagClick }: DoaCardProps) {
  const [showSource, setShowSource] = useState(false);

  return (
    <Card
      className="group transition-shadow duration-200 hover:shadow-md"
      style={{ animationDelay: `${(index % 10) * 40}ms` }}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          {/* Nomor */}
          <span className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-xs font-bold">
            {doa.id}
          </span>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-base leading-snug">{doa.nama}</CardTitle>
            <CardDescription className="mt-0.5 text-xs">
              {doa.grup}
            </CardDescription>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {doa.tag.map((t) => (
            <Badge
              key={t}
              variant="secondary"
              className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={() => onTagClick?.(t)}
            >
              {t}
            </Badge>
          ))}
        </div>
      </CardHeader>

      <CardContent className="space-y-5 pt-0">
        {/* Teks Arab */}
        {doa.ar && (
          <p
            className={cn(
              "text-right text-2xl leading-[2.2] font-medium text-foreground/90",
              amiri.className,
            )}
            dir="rtl"
          >
            {doa.ar}
          </p>
        )}

        {/* Transliterasi */}
        {doa.tr && (
          <p className="text-sm italic text-muted-foreground leading-relaxed border-l-2 border-primary/30 pl-3">
            {doa.tr}
          </p>
        )}

        {/* Terjemahan */}
        {doa.idn && <p className="text-sm leading-relaxed">{doa.idn}</p>}

        {/* Sumber / Tentang */}
        {doa.tentang && (
          <div>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-xs text-muted-foreground -ml-2"
              onClick={() => setShowSource((v) => !v)}
            >
              {showSource ? (
                <>
                  <HugeiconsIcon icon={ChevronUp} className="w-3 h-3 mr-1" />
                  Sembunyikan sumber
                </>
              ) : (
                <>
                  <HugeiconsIcon icon={ChevronDown} className="w-3 h-3 mr-1" />
                  Lihat sumber
                </>
              )}
            </Button>

            {showSource && (
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed whitespace-pre-line bg-muted/50 rounded-md p-3">
                {doa.tentang}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
