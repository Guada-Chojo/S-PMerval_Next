import React from 'react';

interface LabelTableProps {
  onHoverRow: (index: number | null) => void; // Function to handle hover events
  labels: string[];
  data: number[]
  colors: string[];
}

export const InfoTable: React.FC<LabelTableProps> = ({ onHoverRow, labels, data, colors }) => {
  return (
    <div className='bg-white overflow-x-auto rounded-xl'>
      <table className="table-auto w-full">
        <tbody>
          {labels.map((label, index) => (
            <tr
              key={label}
              onMouseEnter={() => onHoverRow(index)} // Trigger hover on table row
              onMouseLeave={() => onHoverRow(null)} // Remove hover on mouse leave
              className="hover:bg-gray-100 cursor-pointer border-none rounded-xl"
            >
              <td className="p-3">
                <div className="flex items-center">
                  <span
                    className="inline-block w-[1.30rem] h-5 rounded-xl mr-3"
                    style={{
                      backgroundColor: colors[index],
                      border: '1px solid #ccc',
                    }}
                  ></span>
                  <span className="font-normal text-sm">
                  {label}
                  </span>
                </div>
              </td>
              
              <td className="p-3 text-sm">{data[index]}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


