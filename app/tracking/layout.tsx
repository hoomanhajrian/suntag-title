// Tracking pages get their own shell — no site-wide Navigation or Footer
export default function TrackingLayout({ children }: { children: React.ReactNode }) {
  return <div className="bg-background min-h-screen">{children}</div>;
}
