import Link from "next/link";

export default function SettingsPage() {
  const sections = [
    {
      title: "Webhooks",
      description: "Configure webhook integrations for repositories",
      href: "/settings/webhooks",
    },
    {
      title: "Templates",
      description: "Manage checklist templates",
      href: "/settings/templates",
    },
    {
      title: "Team",
      description: "Manage team members and permissions",
      href: "/settings/team",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Configure your QA Merge Desk workspace
        </p>
      </div>

      <div className="grid gap-4">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="block border border-border rounded-lg p-6 bg-card hover:bg-muted/50 transition-colors"
          >
            <h2 className="text-lg font-semibold text-foreground mb-1">
              {section.title}
            </h2>
            <p className="text-sm text-muted-foreground">
              {section.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
