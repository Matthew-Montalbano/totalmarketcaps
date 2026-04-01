import AssetTable, { TableRow } from "@/components/ui/AssetTable";
import { getCommoditiesMarketCaps } from "@/lib/data-fetcher";
import { useMemo } from "react";

export default function Commodities() {
  const data = useMemo<TableRow[]>(getCommoditiesMarketCaps, []);

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
