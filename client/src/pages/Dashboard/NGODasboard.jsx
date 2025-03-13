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
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  Assignment,
  PriorityHigh,
  CheckCircle,
  Groups,
  Event,
  Assessment,
  Person,
  AddPhotoAlternate,
  Campaign,
  Handshake,
  School,
  CalendarMonth,
  BarChart,
  Settings,
  Add,
} from "@mui/icons-material";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { motion } from "framer-motion";

// Sample data
const issueStats = [
  { name: "High Priority", value: 5 },
  { name: "Medium Priority", value: 8 },
  { name: "Low Priority", value: 12 },
];

const impactData = [
  { month: "Jan", resolved: 15, ongoing: 8 },
  { month: "Feb", resolved: 18, ongoing: 10 },
  { month: "Mar", resolved: 22, ongoing: 12 },
  { month: "Apr", resolved: 20, ongoing: 9 },
  { month: "May", resolved: 25, ongoing: 11 },
  { month: "Jun", resolved: 28, ongoing: 13 },
];

const PRIORITY_COLORS = {
  High: "#ef4444",
  Medium: "#f97316",
  Low: "#22c55e",
};

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
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
      id={`ngo-tabpanel-${index}`}
      aria-labelledby={`ngo-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const NGODashboard = () => {
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
          NGO Dashboard
        </Typography>

        <Typography
          variant="h6"
          gutterBottom
          sx={{ mb: 4, color: "#666", fontStyle: "italic" }}
        >
          Together for a Better Tomorrow
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
            <Tab icon={<PriorityHigh />} label="Assigned Issues" />
            <Tab icon={<CheckCircle />} label="Action Center" />
            <Tab icon={<Handshake />} label="Collaboration Hub" />
            <Tab icon={<Event />} label="Event Planning" />
            <Tab icon={<Assessment />} label="Impact Reports" />
            <Tab icon={<Person />} label="Profile" />
          </Tabs>
        </Box>

        {/* Dashboard Tab */}
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
              {[
                { title: "Total Assigned", value: "25", icon: <Assignment /> },
                { title: "In Progress", value: "12", icon: <CheckCircle /> },
                { title: "Collaborations", value: "8", icon: <Handshake /> },
                { title: "Events Planned", value: "5", icon: <Event /> },
              ].map((stat, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <motion.div
                    variants={scaleIn}
                    initial="initial"
                    animate="animate"
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
                            <Typography variant="h6">{stat.title}</Typography>
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

            {/* Charts and Recent Activity */}
            <Grid item xs={12} md={8}>
              <DashboardCard>
                <Typography variant="h6" gutterBottom sx={{ color: "#22c55e" }}>
                  Impact Overview
                </Typography>
                <RechartsBarChart width={700} height={300} data={impactData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="resolved"
                    fill="#22c55e"
                    name="Resolved Issues"
                  />
                  <Bar
                    dataKey="ongoing"
                    fill="#f97316"
                    name="Ongoing Projects"
                  />
                </RechartsBarChart>
              </DashboardCard>
            </Grid>

            <Grid item xs={12} md={4}>
              <DashboardCard>
                <Typography variant="h6" gutterBottom sx={{ color: "#22c55e" }}>
                  Issue Priority Distribution
                </Typography>
                <PieChart width={300} height={300}>
                  <Pie
                    data={issueStats}
                    cx={150}
                    cy={150}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#22c55e"
                    dataKey="value"
                    label
                  >
                    {issueStats.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={Object.values(PRIORITY_COLORS)[index]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </DashboardCard>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Assigned Issues Tab */}
        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            {["High", "Medium", "Low"].map((priority) => (
              <Grid item xs={12} key={priority}>
                <DashboardCard>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Typography
                      variant="h6"
                      sx={{ color: PRIORITY_COLORS[priority] }}
                    >
                      {priority} Priority Issues
                    </Typography>
                    <Chip
                      label={
                        priority === "High"
                          ? "5"
                          : priority === "Medium"
                          ? "8"
                          : "12"
                      }
                      sx={{
                        ml: 2,
                        bgcolor: PRIORITY_COLORS[priority],
                        color: "white",
                      }}
                      size="small"
                    />
                  </Box>
                  <List>
                    {[1, 2].map((item) => (
                      <ListItem key={item} divider>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: PRIORITY_COLORS[priority] }}>
                            <Assignment />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={`Community Issue #${item}`}
                          secondary={`Location - Assigned on ${new Date().toLocaleDateString()}`}
                        />
                        <Button variant="outlined" size="small" sx={{ mr: 1 }}>
                          View Details
                        </Button>
                      </ListItem>
                    ))}
                  </List>
                </DashboardCard>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        {/* Action Center Tab */}
        <TabPanel value={tabValue} index={2}>
          <DashboardCard>
            <Typography variant="h6" gutterBottom sx={{ color: "#22c55e" }}>
              Issue Management
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel>Select Issue</InputLabel>
                  <Select label="Select Issue">
                    <MenuItem value="issue1">Community Issue #1</MenuItem>
                    <MenuItem value="issue2">Community Issue #2</MenuItem>
                  </Select>
                </FormControl>
                <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                  <Button variant="contained" color="success">
                    Acknowledge
                  </Button>
                  <Button variant="contained" color="primary">
                    Mark In Progress
                  </Button>
                  <Button variant="contained" color="secondary">
                    Resolve Issue
                  </Button>
                </Stack>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Progress Update"
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <Button
                  variant="outlined"
                  startIcon={<AddPhotoAlternate />}
                  sx={{ mb: 2 }}
                >
                  Add Progress Images
                </Button>
              </Grid>
            </Grid>
          </DashboardCard>
        </TabPanel>

        {/* Collaboration Hub Tab */}
        <TabPanel value={tabValue} index={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <DashboardCard>
                <Typography variant="h6" gutterBottom sx={{ color: "#22c55e" }}>
                  Government Organizations
                </Typography>
                <List>
                  {[
                    "Municipal Corporation",
                    "Environmental Agency",
                    "Health Department",
                  ].map((org) => (
                    <ListItem key={org}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: "#22c55e" }}>
                          <Campaign />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={org}
                        secondary="Click to connect"
                      />
                      <Button variant="outlined" size="small">
                        Connect
                      </Button>
                    </ListItem>
                  ))}
                </List>
              </DashboardCard>
            </Grid>
            <Grid item xs={12} md={6}>
              <DashboardCard>
                <Typography variant="h6" gutterBottom sx={{ color: "#22c55e" }}>
                  NSS Student Coordination
                </Typography>
                <List>
                  {["Team Alpha", "Team Beta", "Team Gamma"].map((team) => (
                    <ListItem key={team}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: "#22c55e" }}>
                          <School />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={team}
                        secondary="Available for projects"
                      />
                      <Button variant="outlined" size="small">
                        Coordinate
                      </Button>
                    </ListItem>
                  ))}
                </List>
              </DashboardCard>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Event Planning Tab */}
        <TabPanel value={tabValue} index={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <DashboardCard>
                <Typography variant="h6" gutterBottom sx={{ color: "#22c55e" }}>
                  Schedule Community Event
                </Typography>
                <TextField fullWidth label="Event Title" sx={{ mb: 2 }} />
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Event Description"
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  type="datetime-local"
                  label="Event Date & Time"
                  InputLabelProps={{ shrink: true }}
                  sx={{ mb: 2 }}
                />
                <TextField fullWidth label="Location" sx={{ mb: 2 }} />
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#22c55e",
                    "&:hover": { bgcolor: "#16a34a" },
                  }}
                >
                  Schedule Event
                </Button>
              </DashboardCard>
            </Grid>
            <Grid item xs={12} md={6}>
              <DashboardCard>
                <Typography variant="h6" gutterBottom sx={{ color: "#22c55e" }}>
                  Awareness Campaigns
                </Typography>
                <List>
                  {[
                    "Environmental Awareness",
                    "Health Camp",
                    "Education Drive",
                  ].map((campaign) => (
                    <ListItem key={campaign}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: "#22c55e" }}>
                          <Campaign />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={campaign}
                        secondary="Click to manage campaign"
                      />
                      <Button variant="outlined" size="small">
                        Manage
                      </Button>
                    </ListItem>
                  ))}
                </List>
              </DashboardCard>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Impact Reports Tab */}
        <TabPanel value={tabValue} index={5}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <DashboardCard>
                <Typography variant="h6" gutterBottom sx={{ color: "#22c55e" }}>
                  Generate Reports
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <InputLabel>Report Type</InputLabel>
                      <Select label="Report Type">
                        <MenuItem value="resolved">Resolved Issues</MenuItem>
                        <MenuItem value="ongoing">Ongoing Projects</MenuItem>
                        <MenuItem value="impact">Impact Assessment</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                      fullWidth
                      type="date"
                      label="From Date"
                      InputLabelProps={{ shrink: true }}
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      fullWidth
                      type="date"
                      label="To Date"
                      InputLabelProps={{ shrink: true }}
                      sx={{ mb: 2 }}
                    />
                    <Button
                      variant="contained"
                      startIcon={<BarChart />}
                      sx={{
                        bgcolor: "#22c55e",
                        "&:hover": { bgcolor: "#16a34a" },
                      }}
                    >
                      Generate Report
                    </Button>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" gutterBottom>
                      Recent Reports
                    </Typography>
                    <List>
                      {[
                        "Monthly Impact Report",
                        "Quarterly Progress",
                        "Annual Summary",
                      ].map((report) => (
                        <ListItem key={report}>
                          <ListItemText
                            primary={report}
                            secondary="Generated on March 15, 2024"
                          />
                          <Button variant="outlined" size="small">
                            Download
                          </Button>
                        </ListItem>
                      ))}
                    </List>
                  </Grid>
                </Grid>
              </DashboardCard>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Profile Tab */}
        <TabPanel value={tabValue} index={6}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <DashboardCard>
                <Typography variant="h6" gutterBottom sx={{ color: "#22c55e" }}>
                  Organization Details
                </Typography>
                <TextField
                  fullWidth
                  label="Organization Name"
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Registration Number"
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Contact Email"
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Phone Number"
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
                  Update Details
                </Button>
              </DashboardCard>
            </Grid>
            <Grid item xs={12} md={6}>
              <DashboardCard>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography variant="h6" sx={{ color: "#22c55e" }}>
                    Team Members
                  </Typography>
                  <Button startIcon={<Add />} variant="outlined">
                    Add Member
                  </Button>
                </Box>
                <List>
                  {["John Doe", "Jane Smith", "Mike Johnson"].map((member) => (
                    <ListItem key={member}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: "#22c55e" }}>
                          <Person />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={member} secondary="Team Member" />
                      <Button color="error" size="small">
                        Remove
                      </Button>
                    </ListItem>
                  ))}
                </List>
              </DashboardCard>
            </Grid>
          </Grid>
        </TabPanel>
      </motion.div>
    </Container>
  );
};

export default NGODashboard;
