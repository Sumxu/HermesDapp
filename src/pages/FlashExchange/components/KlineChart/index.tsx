import React, { useEffect, useRef, useState, useCallback, memo } from "react";
import "./index.scss";
import {
  createChart,
  CandlestickSeries,
  type IChartApi,
  type ISeriesApi,
  type Time,
} from "lightweight-charts";

import { Spin } from "antd";

import NetworkRequest from "@/Hooks/NetworkRequest.ts";

export type Timeframe = "5m" | "30m" | "1h" | "1d" | "1w";

interface KlineChartProps {
  height?: number;
  defaultTimeframe?: Timeframe;
}

const timeframeMap = {
  "5m": 1,
  "30m": 2,
  "1h": 3,
  "1d": 4,
  "1w": 5,
};

const timeframes: { label: string; value: Timeframe }[] = [
  { label: "5分钟", value: "5m" },
  { label: "30分钟", value: "30m" },
  { label: "1小时", value: "1h" },
  { label: "1天", value: "1d" },
  { label: "1周", value: "1w" },
];

const KlineChart: React.FC<KlineChartProps> = ({
  height = 340,
  defaultTimeframe = "1h",
}) => {
  const [hzPrice, setHzPrice] = useState<number>(0);

  const chartContainerRef = useRef<HTMLDivElement>(null);

  const chartRef = useRef<IChartApi | null>(null);

  const candleSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

  const [currentTF, setCurrentTF] = useState<Timeframe>(defaultTimeframe);

  const [isLoading, setIsLoading] = useState(false);

  // 获取K线数据
  const getKlineData = useCallback(async (tf: Timeframe) => {
    try {
      setIsLoading(true);

      const result = await NetworkRequest({
        Url: "convert/kline",
        Method: "get",
        Data: {
          type: timeframeMap[tf],
        },
      });

      const list = result?.data?.data || [];

      const formatData = list.map((item: any) => ({
        time: Math.floor(
          new Date(item.time.replace(/-/g, "/")).getTime() / 1000,
        ) as Time,

        open: Number(item.open),

        high: Number(item.high),

        low: Number(item.low),

        close: Number(item.close),
      }));

      if (!formatData.length) return;

      // 数据少时更窄
      let barSpacing = 1;

      if (formatData.length < 20) {
        barSpacing = 0.5;
      } else if (formatData.length < 50) {
        barSpacing = 1;
      } else if (formatData.length < 100) {
        barSpacing = 2;
      }

      candleSeriesRef.current?.setData(formatData);

      // 重点：不要再 fitContent
      chartRef.current?.applyOptions({
        timeScale: {
          barSpacing,
          minBarSpacing: 0.5,
          rightOffset: 0,
        },
      });
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }, []);
  const getHzPrice = async () => {
    const result = await NetworkRequest({
      Url: "account/getPrice",
      Method: "get",
    });
    console.log(result);
    if (result.success) {
      setHzPrice(result.data.data || 0);
    }
  };
  // 初始化图表
  useEffect(() => {
    getHzPrice();
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,

      height,

      layout: {
        background: {
          color: "#000",
        },

        textColor: "#D1D4DC",

        attributionLogo: false,
      },

      grid: {
        vertLines: {
          color: "#1a1a1a",
        },

        horzLines: {
          color: "#1a1a1a",
        },
      },

      crosshair: {
        vertLine: {
          color: "#444",
          width: 1,
        },

        horzLine: {
          color: "#444",
          width: 1,
        },
      },

      // 右侧价格轴
      rightPriceScale: {
        borderVisible: false,

        minimumWidth: 1,

        entireTextOnly: true,

        scaleMargins: {
          top: 0.1,
          bottom: 0.1,
        },
      },

      // 时间轴
      timeScale: {
        borderVisible: false,

        timeVisible: true,

        secondsVisible: false,

        rightOffset: 0,

        // 重点配置
        barSpacing: 1,

        minBarSpacing: 0.5,
      },

      handleScroll: {
        mouseWheel: true,
        pressedMouseMove: true,
        horzTouchDrag: true,
        vertTouchDrag: true,
      },

      handleScale: {
        mouseWheel: true,
        pinch: true,
        axisPressedMouseMove: false,
      },
    });

    // 创建K线
    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#00C087",

      downColor: "#FF4D4F",

      borderUpColor: "#00C087",

      borderDownColor: "#FF4D4F",

      wickUpColor: "#00C087",

      wickDownColor: "#FF4D4F",

      priceLineVisible: true,

      lastValueVisible: true,

      priceFormat: {
        type: "price",

        precision: 4,

        minMove: 0.0001,
      },
    });

    chartRef.current = chart;

    candleSeriesRef.current = candleSeries;

    // 默认加载
    getKlineData(defaultTimeframe);

    // 自适应
    const resizeObserver = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;

      chart.resize(width, height);
    });

    resizeObserver.observe(chartContainerRef.current);

    return () => {
      resizeObserver.disconnect();

      chart.remove();
    };
  }, [defaultTimeframe, getKlineData, height]);

  // 切换周期
  const handleTimeframeChange = async (tf: Timeframe) => {
    if (tf === currentTF) return;

    setCurrentTF(tf);

    await getKlineData(tf);
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        background: "#000",
        overflow: "hidden",
        borderRadius: "12px",
      }}
    >
      <div className="priceBox">
        <div className="priceTitle">HZ/USDT</div>
        <div className="priceTxt">{hzPrice}</div>
      </div>
      {/* 图表 */}
      <div
        ref={chartContainerRef}
        style={{
          marginTop: "60px",
          width: "100%",
          height: "100%",
        }}
      />

      {/* 时间周期 */}
      <div
        style={{
          position: "absolute",

          top: "46px",

          left: "6px",

          zIndex: 10,

          display: "flex",

          gap: "8px",

          padding: "4px",

          background: "rgba(18,18,18,.95)",

          borderRadius: "10px",

          border: "1px solid #222",
        }}
      >
        {timeframes.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => handleTimeframeChange(value)}
            style={{
              padding: "5px 12px",

              background: currentTF === value ? "#1f6feb" : "transparent",

              color: currentTF === value ? "#fff" : "#888",

              border: "none",

              borderRadius: "6px",

              cursor: "pointer",

              fontSize: "12px",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* loading */}
      {isLoading && (
        <div
          style={{
            position: "absolute",

            top: "50%",

            left: "50%",

            transform: "translate(-50%, -50%)",

            zIndex: 20,
          }}
        >
          <Spin />
        </div>
      )}
    </div>
  );
};

export default memo(KlineChart);
