import { ChartProps, Scatter } from "react-chartjs-2";
import { Layout } from "../../components/layout/layout";
import { Chart, CategoryScale, LinearScale, TimeScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useWifiClientsQuery, useWifiClientsRssiReportsQuery } from "../../features/wifi-clients/wifi-clients.api";
import { useMemo, useState } from "react";
import moment, { Moment } from "moment";
import { Button, CircularProgress, TextField } from "@mui/material";
import { GranularitySelector } from "../../components/granularity-selector/granularity-selector";
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
  const [granularity, setGranularity] = useState(15);
  const [agentId, setAgentId] = useState<string>();
  const [startDate, setStartDate] = useState<Moment | null>(null);
  const [endDate, setEndDate] = useState<Moment | null>(null);

  const { data: clients } = useWifiClientsQuery();
  const { data: reports, isFetching, refetch } = useWifiClientsRssiReportsQuery(agentId, granularity, startDate?.toDate(), endDate?.toDate());
  const data = useMemo(() => clients && reports ? {
    datasets: clients.map((client, i) => ({
      label: client.name || `Unammed-${i}`,
      data: reports.flatMap((report, i) => {
        const date: moment.Moment = moment(report.date);
        const c = report.clients.find(c => c.mac === client.mac);
        const result = [{ x: date, y: c?.rssi || null }];
        const lastReport = reports[i-1] || report;
        const lastDate: moment.Moment = moment(lastReport.date);
        if (date.diff(lastDate, 'minutes') > granularity) result.unshift({x: lastDate, y: null});
        return result;
      }),
      borderColor: 'hsl(' + (360 * i / clients.length) + ', 100%, 50%)',
    })),
  } : {
    datasets: [],
  }, [clients, reports]);

  return <Layout>
    <div className='wifi-clients-reports-page-container'>
      <div className='top'>
        <AgentSelector selectIfEmpty value={agentId} onChange={agent => setAgentId(agent?._id)}  />
        <GranularitySelector
          value={granularity}
          onChange={setGranularity}
          granularities={[
            { value: 1, label: '1m' },
            { value: 5, label: '5m' },
            { value: 15, label: '15m' },
            { value: 30, label: '30m' },
            { value: 60, label: '1h' },
            { value: 60 * 6, label: '6h' },
          ]}
        />
        <DateTimePicker
          label="Start date"
          value={startDate}
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
