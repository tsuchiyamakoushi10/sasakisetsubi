import { company, mapQuery } from "@/lib/site";

export default function MapEmbed({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-mist ${className}`}>
      <iframe
        title={`${company.name}の地図`}
        src={`https://www.google.com/maps?q=${mapQuery}&output=embed&hl=ja`}
        className="absolute inset-0 h-full w-full grayscale-[0.6]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
