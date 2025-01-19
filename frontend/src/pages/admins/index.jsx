// import axios from 'axios';
// import { useEffect, useState } from 'react';

// function AdminPage() {
//   const [html, setHtml] = useState('');
//   useEffect(() => {
//     const getData = async () => {
//       const response = await axios.get('/api/admin/users');
//       setHtml(response.data);
//     };

//     getData();
//   }, []);
//   return (
//     <div>
//       <div dangerouslySetInnerHTML={{ __html: html }} />
//     </div>
//   );
// }

// export default AdminPage;
