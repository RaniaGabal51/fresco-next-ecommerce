import LoginHero from "../components/login/LoginHero";
import LoginForm from "../components/login/LoginForm";

export default function LoginScreen() {
  return (
    <main className="bg-background px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
      <div
        className="
          mx-auto
          grid
          max-w-6xl
          overflow-hidden
          rounded-3xl
          border border-border
          bg-surface
          shadow-[0_20px_60px_rgba(25,55,44,0.08)]
          lg:min-h-[650px]
          lg:grid-cols-[0.9fr_1.1fr]
        "
      >
        <LoginHero />
        <LoginForm />
      </div>
    </main>
  );
}