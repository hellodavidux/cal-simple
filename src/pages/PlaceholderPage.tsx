type PlaceholderPageProps = {
  title: string;
};

export function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <div className="mx-auto max-w-5xl rounded-xl border border-cal-border bg-cal-surface p-6 md:p-8">
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-2 text-sm text-cal-muted">This page is not implemented yet.</p>
    </div>
  );
}
