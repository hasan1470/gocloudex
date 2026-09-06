import Link from "next/link";
import ThemeSettings from "@/components/client/layout/ThemeSettings";

export default function AdminSettings() {
  return (
    <div className="gc-admin-settings">
      <h1 className="text-3xl font-semibold text-headingLight heading-style">
        Workspace settings
      </h1>
      <p className="text-textLight mt-3">
        A more comfortable space for your everyday work.
      </p>
      <section className="bg-bgLight border border-border rounded-xl p-6 sm:p-8 mt-8">
        <h2 className="text-xl font-semibold text-headingLight">
          Appearance & readability
        </h2>
        <p className="text-textLight mt-3 mb-6">
          Choose a color palette, switch between light and dark, or make the
          text larger. Your preferences apply to the website and this dashboard,
          and are saved in this browser.
        </p>
        <ThemeSettings label="Customize appearance" />
      </section>
      <Link href="/" className="inline-block mt-6 text-primary font-medium">
        View the website ↗
      </Link>
    </div>
  );
}
