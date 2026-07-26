export default function FormSection({
  title,
  description,
  children,
}) {
  return (
    <section className="space-y-4">

      <div>

        <h2 className="text-xl font-semibold text-heading">
          {title}
        </h2>

        {description && (
          <p className="mt-1 text-sm text-text">
            {description}
          </p>
        )}

      </div>

      {children}

    </section>
  );
}