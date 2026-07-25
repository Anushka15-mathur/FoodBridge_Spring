export default function TestimonialCard({
  name,
  role,
  message,
}) {
  return (
    <div className="rounded-3xl border border-primary/10 bg-card p-8 shadow-sm transition-all duration-300 hover:shadow-xl">
      <p className="italic leading-8 text-text">
        "{message}"
      </p>

      <div className="mt-8">
        <h4 className="font-bold text-heading">
          {name}
        </h4>

        <p className="text-sm text-primary">
          {role}
        </p>
      </div>
    </div>
  );
}