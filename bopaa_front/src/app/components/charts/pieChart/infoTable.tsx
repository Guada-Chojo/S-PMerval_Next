import React from 'react';

interface LabelTableProps {
  onHoverRow: (index: number | null) => void; // Function to handle hover events
}

export const InfoTable: React.FC<LabelTableProps> = ({ onHoverRow }) => {
  const labels = ['Apple', 'Boeing', 'Coca-Cola', 'Google', 'Microsoft', 'Nestlé', 'NVIDIA'];
  const colors = [
    'rgba(255, 99, 132, 0.4)',
    'rgba(54, 162, 235, 0.4)',
    'rgba(255, 206, 86, 0.4)',
    'rgba(75, 192, 192, 0.4)',
    'rgba(153, 102, 255, 0.4)',
    'rgba(255, 159, 64, 0.4)',
    'rgba(255, 135, 87, 0.4)',
  ];
  const data = [12, 19, 3, 5, 2, 3, 10];
  return (
    <div className='bg-white overflow-x-auto rounded-xl'>
      <table className="table w-full ">
       {/*  <thead>
          <tr className=" text-gray-700 font-medium text-base">
            <th className="p-3 text-left">Color</th>
            <th className="p-3 text-left">Label</th>
            <th className="p-3 text-left">Value</th>
          </tr>
        </thead> */}
        <tbody>
          {labels.map((label, index) => (
            <tr
              key={label}
              onMouseEnter={() => onHoverRow(index)} // Trigger hover on table row
              onMouseLeave={() => onHoverRow(null)} // Remove hover on mouse leave
              className="hover:bg-gray-100 cursor-pointer border-none"
            >
              <td className="p-3">
                <span
                  className="inline-block w-6 h-5 rounded-xl"
                  style={{
                    backgroundColor: colors[index],
                    border: '1px solid #ccc',
                  }}
                ></span>
              </td>
              <td className="p-3 font-normal">{label}</td>
              <td className="p-3">{data[index]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


