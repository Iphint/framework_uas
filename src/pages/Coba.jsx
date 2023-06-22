import { gql, useQuery } from '@apollo/client';
import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
  Typography,
} from '@material-tailwind/react';

const GET_STUDENTS = gql`
  query GetStudents($page: Int!, $pageSize: Int!) {
    table_mhs(order_by: { id: asc }, limit: $pageSize, offset: $page) {
      id
      nama
      prodi
      angkatan
      nim
    }
    table_mhs_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export default function Example() {
  const { loading, error, data } = useQuery(GET_STUDENTS, {
    variables: {
      page: 0, // Set the page number you want to retrieve
      pageSize: 10, // Set the desired page size
    },
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <Card className="w-96">
      <List>
        {data.table_mhs.map((mhs) => (
          <ListItem key={mhs.id}>
            <ListItemPrefix>
              <Avatar variant="circular" alt="candice" src="/img/face-1.jpg" />
            </ListItemPrefix>
            <div>
              <Typography variant="h6" color="blue-gray">
                {mhs.nama}
              </Typography>
              <Typography variant="small" color="gray" className="font-normal">
                {mhs.nim}
              </Typography>
            </div>
          </ListItem>
        ))}
      </List>
    </Card>
  );
}
