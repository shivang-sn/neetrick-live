import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import Faq from "@/components/Faq";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact — Neetrick",
  description: "Tell us about your project. Based in Jamnagar, Gujarat.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        kicker="Contact"
        title={<>Let&apos;s talk.</>}
        intro="Tell us about your project and we'll get back within one business day."
      />

      <section className="container-x grid gap-16 pb-24 md:grid-cols-[1.3fr_0.7fr]">
        <ContactForm />

        <div className="space-y-8">
          <div>
            <div className="kicker mb-2">Email</div>
            <a
              href={`mailto:${SITE.email}`}
              data-cursor="link"
              className="text-fluid-body hover:text-accent"
            >
              {SITE.email}
            </a>
          </div>
          <div>
            <div className="kicker mb-2">Phone</div>
            <p className="text-fluid-body">{SITE.phone}</p>
          </div>
          <div>
            <div className="kicker mb-2">Studio</div>
            <p className="text-fluid-body">{SITE.location}</p>
          </div>
          <div className="flex gap-4 kicker">
            <a href="#" data-cursor="link" className="hover:text-accent">Instagram</a>
            <a href="#" data-cursor="link" className="hover:text-accent">LinkedIn</a>
            <a href="#" data-cursor="link" className="hover:text-accent">X</a>
          </div>
        </div>
      </section>

      <Faq />
    </>
  );
}
