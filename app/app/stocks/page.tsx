import AssetTable, { TableRow } from "@/components/ui/AssetTable";
import { getStockMarketCaps } from "@/lib/data-fetcher";
import { useMemo } from "react";

export default function Stocks() {
  const data = useMemo<TableRow[]>(getStockMarketCaps, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginTop: "2em",
        backgroundColor: "white",
        color: "black",
      }}
    >
      <AssetTable data={data} />
    </div>
  );
}
