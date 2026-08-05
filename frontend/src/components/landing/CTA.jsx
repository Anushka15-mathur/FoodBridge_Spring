import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="rounded-[40px] bg-primary px-10 py-20 text-center text-white shadow-xl">

          <h2 className="text-4xl font-extrabold">
            Ready to Make a Difference?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90">
            Join FoodBridge today and help reduce food waste while supporting
            communities across the country.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-5">
            <Link
              to="/register"
              className="w-full rounded-2xl bg-white px-6 py-3 text-center text-sm font-semibold text-primary transition-all duration-300 hover:bg-slate-100 sm:w-auto sm:inline-flex sm:items-center sm:justify-center"
            >
              Register Now
            </Link>

            <a
              href="#how-it-works"
              className="w-full rounded-2xl border-2 border-white bg-transparent px-6 py-3 text-center text-sm font-semibold text-white transition-all duration-300 hover:bg-white hover:text-primary sm:w-auto sm:inline-flex sm:items-center sm:justify-center"
            >
              Learn More
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}