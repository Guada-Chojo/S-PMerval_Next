import React from 'react';

interface LabelTableProps {
  onHoverRow: (index: number | null) => void; // Function to handle hover events
  labels: string[];
  data: number[]
}

export const InfoTable: React.FC<LabelTableProps> = ({ onHoverRow, labels, data }) => {
  const colors = [
    'rgba(255, 99, 132, 0.4)',
    'rgba(54, 162, 235, 0.4)',
    'rgba(255, 206, 86, 0.4)',
    'rgba(75, 192, 192, 0.4)',
    'rgba(153, 102, 255, 0.4)',
    'rgba(255, 159, 64, 0.4)',
    'rgba(255, 135, 87, 0.4)',
  ];
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


