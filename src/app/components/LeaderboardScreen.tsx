import { useEffect, useState } from "react";
import { Trophy, ArrowLeft, Loader2, Medal } from "lucide-react";
import { Button } from "./ui/button";
import { supabase } from "../../lib/supabase";

interface LeaderboardEntry {
  username: string;
  total_score: number;
}

interface LeaderboardScreenProps {
  currentUsername: string | null;
  onBack: () => void;
}

export function LeaderboardScreen({
  currentUsername,
  onBack,
}: LeaderboardScreenProps) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const { data, error } = await supabase
        .from("leaderboard")
        .select("username, total_score");

      if (!error && data) {
        setEntries(data as LeaderboardEntry[]);
      }
      setLoading(false);
    };

    fetchLeaderboard();
  }, []);

  const medalColor = (index: number) => {
    if (index === 0) return "text-yellow-500";
    if (index === 1) return "text-gray-400";
    if (index === 2) return "text-amber-700";
    return "text-emerald-300";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white p-6">
      <div className="max-w-md mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-full hover:bg-emerald-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-emerald-800" />
          </button>
          <h1 className="text-2xl font-bold text-emerald-900 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-emerald-600" />
            Ranking
          </h1>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
          </div>
        ) : entries.length === 0 ? (
          <p className="text-center text-emerald-700 py-12">
            Ainda não há pontuações registadas. Seja o primeiro!
          </p>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg divide-y divide-emerald-50">
            {entries.map((entry, index) => (
              <div
                key={entry.username}
                className={`flex items-center justify-between p-4 ${
                  entry.username === currentUsername
                    ? "bg-emerald-50"
                    : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <Medal className={`w-5 h-5 ${medalColor(index)}`} />
                  <span className="font-medium text-emerald-900">
                    #{index + 1} {entry.username}
                  </span>
                </div>
                <span className="font-bold text-emerald-700">
                  {entry.total_score} pts
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
