import { TableRow } from "@/components/ui/AssetTable";
import { start } from "repl";

let stockMarketCapCache: TableRow[] = [];
let CommoditiesMarketCapCache: TableRow[] = [];
let forexMarketCapCache: TableRow[] = [];
let cryptoMarketCapCache: TableRow[] = [];

export function getStockMarketCaps() {
  return stockMarketCapCache;
}

setInterval(fetchStockMarketCaps, 300000);

//fetchStockMarketCaps();

async function fetchStockMarketCaps(): Promise<void> {
  const url =
    "https://docs.google.com/spreadsheets/d/1Y1iCv62vBrmj1CQ5_NMOxK0ASKJ4VvxJg0-1jHaaFG0/gviz/tq?tqx=out:json";
  const resp = await fetch(url);
  if (resp.status === 200) {
    stockMarketCapCache = [];
    const body = await resp.text();
    const startIndex = '"rows":'.length + body.search('"rows"');
    const endIndex = body.search(',"parsedNumHeaders"');
    const bodyArrayString = body.substring(startIndex, endIndex);
    const bodyArrayJson = JSON.parse(bodyArrayString);
    for (let row of bodyArrayJson) {
      console.log(row["c"]);
      let name = row["c"][0] !== null ? row["c"][0]["v"] : "Unknown";
      let marketCap = row["c"][1]["v"];
      let tableRow: TableRow = {
        rank: -1,
        name: name,
        marketCap: marketCap,
        price: 0,
        dayChange: 0,
        weekChange: 0,
      };

      stockMarketCapCache.push(tableRow);
    }
    return;
  }

  stockMarketCapCache = [
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
