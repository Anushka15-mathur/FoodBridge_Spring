export default function ProcessCard({
  icon: Icon,
  title,
  description,
}) {
  return (
    <div className="group relative flex flex-col items-center text-center">
      {/* Icon */}
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary">
        <Icon className="h-10 w-10 text-primary transition-colors duration-300 group-hover:text-white" />
      </div>

      {/* Content */}
      <h3 className="mt-6 text-xl font-bold text-heading">
        {title}
      </h3>

      <p className="mt-3 max-w-xs text-sm leading-6 text-text">
        {description}
      </p>
    </div>
  );
}