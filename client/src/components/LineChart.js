import React from 'react';
import { Card } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { useLog } from '../contexts/LogContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function LineChart() {
  const { log } = useLog();
  const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
  const labels = [];
  const data = [];
  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  // setting the labels to the last 7 days
  for (let i = 6; i >= 0; i--) {
    let d = new Date();
    d.setDate(d.getDate() - i);
    labels.push(days[d.getDay()]);
  }

  // setting data for each day
  for (let i = 6; i >= 0; i--) {
    let total = 0;
    let day = new Date();
    day.setDate(day.getDate() - i);
    log.map((exercise) => {
      let logDate = new Date(parseInt(exercise.date));
      if (
        day.getFullYear() == logDate.getFullYear() &&
        day.getMonth() == logDate.getMonth() &&
        day.getDate() == logDate.getDate()
      ) {
        total += exercise.duration;
      }
    });
    // console.log(total, day);
    data.push(total);
  }

  return (
    <Card>
      <Card.Header>Daily Activity</Card.Header>
      <Line
        data={{
          labels: labels,
          datasets: [
            {
              label: 'Daily Activity (in minutes)',
              borderColor: '#0d6efd',
              backgroundColor: '#0d6efd',
              data: data,
            },
          ],
        }}
        height={122}
        width={300}
        options={options}
      />
    </Card>
  );
}
