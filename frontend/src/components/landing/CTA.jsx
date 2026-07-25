import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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

            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90"
            >
              Register Now
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-primary transition-all duration-300"
            >
              Learn More
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

          </div>

        </div>

      </div>
    </section>
  );
}