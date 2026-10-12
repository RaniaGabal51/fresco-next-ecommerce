import {
  IconLock,
  IconShieldCheck,
  IconTruckDelivery,
} from "@tabler/icons-react";

export default function TrustCard() {
  return (
    <div className="rounded-2xl border border-border-light bg-surface p-5 shadow-sm">
      <div className="grid grid-cols-3 divide-x divide-border-light rtl:divide-x-reverse">
        <TrustItem icon={<IconLock size={18} stroke={1.5} />} label="Secure" />
        <TrustItem
          icon={<IconTruckDelivery size={18} stroke={1.5} />}
          label="Delivery"
        />
        <TrustItem
          icon={<IconShieldCheck size={18} stroke={1.5} />}
          label="Protected"
        />
      </div>
    </div>
  );
}

function TrustItem({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5 px-2 text-center">
      <span className="text-accent">{icon}</span>
      <span className="text-[10px] font-medium text-muted">{label}</span>
    </div>
  );
}