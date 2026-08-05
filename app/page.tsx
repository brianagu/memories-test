import { getMediaAssets } from '@/lib/media';
import { Nav } from '@/components/Nav';
import { Gallery } from '@/components/Gallery';

export default function Home() {
  const assets = getMediaAssets();

  return (
    <div className="min-h-screen bg-black text-white">
      <Nav />

      <main className="py-20">
        <Gallery assets={assets} />
      </main>
    </div>
  );
}
