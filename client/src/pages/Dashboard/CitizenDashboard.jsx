import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  LinearProgress,
  Tabs,
  Tab,
  Button,
  TextField,
  Rating,
  Badge,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  NotificationsActive,
  Assignment,
  LocalHospital,
  Park,
  Construction,
  WaterDrop,
  AirplanemodeActive,
  RecyclingOutlined,
  AddPhotoAlternate,
  LocationOn,
  Person,
  Feedback,
  Campaign,
} from "@mui/icons-material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { motion } from "framer-motion";

const serviceRequestData = [
  { month: "Jan", requests: 65 },
  { month: "Feb", requests: 59 },
  { month: "Mar", requests: 80 },
  { month: "Apr", requests: 81 },
  { month: "May", requests: 56 },
  { month: "Jun", requests: 55 },
];

const environmentalData = [
  { name: "Air Quality", value: 75 },
  { name: "Water Quality", value: 85 },
  { name: "Green Space", value: 65 },
  { name: "Waste Management", value: 90 },
];

const recentActivities = [
  {
    id: 1,
    type: "Road Repair",
    status: "In Progress",
    location: "Main Street",
    date: "2024-03-15",
  },
  {
    id: 2,
    type: "Tree Planting",
    status: "Completed",
    location: "City Park",
    date: "2024-03-14",
  },
  {
    id: 3,
    type: "Water Pipeline",
    status: "Pending",
    location: "West Area",
    date: "2024-03-13",
  },
  {
    id: 4,
    type: "Street Light",
    status: "In Review",
    location: "North Avenue",
    date: "2024-03-12",
  },
];

const COLORS = ["#22c55e", "#0088FE", "#00C49F", "#FFBB28"];

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const scaleIn = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.5 },
};

// Styled Components
const DashboardCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  height: "100%",
  display: "flex",
  flexDirection: "column",
  borderRadius: "10px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  background: "white",
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: "0 8px 12px rgba(0, 0, 0, 0.15)",
    transform: "translateY(-2px)",
  },
}));

const StatsCard = styled(Card)(({ theme }) => ({
  height: "100%",
  background: "linear-gradient(45deg, #22c55e 30%, #16a34a 90%)",
  color: "white",
  borderRadius: "10px",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 8px 12px rgba(0, 0, 0, 0.15)",
  },
}));

// Tab Panel Component
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`dashboard-tabpanel-${index}`}
      aria-labelledby={`dashboard-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const CitizenDashBoard = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography
          variant="h4"
          gutterBottom
          component="h1"
          sx={{
            mb: 2,
            fontWeight: "bold",
            background: "linear-gradient(45deg, #22c55e 30%, #16a34a 90%)",
            backgroundClip: "text",
            textFillColor: "transparent",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Citizen Dashboard
        </Typography>

        <Typography
          variant="h6"
          gutterBottom
          sx={{ mb: 4, color: "#666", fontStyle: "italic" }}
        >
          Empowering Communities, One Solution at a Time
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              "& .Mui-selected": {
                color: "#22c55e !important",
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#22c55e",
              },
            }}
          >
            <Tab icon={<Assignment />} label="Dashboard" />
            <Tab icon={<Campaign />} label="Post an Issue" />
            <Tab icon={<Construction />} label="My Issues" />
            <Tab icon={<Feedback />} label="Feedback" />
            <Tab icon={<Person />} label="Profile" />
            <Tab icon={<NotificationsActive />} label="Notifications" />
          </Tabs>
        </Box>

        {/* Dashboard Tab */}
        <TabPanel value={tabValue} index={0}>
          {/* Stats Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {[
              { title: "Active Requests", value: "12", icon: <Assignment /> },
              { title: "Health Index", value: "85%", icon: <LocalHospital /> },
              { title: "Green Score", value: "92%", icon: <Park /> },
              {
                title: "Air Quality",
                value: "Good",
                icon: <AirplanemodeActive />,
              },
            ].map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div
                  variants={scaleIn}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: index * 0.1 }}
                >
                  <StatsCard>
                    <CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box>
                          <Typography variant="h6" component="div">
                            {stat.title}
                          </Typography>
                          <Typography variant="h4">{stat.value}</Typography>
                        </Box>
                        <IconButton sx={{ color: "white" }}>
                          {stat.icon}
                        </IconButton>
                      </Box>
                    </CardContent>
                  </StatsCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={3}>
            {/* Service Requests Chart */}
            <Grid item xs={12} md={8}>
              <motion.div
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.2 }}
              >
                <DashboardCard>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ color: "#22c55e" }}
                  >
                    Service Requests Trend
                  </Typography>
                  <BarChart width={700} height={300} data={serviceRequestData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="requests" fill="#22c55e" />
                  </BarChart>
                </DashboardCard>
              </motion.div>
            </Grid>

            {/* Environmental Metrics */}
            <Grid item xs={12} md={4}>
              <motion.div
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.3 }}
              >
                <DashboardCard>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ color: "#22c55e" }}
                  >
                    Environmental Metrics
                  </Typography>
                  <PieChart width={300} height={300}>
                    <Pie
                      data={environmentalData}
                      cx={150}
                      cy={150}
                      innerRadius={60}
                      outerRadius={80}
                      fill="#22c55e"
                      dataKey="value"
                      label
                    >
                      {environmentalData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </DashboardCard>
              </motion.div>
            </Grid>

            {/* Recent Activities */}
            <Grid item xs={12}>
              <motion.div
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.4 }}
              >
                <DashboardCard>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ color: "#22c55e" }}
                  >
                    Recent Activities
                  </Typography>
                  <List>
                    {recentActivities.map((activity, index) => (
                      <motion.div
                        key={activity.id}
                        variants={scaleIn}
                        initial="initial"
                        animate="animate"
                        transition={{ delay: index * 0.1 }}
                      >
                        <ListItem divider>
                          <ListItemAvatar>
                            <Avatar sx={{ bgcolor: "#22c55e" }}>
                              <Construction />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={activity.type}
                            secondary={
                              <React.Fragment>
                                <Typography
                                  component="span"
                                  variant="body2"
                                  color="text.primary"
                                >
                                  {activity.location}
                                </Typography>
                                {` — ${activity.status} (${activity.date})`}
                              </React.Fragment>
                            }
                          />
                          <Box sx={{ width: "100px", ml: 2 }}>
                            <LinearProgress
                              variant="determinate"
                              value={
                                activity.status === "Completed"
                                  ? 100
                                  : activity.status === "In Progress"
                                  ? 60
                                  : activity.status === "In Review"
                                  ? 80
                                  : 20
                              }
                              sx={{
                                backgroundColor: "#dcfce7",
                                "& .MuiLinearProgress-bar": {
                                  backgroundColor: "#22c55e",
                                },
                              }}
                            />
                          </Box>
                        </ListItem>
                      </motion.div>
                    ))}
                  </List>
                </DashboardCard>
              </motion.div>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Post an Issue Tab */}
        <TabPanel value={tabValue} index={1}>
          <DashboardCard>
            <Typography variant="h6" gutterBottom sx={{ color: "#22c55e" }}>
              Post a New Issue
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  startIcon={<AddPhotoAlternate />}
                  sx={{ mb: 2 }}
                >
                  Upload Image
                </Button>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Describe the Problem"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Location"
                  variant="outlined"
                  InputProps={{
                    endAdornment: <LocationOn color="action" />,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#22c55e",
                    "&:hover": { bgcolor: "#16a34a" },
                  }}
                >
                  Submit Issue
                </Button>
              </Grid>
            </Grid>
          </DashboardCard>
        </TabPanel>

        {/* My Issues Tab */}
        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={3}>
            {["Pending", "Under Review", "Assigned", "Resolved"].map(
              (status, index) => (
                <Grid item xs={12} md={6} key={status}>
                  <DashboardCard>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ color: "#22c55e" }}
                    >
                      {status}
                    </Typography>
                    <List>
                      {/* Sample issue items - replace with actual data */}
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: "#22c55e" }}>
                            <Construction />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={`Sample ${status} Issue`}
                          secondary="Location - Date"
                        />
                      </ListItem>
                    </List>
                  </DashboardCard>
                </Grid>
              )
            )}
          </Grid>
        </TabPanel>

        {/* Feedback Tab */}
        <TabPanel value={tabValue} index={3}>
          <DashboardCard>
            <Typography variant="h6" gutterBottom sx={{ color: "#22c55e" }}>
              Provide Feedback
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Typography component="legend">Rate our service</Typography>
              <Rating name="service-rating" />
            </Box>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Comments and Suggestions"
              variant="outlined"
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              sx={{
                bgcolor: "#22c55e",
                "&:hover": { bgcolor: "#16a34a" },
              }}
            >
              Submit Feedback
            </Button>
          </DashboardCard>
        </TabPanel>

        {/* Profile Tab */}
        <TabPanel value={tabValue} index={4}>
          <DashboardCard>
            <Typography variant="h6" gutterBottom sx={{ color: "#22c55e" }}>
              Profile Settings
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Phone"
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#22c55e",
                    "&:hover": { bgcolor: "#16a34a" },
                  }}
                >
                  Update Profile
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Activity History
                </Typography>
                <List>
                  {/* Sample activity items - replace with actual data */}
                  <ListItem>
                    <ListItemText
                      primary="Issue Reported"
                      secondary="March 15, 2024"
                    />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </DashboardCard>
        </TabPanel>

        {/* Notifications Tab */}
        <TabPanel value={tabValue} index={5}>
          <DashboardCard>
            <Typography variant="h6" gutterBottom sx={{ color: "#22c55e" }}>
              Notifications
            </Typography>
            <List>
              {/* Sample notifications - replace with actual data */}
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "#22c55e" }}>
                    <NotificationsActive />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Issue Status Update"
                  secondary="Your reported issue has been assigned to the relevant department"
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "#22c55e" }}>
                    <Campaign />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Public Announcement"
                  secondary="Scheduled maintenance in your area next week"
                />
              </ListItem>
            </List>
          </DashboardCard>
        </TabPanel>
      </motion.div>
    </Container>
  );
};

export default CitizenDashBoard;
