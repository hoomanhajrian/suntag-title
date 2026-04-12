import Link from "next/link";
import WorkOffIcon from "@mui/icons-material/WorkOff";

export const metadata = {
  title: "Careers | Sun Tag And Title",
  description: "Career opportunities at Sun Tag And Title.",
};

export default function CareersPage() {
  return (
    <main className="bg-background min-h-screen flex flex-col items-center justify-center px-6 py-24 text-center">
      <div className="max-w-md space-y-6">
        <div className="flex justify-center text-gold-base">
          <WorkOffIcon style={{ fontSize: 64 }} />
        </div>
        <h1 className="text-4xl font-bold text-text-base">Careers</h1>
        <div className="flex justify-center gap-2">
          <div className="h-1 w-8 bg-blue-base rounded-full" />
          <div className="h-1 w-8 bg-red-base rounded-full" />
          <div className="h-1 w-8 bg-gold-base rounded-full" />
        </div>
        <p className="text-text-base/60 text-lg">
          There are no positions available at the moment. Please check back
          later.
        </p>
        <Link
          href="/"
          className="inline-block px-10 py-3 bg-blue-base text-text-base font-semibold uppercase tracking-wider rounded-sm hover:bg-blue-glow transition-colors duration-200"
        >
          Go Back Home
        </Link>
      </div>
    </main>
  );
}
