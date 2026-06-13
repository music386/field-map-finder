import { Button } from "@/components/ui/button";

export type Role = "rlo" | "ngo" | "donor";

export function RoleSwitcher({
  role,
  onChange,
}: {
  role: Role;
  onChange: (r: Role) => void;
}) {
  const roles: { id: Role; label: string }[] = [
    { id: "rlo", label: "I'm an RLO" },
    { id: "ngo", label: "I'm an NGO" },
    { id: "donor", label: "I'm a Donor" },
  ];
  return (
    <div className="flex gap-1 rounded-md border bg-card p-1">
      {roles.map((r) => (
        <Button
          key={r.id}
          size="sm"
          variant={role === r.id ? "default" : "ghost"}
          onClick={() => onChange(r.id)}
          className="h-7 text-xs"
        >
          {r.label}
        </Button>
      ))}
    </div>
  );
}
