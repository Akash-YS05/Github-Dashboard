// components/Dashboard/PullRequestChart.tsx
import { LineChart, Line, XAxis, YAxis } from 'recharts';

const PRChart = () => (
  <div className="bg-white p-4 rounded-lg shadow">
    <h2 className="text-lg font-bold mb-4">Pull Requests</h2>
    <LineChart width={500} height={300}>
      <XAxis dataKey="date" />
      <YAxis />
      <Line type="monotone" dataKey="count" stroke="#8884d8" />
    </LineChart>
  </div>
)

export default PRChart