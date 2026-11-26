import type { EditorialTableData } from "@/lib/types";

export function EditorialTable({ caption, columns, rows }: EditorialTableData) {
  return <div className="comparison-wrap editorial-table">
    <table className="comparison-table">
      <caption>{caption}</caption>
      <thead><tr>{columns.map((column) => <th scope="col" key={column}>{column}</th>)}</tr></thead>
      <tbody>{rows.map(([label, ...values]) => <tr key={label}>
        <th scope="row">{label}</th>
        {values.map((value, index) => <td key={columns[index + 1]}>{value}</td>)}
      </tr>)}</tbody>
    </table>
  </div>;
}
