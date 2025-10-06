interface StatsCardProps {
  number: string;
  label: string;
}

export default function StatsCard({ number, label }: StatsCardProps) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg">
      <h3 className="text-3xl font-bold text-indigo-600">{number}</h3>
      <p className="text-gray-600 mt-2">{label}</p>
    </div>
  );
}
