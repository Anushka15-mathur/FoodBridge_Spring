export default function FeatureCard({
  icon: Icon,
  title,
  description,
}) {
  return (
    <div className="group rounded-3xl border border-primary/10 bg-card p-8 transition-all duration-300 hover:-translate-y-2 hover:border-primary hover:shadow-xl">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 transition-all duration-300 group-hover:bg-primary">
        <Icon className="h-8 w-8 text-primary transition-colors group-hover:text-white" />
      </div>

      <h3 className="mb-4 text-xl font-bold text-heading">
        {title}
      </h3>

      <p className="leading-7 text-text">
        {description}
      </p>
    </div>
  );
}