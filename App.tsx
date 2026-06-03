import React, { useState, useRef } from 'react';
import { Heart, Bookmark, Share2, CheckCircle2, ChevronLeft } from 'lucide-react';

const BASE_FEEDS = [
  {
    id: 1,
    username: 'beauty_creators_ami',
    productName: 'ルージュ ココ フラッシュ',
    price: '¥5,500',
    videoSrc: '/Video Project.mp4',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&auto=format&fit=crop&q=80',
    linkUrl: 'https://www.cosme.net/products/10166956/',
    userMeta: '混合肌 / 20代後半',
    isVerified: true
  },
  {
    id: 2,
    username: 'skincare_lover',
    productName: 'グリーンダーマ マイルドシカクリーム',
    price: '¥2,800',
    videoSrc: '/hera.mp4',
    image: '/CICA.jpg',
    linkUrl: 'https://www.cosme.net/',
    userMeta: '乾燥肌 / 30代前半',
    isVerified: true
  },
  {
    id: 3,
    username: 'makeup_addict_y',
    productName: 'クチュール ミニ クラッチ 400',
    price: '¥9,900',
    videoSrc: '/ysldayo.mp4',
    image: '/goldysl.jpeg',
    linkUrl: 'https://www.cosme.net/',
    userMeta: '脂性肌 / 20代前半',
    isVerified: true
  }
];

export default function App() {
  const [feeds, setFeeds] = useState(BASE_FEEDS);
  const [toast, setToast] = useState<string | null>(null);
  const [active, setActive] = useState<Record<number, { like: boolean, save: boolean }>>({});
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggle = (id: number, type: 'like' | 'save') => {
    setActive(prev => ({
      ...prev,
      [id]: { ...prev[id], [type]: !prev[id]?.[type] }
    }));
  };

  // 無限スクロール処理
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      if (scrollHeight - scrollTop <= clientHeight + 100) {
        setFeeds(prev => [...prev, ...BASE_FEEDS]);
      }
    }
  };

  return (
    <div className="w-full h-screen bg-black flex justify-center items-center">
      <div className="w-[402px] h-[810px] bg-black relative overflow-hidden shadow-2xl rounded-[40px] border-[8px] border-zinc-800 mx-auto mt-10">
        
        {/* 左上の戻るボタン */}
        <button className="absolute top-6 left-4 z-50 text-white p-2">
          <ChevronLeft size={28} strokeWidth={2.5} />
        </button>

        {/* 通知用トースト */}
        {toast && <div className="absolute top-10 left-4 right-4 z-50 bg-emerald-600 text-white p-3 rounded-xl font-bold text-sm shadow-lg">{toast}</div>}
        
        <div ref={scrollRef} onScroll={handleScroll} className="h-full overflow-y-scroll snap-y snap-mandatory">
          {feeds.map((feed, index) => (
            <div key={index} className="w-full h-full snap-start relative flex flex-col justify-end">
              
              {/* 動画・画像レイヤー */}
              {feed.videoSrc ? (
                <video src={feed.videoSrc} className="absolute inset-0 w-full h-full object-cover z-0" autoPlay muted loop playsInline />
              ) : (
                <img src={feed.image} className="absolute inset-0 w-full h-full object-cover z-0" alt="product" />
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />

              {/* 右側メニュー */}
              <div className="absolute right-4 bottom-40 z-20 flex flex-col gap-6 text-white">
                <button onClick={() => toggle(feed.id, 'like')} className="flex flex-col items-center">
                  <Heart size={32} fill={active[feed.id]?.like ? "red" : "none"} color={active[feed.id]?.like ? "red" : "white"} />
                  <span className="text-xs font-bold mt-1">いいね</span>
                </button>
                <button onClick={() => toggle(feed.id, 'save')} className="flex flex-col items-center">
                  <Bookmark size={32} fill={active[feed.id]?.save ? "gold" : "none"} color={active[feed.id]?.save ? "gold" : "white"} />
                  <span className="text-xs font-bold mt-1">保存</span>
                </button>
                <button className="flex flex-col items-center">
                  <Share2 size={32} color="white" />
                  <span className="text-xs font-bold mt-1">シェア</span>
                </button>
              </div>

              {/* 商品情報エリア */}
              <div className="p-6 z-20">
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-bold text-white text-sm">@{feed.username}</span>
                  <span className="flex items-center gap-0.5 bg-blue-600 text-[10px] text-white px-1.5 py-0.5 rounded-full font-bold">
                    <CheckCircle2 size={10} /> 購入済
                  </span>
                </div>
                
                <button className="bg-white/10 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full mb-3 border border-white/10 hover:bg-white/20 transition-all">
                  {feed.userMeta}
                </button>

                <div className="bg-transparent p-1 text-white">
                  <h4 className="font-bold text-lg truncate">{feed.productName}</h4>
                  <p className="text-2xl font-black mt-1 mb-4 text-emerald-400">{feed.price}</p>
                  <div className="flex gap-3">
                    <button onClick={() => window.open(feed.linkUrl, '_blank')} className="flex-1 bg-white/20 hover:bg-white/30 py-3 rounded-xl text-sm font-bold border border-white/20">詳細を表示</button>
                    <button onClick={() => setToast(`🛒 ${feed.productName} をカートに追加`)} className="flex-1 bg-emerald-500 hover:bg-emerald-600 py-3 rounded-xl text-sm font-bold">カートに追加</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}