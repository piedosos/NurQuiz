import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { supabase } from "../../lib/supabase";

interface AuthScreenProps {
  onAuthenticated: () => void;
  onGuest: () => void;
}

export function AuthScreen({ onAuthenticated, onGuest }: AuthScreenProps) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === "register") {
        if (!username.trim()) {
          setError("Escolha um nome de utilizador.");
          setLoading(false);
          return;
        }

        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { username: username.trim() },
          },
        });
        if (signUpError) throw signUpError;
      } else {
        const { error: signInError } =
          await supabase.auth.signInWithPassword({ email, password });
        if (signInError) throw signInError;
      }

      onAuthenticated();
    } catch (err: any) {
      setError(err?.message ?? "Ocorreu um erro. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-emerald-900">
            {mode === "login" ? "Entrar" : "Criar conta"}
          </h1>
          <p className="text-emerald-700 text-sm">
            {mode === "login"
              ? "Entre para continuar o seu progresso e ver o ranking"
              : "Crie a sua conta para guardar o progresso e competir no ranking"}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-6 space-y-4"
        >
          {mode === "register" && (
            <div className="space-y-2">
              <Label htmlFor="username">Nome de utilizador</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="ex: ahmed_92"
                required
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seuemail@exemplo.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Palavra-passe</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
              minLength={6}
              required
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 rounded-lg p-3">
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-6 rounded-xl"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : mode === "login" ? (
              "Entrar"
            ) : (
              "Criar conta"
            )}
          </Button>
        </form>

        <button
          type="button"
          onClick={() => {
            setMode(mode === "login" ? "register" : "login");
            setError(null);
          }}
          className="w-full text-center text-sm text-emerald-700 hover:underline"
        >
          {mode === "login"
            ? "Ainda não tem conta? Criar agora"
            : "Já tem conta? Entrar"}
        </button>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-emerald-100" />
          <span className="text-xs text-emerald-600">ou</span>
          <div className="flex-1 h-px bg-emerald-100" />
        </div>

        <button
          type="button"
          onClick={onGuest}
          className="w-full text-center text-sm font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-xl py-3 transition-colors"
        >
          Jogar sem criar conta
        </button>
        <p className="text-center text-xs text-emerald-600 -mt-2">
          Sem conta, o progresso fica só neste dispositivo e não entra no ranking
        </p>
      </div>
    </div>
  );
}
