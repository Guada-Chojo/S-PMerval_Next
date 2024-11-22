import React from "react";

interface TableComponentProps {
  data: any[];
  onHover: (index: number | null) => void;
  onClick: (index: number | null) => void;
}

const TableComponent: React.FC<TableComponentProps> = ({ data, onHover, onClick }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table table-compact w-full border">
        <thead>
          <tr>
            <th>Category</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {data.slice(1).map((row, index) => (
            <tr
              key={index}
              className="hover:bg-gray-200 cursor-pointer"
              onMouseEnter={() => onHover(index)}
              onMouseLeave={() => onHover(null)}
              onClick={() => onClick(index)}
            >
              <td>{row[0]}</td>
              <td>{row[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;


