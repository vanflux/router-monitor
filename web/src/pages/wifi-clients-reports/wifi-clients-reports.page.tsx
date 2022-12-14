import { ChartProps, Scatter } from "react-chartjs-2";
import { Layout } from "../../components/layout/layout";
import { Chart, CategoryScale, LinearScale, TimeScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useWifiClientsQuery, useWifiClientsRssiReportsQuery } from "../../features/wifi-clients/wifi-clients.api";
import { useMemo, useState } from "react";
import moment, { Moment } from "moment";
import { Button, CircularProgress, TextField } from "@mui/material";
import { PrecisionSelector } from "../../components/precision-selector/precision-selector";
import { AgentSelector } from "../../components/agent-selector/agent-selector";
import RefreshIcon from '@mui/icons-material/Refresh';
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import './wifi-clients-reports.page.scss';

Chart.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export type ScatterOptions = ChartProps<"scatter">['options'];

const options: ScatterOptions = {
  responsive: true,
  showLine: true,
  spanGaps: false,
  datasets: {
    scatter: {
      pointRadius: 1,
      fill: false,
      pointHoverRadius: 1
    }
  },
  scales: {
    x: {
      type: 'time',
      time: {
        unit: 'hour'
      }
    }
  },
  elements: {
    line: {
      tension: 0,
    }
  },
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Wifi Clients RSSI Reports',
    },
  },
  animation: false,
};

export function WifiClientsReportsPage() {
  const [precision, setPrecision] = useState(75);
  const [agentId, setAgentId] = useState<string>();
  const [startDate, setStartDate] = useState<Moment | null>(moment().subtract(1, 'day'));
  const [endDate, setEndDate] = useState<Moment | null>(null);

  const { data: clients } = useWifiClientsQuery();
  const { data: reports, isFetching, refetch } = useWifiClientsRssiReportsQuery(agentId, precision, startDate?.toDate(), endDate?.toDate());
  const data = useMemo(() => {
    if (clients && reports?.length) {
      // Calculate threshold for considering reports break or not
      const threshold = reports
      .slice(1)
      .map((report, i) => moment(report.date).diff(moment(reports[i].date), 'minutes'))
      .sort((a, b) => b - a)
      .slice(Math.floor(reports.length * 0.2))
      .reduce((a, b) => a + b) / (reports.length * 0.2);

      return {
        datasets: clients.map((client, i) => ({
          label: client.name || `Unammed-${i}`,
          data: reports.flatMap((report, i) => {
            const date = moment(report.date);
            const rssi = report.clients.find(c => c.mac === client.mac)?.rssi || null;
            const result = [{ x: date, y: rssi }];
            const lastReport = reports[i-1] || report;
            const lastDate = moment(lastReport.date);
            if (date.diff(lastDate, 'minutes') > threshold) result.unshift({x: lastDate, y: null});
            return result;
          }),
          borderColor: 'hsl(' + (360 * i / clients.length) + ', 100%, 50%)',
        })),
      };
    }
    return { datasets: [] }
  }, [clients, reports]);

  return <Layout>
    <div className='wifi-clients-reports-page-container'>
      <div className='top'>
        <AgentSelector selectIfEmpty value={agentId} onChange={agent => setAgentId(agent?._id)}  />
        <PrecisionSelector
          value={precision}
          onChange={setPrecision}
          precisions={[
            { value: 10, label: '10' },
            { value: 25, label: '25' },
            { value: 50, label: '50' },
            { value: 75, label: '75' },
            { value: 100, label: '100' },
          ]}
        />
        <DateTimePicker
          label="Start date"
          value={startDate}
          closeOnSelect={false}
          renderInput={(params) => <TextField {...params} />}
          onChange={setStartDate}
        />
        <DateTimePicker
          label="End date"
          value={endDate}
          renderInput={(params) => <TextField {...params} />}
          onChange={setEndDate}
        />
        <Button onClick={() => refetch()} variant='outlined'>
          <RefreshIcon />
        </Button>
      </div>
      <div className='bottom'>
        {isFetching ? (
          <CircularProgress sx={{ display: 'flex' }} />
        ) : (
          <Scatter options={options} data={data} />
        )}
      </div>
    </div>
  </Layout>;
}
