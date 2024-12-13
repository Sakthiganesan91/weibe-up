// import AdminOrderChart from "@/components/admin-components/AdminOrderChart";
// import AdminRevenueChart from "@/components/admin-components/AdminRevenueChart";
// import { ChartDropDown } from "@/components/admin-components/ChartDropDown";
// import { DataTable } from "@/components/admin-components/data-table";
// import React from "react";
// import axios from'axios';



// function Orders() {
  

//   const adminOrderColumns = [
//     {
//       accessorKey: "orderId",
//       header: "Order Id",
//     },
//     {
//       accessorKey: "placement",
//       header: "Placement",
//     },

//     {
//       accessorKey: "designPosition",
//       header: "Design Position",
//     },
//     {
//       accessorKey: "quantity",
//       header: "Quantity",
//     },
//     {
//       accessorKey: "size",
//       header: "Size",
//     },
//     {
//       accessorKey: "contactDetails",
//       header: "Contact Details",
      
//       cell: ({ value }) => (
//         <div className="flex">
//           <div className="font-bold">View</div>
//         </div>
//       ),
//     },
//   ];
//   useEffect(()=>{
//     axios.get(process.env.MONGO_DB_URI)
//     .then(addresses => setAddresses(addresses.data))
//     .catch(err => console.log(err))
//   },[])

//   return (
//     <>
//       <div className="">
//         <div>
//           <div className="flex items-center">
//             <div className="my-4 text-2xl font-bold mx-1">Order Summary</div>
//             {/* <ChartDropDown /> */}
//           </div>
//           {/* <AdminOrderChart /> */}
//         </div>
//       </div>
//       <div className="my-4">
//         {/* <p className="text-2xl font-bold">Orders</p> */}
//       </div>
//       <DataTable columns={adminOrderColumns} data={[]} />
//     </>
//   );
// }

// export default Orders;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataTable } from "@/components/admin-components/data-table";

function Orders() {
  // State to store orders data
  const [orders, setOrders] = useState([]);

  // Define columns for the data table
  const adminOrderColumns = [
    {
      accessorKey: "orderId",
      header: "Order Id",
    },
    {
      accessorKey: "placement",
      header: "Placement",
    },
    {
      accessorKey: "designPosition",
      header: "Design Position",
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
    },
    {
      accessorKey: "size",
      header: "Size",
    },
    {
      accessorKey: "contactDetails",
      header: "Contact Details",
      cell: ({ row }) => {
        // Access the contact details from the row data
        const { contactDetails } = row.original;
        
        // If contactDetails is an object, you can display the necessary fields (like email, phone, etc.)
        return (
          <div className="flex">
            <div className="font-bold">{contactDetails ? contactDetails.name : 'N/A'}</div>
            {/* You can render more details here */}
          </div>
        );
      },
    },
  ];

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Make sure to replace 'process.env.MONGO_DB_URI' with your correct API endpoint
        const response = await axios.get(process.env.MONGO_DB_URI); 
        setOrders(response.data); // Set the data to state
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, []); // Empty array means this effect runs only once when the component mounts

  return (
    <>
      <div>
        <div>
          <div className="flex items-center">
            <div className="my-4 text-2xl font-bold mx-1">Order Summary</div>
          </div>
        </div>
      </div>
      <div className="my-4">
        {/* You can add any additional elements here */}
      </div>

      {/* DataTable component with columns and fetched orders data */}
      <DataTable columns={adminOrderColumns} data={orders} />
    </>
  );
}

export default Orders;

