import { TableRow } from "@/components/ui/AssetTable";

let stockMarketCapCache: TableRow[] = [];
let CommoditiesMarketCapCache: TableRow[] = [];
let forexMarketCapCache: TableRow[] = [];
let cryptoMarketCapCache: TableRow[] = [];

export function getStockMarketCaps(): TableRow[] {
  return [
    {
      rank: 1,
      name: "NVDA",
      marketCap: 4000000000000,
      price: 180,
      dayChange: -3,
      weekChange: -8,
    },
    {
      rank: 2,
      name: "AAPL",
      marketCap: 3000000000000,
      price: 350,
      dayChange: -2,
      weekChange: -6,
    },
  ];
}

export function getCommoditiesMarketCaps(): TableRow[] {
  return [];
}

export function getCryptoMarketCaps(): TableRow[] {
  return [];
}

export function getForexMarketCaps(): TableRow[] {
  return [];
}

export function getAllMarketCaps(): TableRow[] {
  return [];
}
