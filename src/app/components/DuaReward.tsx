import { Heart, Share2, BookOpen } from "lucide-react";
import { Button } from "./ui/button";

export interface Dua {
  id: number;
  arabic: string;
  transliteration: string;
  translation: string;
  source: string;
}

interface DuaRewardProps {
  dua: Dua;
  onContinue: () => void;
}

export function DuaReward({ dua, onContinue }: DuaRewardProps) {
  const handleShare = () => {
    const text = `🤲 Dua do Dia\n\n${dua.arabic}\n\n${dua.transliteration}\n\n"${dua.translation}"\n\n${dua.source}`;
    
    if (navigator.share) {
      navigator.share({
        title: "Dua do Dia",
        text: text,
      }).catch(() => {});
    } else {
      // Fallback: copiar para clipboard
      navigator.clipboard.writeText(text);
      alert("Dua copiada para a área de transferência!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white flex items-center justify-center p-6 animate-fade-in">
      <div className="max-w-2xl w-full space-y-6 animate-scale-in">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shadow-xl animate-bounce">
              <Heart className="w-10 h-10 text-white fill-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-emerald-900">
            🎁 Sua Recompensa
          </h1>
          <p className="text-lg text-emerald-800 font-medium">
            Você ganhou uma Dua especial para recitar
          </p>
          <div className="inline-block bg-amber-100 border-2 border-amber-300 rounded-full px-6 py-2">
            <p className="text-amber-800 font-bold text-sm">
              🌙 Dua do Dia
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6 border-2 border-emerald-100">
          {/* Texto Árabe */}
          <div className="text-center">
            <div className="text-3xl text-emerald-900 leading-loose font-arabic mb-4 p-4 bg-emerald-50 rounded-2xl">
              {dua.arabic}
            </div>
          </div>

          {/* Transliteração */}
          <div className="bg-emerald-50 rounded-2xl p-6">
            <div className="flex items-center gap-2 text-emerald-800 mb-3">
              <BookOpen className="w-5 h-5" />
              <h3 className="font-semibold">Transliteração</h3>
            </div>
            <p className="text-emerald-900 italic font-medium leading-relaxed">
              {dua.transliteration}
            </p>
          </div>

          {/* Tradução */}
          <div className="space-y-3">
            <h3 className="font-semibold text-emerald-800">Tradução</h3>
            <p className="text-emerald-900 leading-relaxed font-medium">
              "{dua.translation}"
            </p>
          </div>

          {/* Fonte */}
          <div className="pt-4 border-t border-emerald-100">
            <p className="text-sm text-emerald-600 font-medium">
              Fonte: {dua.source}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            onClick={handleShare}
            className="bg-emerald-600 hover:bg-emerald-700 text-white py-6 rounded-2xl shadow-lg flex items-center justify-center gap-2"
          >
            <Share2 className="w-5 h-5" />
            Compartilhar Dua
          </Button>
          <Button
            onClick={onContinue}
            variant="outline"
            className="border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 py-6 rounded-2xl shadow-lg"
          >
            Continuar.
          </Button>
        </div>
      </div>
    </div>
  );
}