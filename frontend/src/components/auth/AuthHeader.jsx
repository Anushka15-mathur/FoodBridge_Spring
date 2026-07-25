export default function AuthHeader({
  title,
  subtitle,
}) {
  return (
    <div className="mb-8 text-center">
      <h1 className="text-3xl font-bold text-heading">
        {title}
      </h1>

      <p className="mt-2 text-text">
        {subtitle}
      </p>
    </div>
  );
}