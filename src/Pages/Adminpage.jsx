import React, { useEffect, useState } from 'react'
import NavbarComponent from '../Components/Navbar/NavbarComponent'
import { Box, Typography, Grid  } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import instance from '../Components/Auth/Auth';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Rectangle,
    Label
} from "recharts";
function Adminpage() {
    const [pageState, setPageState] = useState(1);
    return (
        <div>
            <NavbarComponent  {...{ setPageState, }} pages={['Home', 'Graph']} />
            {
                pageState == 1 ? <TableComponent /> : <GraphComponent />
            }
        </div>
    )
}



function TableComponent() {

    const [usersData, setUsersData] = useState([]);

    useEffect(() => {

        const emailId = JSON.parse(sessionStorage.getItem("useDetails")).emailId

        instance.get(`/users/get-users/bulk/${emailId}`).then(data => {
            if (data?.data.success == "true") {
                setUsersData(data?.data?.data)
            }
        }).catch(error => console.log(error));

    }, [])

    return (
        <Box sx={{ padding: "30px 50px" }}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{ background: "#F4F4F4" }}>
                        <TableRow>
                            <TableCell>S.No </TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Count</TableCell>
                            <TableCell align="right">Last Login Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {usersData?.map((row, i) => (
                            <TableRow
                                key={row?.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {i + 1}
                                </TableCell>
                                <TableCell align="right">{row?.name}</TableCell>
                                <TableCell align="right">{row?.email_id}</TableCell>
                                <TableCell align="right">{row?.count}</TableCell>
                                <TableCell align="right">{row?.last_login_date.split("T")[0]}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )


}

function GraphComponent() {
    const [userData, setUserData] = useState([]);
    console.log(userData)

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // const response = await instance.post('/users/user-count', {
                //     year: 2024,
                // });
                //  console.log(response)
                instance.post('/users/user-count', {
                    year: 2024
                }).then(data => {
                    console.log(data)
                    // if (data?.data.success == "true") {
                    setUserData(data?.data)
                    // }
                }).catch(error => console.log(error));

                // setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);
    return (

        <Box sx={{ p: 2 }}>
      {/* Display Total Users and Total Click Count side by side */}
      <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <Grid item xs={12} sm={2}>
          <Box sx={{ border: "1px solid lightgray", textAlign: 'center', p: 2, backgroundColor: "#f4f4f4" }}>
            <Typography variant="h4" component="div">
              {userData?.length}
            </Typography>
            <Typography variant="body2">
              Total User Count
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Box sx={{ border: "1px solid lightgray", textAlign: 'center', p: 2, backgroundColor: "#f4f4f4" }}>
            <Typography variant="h4" component="div">
              XX
            </Typography>
            <Typography variant="body2">
              Total Click Count
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* BarChart for displaying data */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <BarChart
          width={500}
          height={300}
          data={userData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id" >
            <Label value="Months" offset={0} position="insideBottomRight" />
          </XAxis>
          <YAxis>
            <Label value="Count" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
          </YAxis>
          <Tooltip />
          <Bar
            dataKey="totalUsers"
            fill="#87CEEB"
          />
        </BarChart>
      </Box>
    </Box>
    )

}


export default Adminpage