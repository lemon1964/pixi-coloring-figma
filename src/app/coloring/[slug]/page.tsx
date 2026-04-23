import { notFound } from "next/navigation";
import ColoringWorkspace from "@/components/coloring/ColoringWorkspace";
import { getColoringItemBySlug } from "@/data/coloring/coloringItems";

interface ColoringPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ColoringPage({ params }: ColoringPageProps) {
  const item = getColoringItemBySlug((await params).slug);

  if (!item) {
    notFound();
  }

  return <ColoringWorkspace item={item} />;
}