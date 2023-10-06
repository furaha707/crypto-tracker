import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexCharts from "react-apexcharts";

interface IHistorical {
  time_open: number,
  time_close: number,
  open: string,
  high: string,
  low: string,
  close: number,
  volume: string,
  market_cap: number
}

interface ChartProps {
  coinId: string;
}

interface dataType {
    x: number;
    y: (string | number)[];
}

function Chart({coinId}: ChartProps){
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId))
  // 세번째 인자에 refetchInterval 옵션 추가했는데, api 횟수 제한 때문에 지워둠

  return <div> {isLoading ? "Loading Chart..." : <ApexCharts
  type="candlestick"
  series={[
    {
      data: data?.map(price => ({
        x: price.time_close,
        y: [price.open, price.high, price.low, price.close],
      })) as dataType[],
    },
  ]}
  options={{
    theme: {
      mode: "dark",
    },
    chart: {
      height: 500,
      width: 500,
      toolbar: {
        tools: {},
      },
      background: "transparent",
    },
    grid: {
      show: false,
    },
    plotOptions: {
      candlestick: {
        wick: {
          useFillColor: true,
        },
      },
    },
    xaxis: {
      labels: {
        show: false,
        datetimeFormatter: {
          month: "mmm 'yy",
        },
      },
      type: "datetime",
      categories: data?.map(date => date.time_close),
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
    tooltip: {
      y: {
        formatter: v => `$ ${v.toFixed(2)}`,
      },
    },
  }} />
}
  </div>
  // <div>{isLoading ? "Loading chart..." : <ApexCharts type="line" series={[
  //   {
  //     name: "sales",
  //     data: data?.map((price) => price.close) as number[],
  //   },
  // ]}
  // options={{
  //   chart: {
  //     height: 300,
  //     width: 300,
  //     toolbar: {
  //       show: false,
  //     }
  //   },
  //   // grid: {
  //   //   show: false,
  //   // },
  //   stroke: {
  //     curve: "smooth",
  //     width: 4,
  //   },
  //   theme: {
  //     monochrome: {
  //       enabled: true,
  //       color: '#255aee',
  //       shadeTo: 'light',
  //       shadeIntensity: 0.65
  //     }
  //   },
  //   xaxis: {
  //     axisBorder: {show:false},
  //     type: "datetime",
  //     categories: data?.map((time) => time.time_close)
  //   },
  //   fill: {
  //     colors: ['#F44336', '#E91E63', '#9C27B0'],
  //     type: "gradient",
  //     gradient: {gradientToColors: ["orange"]}
  //   },
  //   tooltip: {
  //     y: {
  //       formatter: (value) => `$${value.toFixed(2)}`
  //     }
  //   }
  // }}
  // />}</div>;
}

export default Chart;