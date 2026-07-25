export default function SectionHeader({
  eyebrow,
  title,
  description,
}) {
  return (
    <div className="mx-auto mb-16 max-w-3xl text-center">
      {eyebrow && (
        <p className="font-semibold uppercase tracking-widest text-primary">
          {eyebrow}
        </p>
      )}

      <h2 className="mt-4 text-4xl font-extrabold text-heading">
        {title}
      </h2>

      {description && (
        <p className="mt-5 text-lg leading-8 text-text">
          {description}
        </p>
      )}
    </div>
  );
}