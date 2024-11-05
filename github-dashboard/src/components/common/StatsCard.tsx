interface StatsCardProps {
    title: string,
    value: number,
    description: string
}

export const StatsCard = ({title, value, description}: StatsCardProps) => {
    <div className="p-4 bg-white rounded-lg shadow">
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm text-gray-500">{description}</p>
    </div>
}