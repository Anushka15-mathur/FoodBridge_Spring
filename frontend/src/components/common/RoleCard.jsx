export default function RoleCard({
  icon: Icon,
  title,
  description,
}) {
  return (
    <div className="group rounded-3xl border border-primary/10 bg-card p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-primary hover:shadow-xl">

      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 transition-all duration-300 group-hover:bg-primary">
        <Icon className="h-10 w-10 text-primary transition-colors duration-300 group-hover:text-white" />
      </div>

      <h3 className="mb-4 text-2xl font-bold text-heading">
        {title}
      </h3>

      <p className="leading-7 text-text">
        {description}
      </p>

    </div>
  );
}