import React, { useState, useRef, useCallback, useEffect } from "react";
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
  CircularProgress,
  Chip,
  ImageList,
  ImageListItem,
  Alert,
  Collapse,
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
  CheckCircle,
  Assessment,
  AccessTime,
  Refresh,
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
import axios from "axios";
import { useDropzone } from "react-dropzone";
import CloudinaryUpload from "../../components/CloudinaryUpload";
import { useAuth } from "../../context/AuthContext";

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
  padding: theme.spacing(3),
  height: "100%",
  display: "flex",
  flexDirection: "column",
  borderRadius: "16px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
  background: "white",
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
    transform: "translateY(-4px)",
  },
}));

const StatsCard = styled(Card)(({ theme }) => ({
  height: "100%",
  background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
  color: "white",
  borderRadius: "16px",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 12px 20px rgba(34, 197, 94, 0.2)",
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

// Add this component for issue cards
const IssueCard = ({ issue }) => (
  <Card
    sx={{
      mb: 2,
      position: "relative",
      borderRadius: "12px",
      overflow: "hidden",
      transition: "all 0.3s ease",
      "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
      },
    }}
  >
    <Box sx={{ position: "relative" }}>
      {issue.imageUrl ? (
        <img
          src={issue.imageUrl}
          alt={issue.category}
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
          }}
        />
      ) : (
        <Box
          sx={{
            width: "100%",
            height: "200px",
            bgcolor: "grey.100",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Construction sx={{ fontSize: 60, color: "grey.400" }} />
        </Box>
      )}
      <Box
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          display: "flex",
          gap: 1,
        }}
      >
        <Chip
          label={issue.status}
          color={
            issue.status === "RESOLVED"
              ? "success"
              : issue.status === "IN_PROGRESS"
              ? "warning"
              : "error"
          }
          sx={{
            textTransform: "capitalize",
            fontWeight: "bold",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        />
        <Chip
          label={issue.priority || "medium"}
          color={
            issue.priority === "high"
              ? "error"
              : issue.priority === "medium"
              ? "warning"
              : "success"
          }
          sx={{
            textTransform: "capitalize",
            fontWeight: "bold",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        />
      </Box>
    </Box>
    <CardContent sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
        {issue.category}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        paragraph
        sx={{ mb: 2, lineHeight: 1.6 }}
      >
        {issue.description}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 3, mt: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <LocationOn color="primary" fontSize="small" />
          <Typography variant="body2" color="text.secondary">
            {issue.location}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <AccessTime color="primary" fontSize="small" />
          <Typography variant="body2" color="text.secondary">
            {new Date(issue.createdAt).toLocaleDateString()}
          </Typography>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

// Update the Recent Activities section
const RecentActivitiesSection = ({ activities }) => (
  <Grid item xs={12}>
    <motion.div
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      transition={{ delay: 0.4 }}
    >
      <DashboardCard>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "#22c55e",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Assessment /> Recent Activities
          </Typography>
          <Button
            startIcon={<Refresh />}
            onClick={() => fetchDashboardData()}
            sx={{
              color: "white",
              bgcolor: "#22c55e",
              "&:hover": {
                bgcolor: "#16a34a",
              },
              borderRadius: "8px",
              px: 3,
            }}
          >
            Refresh
          </Button>
        </Box>
        <Grid container spacing={3}>
          {activities.map((activity) => (
            <Grid item xs={12} md={6} lg={4} key={activity.id}>
              <IssueCard issue={activity} />
            </Grid>
          ))}
        </Grid>
      </DashboardCard>
    </motion.div>
  </Grid>
);

// Update the MyIssuesTab component
const MyIssuesTab = ({ issues }) => (
  <Grid container spacing={3}>
    {Object.entries(issues).map(([status, statusIssues]) => (
      <Grid item xs={12} key={status}>
        <DashboardCard>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: "#22c55e", mb: 3 }}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)} Issues (
            {Array.isArray(statusIssues) ? statusIssues.length : 0})
          </Typography>
          {Array.isArray(statusIssues) && statusIssues.length > 0 ? (
            <Grid container spacing={3}>
              {statusIssues.map((issue) => (
                <Grid item xs={12} md={6} lg={4} key={issue.id}>
                  <IssueCard issue={issue} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box
              sx={{
                textAlign: "center",
                py: 4,
                bgcolor: "grey.50",
                borderRadius: 2,
              }}
            >
              <Construction sx={{ fontSize: 48, color: "grey.400", mb: 2 }} />
              <Typography color="text.secondary">
                No {status.toLowerCase()} issues found
              </Typography>
            </Box>
          )}
        </DashboardCard>
      </Grid>
    ))}
  </Grid>
);

const formatImageAnalysisToDescription = (category) => {
  // Remove redundant terms and format the category
  const uniqueTerms = [...new Set(category.split(", "))];
  const mainTerm = uniqueTerms[0];

  // Create a descriptive sentence
  return `There appears to be a ${mainTerm} issue that requires attention. The image shows ${uniqueTerms.join(
    ", "
  )}.`;
};

const getPlaceFromCoordinates = async (latitude, longitude) => {
  try {
    return new Promise((resolve, reject) => {
      const geocoder = new window.google.maps.Geocoder();
      const latlng = { lat: parseFloat(latitude), lng: parseFloat(longitude) };

      geocoder.geocode({ location: latlng }, (results, status) => {
        if (status === "OK") {
          if (results[0]) {
            const result = results[0];

            // Extract address components
            const addressComponents = {
              street_number: "",
              route: "",
              neighborhood: "",
              locality: "",
              administrative_area_level_1: "",
              country: "",
            };

            result.address_components.forEach((component) => {
              component.types.forEach((type) => {
                if (addressComponents.hasOwnProperty(type)) {
                  addressComponents[type] = component.long_name;
                }
              });
            });

            // Create a user-friendly location string
            let locationString = "";
            if (addressComponents.street_number && addressComponents.route) {
              locationString += `${addressComponents.street_number} ${addressComponents.route}`;
            }
            if (addressComponents.neighborhood) {
              locationString += locationString
                ? `, ${addressComponents.neighborhood}`
                : addressComponents.neighborhood;
            }
            if (addressComponents.locality) {
              locationString += locationString
                ? `, ${addressComponents.locality}`
                : addressComponents.locality;
            }
            if (addressComponents.administrative_area_level_1) {
              locationString += locationString
                ? `, ${addressComponents.administrative_area_level_1}`
                : addressComponents.administrative_area_level_1;
            }

            // If we couldn't build a proper location string, fall back to formatted address
            const finalLocation = locationString || result.formatted_address;

            resolve({
              address: finalLocation,
              formattedAddress: result.formatted_address,
              coordinates: `${latitude}, ${longitude}`,
              raw: addressComponents,
              placeId: result.place_id,
            });
          } else {
            resolve({
              address: `${latitude}, ${longitude}`,
              formattedAddress: `${latitude}, ${longitude}`,
              coordinates: `${latitude}, ${longitude}`,
              raw: null,
            });
          }
        } else {
          reject(new Error(`Geocoder failed: ${status}`));
        }
      });
    });
  } catch (error) {
    console.error("Error getting place name:", error);
    return {
      address: `${latitude}, ${longitude}`,
      formattedAddress: `${latitude}, ${longitude}`,
      coordinates: `${latitude}, ${longitude}`,
      raw: null,
    };
  }
};

const CitizenDashBoard = () => {
  const { user } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [issueAnalysis, setIssueAnalysis] = useState(null);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    severity: "info",
  });

  // New state variables for dashboard data
  const [dashboardStats, setDashboardStats] = useState(null);
  const [recentActivities, setRecentActivities] = useState([]);
  const [myIssues, setMyIssues] = useState({
    pending: [],
    inProgress: [],
    resolved: [],
  });

  const [selectedPriority, setSelectedPriority] = useState("medium");
  const [locationDetails, setLocationDetails] = useState(null);
  const mapRef = useRef(null);
  const autocompleteRef = useRef(null);

  // Initialize Google Maps Autocomplete
  useEffect(() => {
    if (window.google && !autocompleteRef.current) {
      const input = document.getElementById("location-input");
      if (input) {
        autocompleteRef.current = new window.google.maps.places.Autocomplete(
          input
        );
        autocompleteRef.current.addListener("place_changed", () => {
          const place = autocompleteRef.current.getPlace();
          if (place.geometry) {
            const details = {
              address: place.formatted_address,
              placeName: place.name,
              vicinity: place.vicinity,
              coordinates: `${place.geometry.location.lat()}, ${place.geometry.location.lng()}`,
            };
            setLocation(place.formatted_address);
            setLocationDetails(details);
          }
        });
      }
    }
  }, []);

  // Fetch dashboard data with user ID
  const fetchDashboardData = async () => {
    try {
      if (!user || !user.id) {
        setAlert({
          show: true,
          message: "User information not available",
          severity: "error",
        });
        return;
      }

      const [statsResponse, recentResponse] = await Promise.all([
        fetch(`/api/report/stats/${user.id}`, {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }),
        fetch(`/api/report/recent/${user.id}`, {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }),
      ]);

      if (!statsResponse.ok || !recentResponse.ok) {
        const statsError = await statsResponse.json().catch(() => ({}));
        const recentError = await recentResponse.json().catch(() => ({}));
        throw new Error(
          statsError.error ||
            recentError.error ||
            "Failed to fetch dashboard data"
        );
      }

      const stats = await statsResponse.json();
      const recent = await recentResponse.json();

      setDashboardStats(stats);
      setRecentActivities(recent);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setAlert({
        show: true,
        message: error.message || "Error loading dashboard data",
        severity: "error",
      });
    }
  };

  // Fetch issues by status with user ID
  const fetchIssuesByStatus = async () => {
    try {
      if (!user || !user.id) {
        setAlert({
          show: true,
          message: "User information not available",
          severity: "error",
        });
        return;
      }

      // Helper function to format status for API
      const formatStatusForApi = (status) => {
        switch (status.toLowerCase()) {
          case "pending":
            return "PENDING";
          case "in_progress":
          case "inprogress":
            return "IN_PROGRESS";
          case "resolved":
            return "RESOLVED";
          default:
            return status.toUpperCase();
        }
      };

      const [pendingRes, inProgressRes, resolvedRes] = await Promise.all([
        fetch(
          `/api/report/status/${formatStatusForApi("pending")}/${user.id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        ),
        fetch(
          `/api/report/status/${formatStatusForApi("in_progress")}/${user.id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        ),
        fetch(
          `/api/report/status/${formatStatusForApi("resolved")}/${user.id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        ),
      ]);

      // Check for non-200 responses and handle them
      const responses = [
        { res: pendingRes, status: "pending" },
        { res: inProgressRes, status: "in_progress" },
        { res: resolvedRes, status: "resolved" },
      ];

      for (const { res, status } of responses) {
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          console.error(`Error fetching ${status} issues:`, errorData);
          throw new Error(
            errorData.error || `Failed to fetch ${status} issues`
          );
        }
      }

      const [pending, inProgress, resolved] = await Promise.all([
        pendingRes.json(),
        inProgressRes.json(),
        resolvedRes.json(),
      ]);

      setMyIssues({
        pending: pending || [],
        inProgress: inProgress || [],
        resolved: resolved || [],
      });
    } catch (error) {
      console.error("Error fetching issues:", error);
      setAlert({
        show: true,
        message: error.message || "Error loading issues",
        severity: "error",
      });
      // Set empty arrays as fallback
      setMyIssues({
        pending: [],
        inProgress: [],
        resolved: [],
      });
    }
  };

  // Fetch data when component mounts or tab changes
  useEffect(() => {
    if (tabValue === 0) {
      fetchDashboardData();
    } else if (tabValue === 2) {
      fetchIssuesByStatus();
    }
  }, [tabValue]);

  // Add this effect to fetch location when tab changes to Post Issue
  useEffect(() => {
    if (tabValue === 1) {
      handleLocationClick();
    }
  }, [tabValue]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleImageUpload = async (url) => {
    setImageUrl(url);
    try {
      const response = await fetch("/api/report/classify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl: url,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const { category, confidence, imageAnalysis, aiPriority } = data;

      // Auto-generate description from image analysis
      const generatedDescription = formatImageAnalysisToDescription(
        imageAnalysis.category
      );
      setDescription(generatedDescription);

      setIssueAnalysis({
        category,
        confidence,
        severity: aiPriority,
        textAnalysis: null,
        imageAnalysis,
      });

      // Set the suggested priority
      setSelectedPriority(aiPriority);

      let message = `Image uploaded and analyzed!`;
      if (imageAnalysis) {
        message += ` Image suggests: ${imageAnalysis.category}`;
      }
      message += ` Final category: ${category} (Suggested Priority: ${aiPriority})`;

      setAlert({
        show: true,
        message,
        severity: "success",
      });
    } catch (error) {
      console.error("Error analyzing image:", error);
      setAlert({
        show: true,
        message: "Error analyzing image",
        severity: "error",
      });
    }
  };

  const handleLocationClick = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          // Get place details from coordinates
          const locationDetails = await getPlaceFromCoordinates(
            latitude,
            longitude
          );

          // Set the location with the formatted address
          setLocation(locationDetails.address);

          // Set additional location details
          setLocationDetails({
            ...locationDetails,
            placeName:
              locationDetails.raw?.locality ||
              locationDetails.raw?.neighborhood ||
              "",
            vicinity: locationDetails.raw?.administrative_area_level_1 || "",
          });

          // If we have a place ID, we can get even more detailed information
          if (locationDetails.placeId) {
            const placesService = new window.google.maps.places.PlacesService(
              document.createElement("div")
            );
            placesService.getDetails(
              {
                placeId: locationDetails.placeId,
                fields: ["name", "formatted_address", "geometry", "vicinity"],
              },
              (place, status) => {
                if (status === "OK" && place) {
                  setLocationDetails((prev) => ({
                    ...prev,
                    placeName: place.name || prev.placeName,
                    vicinity: place.vicinity || prev.vicinity,
                  }));
                }
              }
            );
          }
        } catch (error) {
          console.error("Error getting location details:", error);
          setAlert({
            show: true,
            message: "Error getting location details",
            severity: "error",
          });
        }
      });
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const reportData = {
        description,
        location,
        category: issueAnalysis?.category || "other",
        imageUrl,
        priority: selectedPriority,
        aiPriority: issueAnalysis?.severity || selectedPriority,
        createdById: user.id,
        // Add location details
        coordinates: locationDetails?.coordinates || null,
        address: locationDetails?.address || location,
        district: locationDetails?.raw?.locality || null,
        state: locationDetails?.raw?.administrative_area_level_1 || null,
      };

      const response = await fetch("/api/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reportData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data) {
        setAlert({
          show: true,
          message: "Issue reported successfully!",
          severity: "success",
        });

        // Clear form
        setImageUrl("");
        setDescription("");
        setLocation("");
        setIssueAnalysis(null);
        setSelectedPriority("medium");

        // Refresh dashboard data after submitting new issue
        fetchDashboardData();
      }
    } catch (error) {
      console.error("Error submitting issue:", error);
      setAlert({
        show: true,
        message: error.response?.data?.error || "Error submitting issue",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // Update the Stats Cards section in the Dashboard Tab
  // const statsCards = [
  //   {
  //     title: "Active Requests",
  //     value: dashboardStats?.statusDistribution?.pending || 0,
  //     icon: <Assignment />,
  //   },
  //   {
  //     title: "In Progress",
  //     value: dashboardStats?.statusDistribution?.inProgress || 0,
  //     icon: <Construction />,
  //   },
  //   {
  //     title: "Resolved Issues",
  //     value: dashboardStats?.statusDistribution?.resolved || 0,
  //     icon: <CheckCircle />,
  //   },
  //   {
  //     title: "Total Reports",
  //     value: dashboardStats?.totalIssues || 0,
  //     icon: <Assessment />,
  //   },
  // ];

  // Update the Service Requests Chart data
  const serviceRequestData =
    dashboardStats?.monthlyStats?.map((stat) => ({
      category: stat.category,
      count: stat._count,
    })) || [];

  // Update the Environmental Metrics data
  const environmentalData =
    dashboardStats?.categoryStats?.map((stat) => ({
      name: stat.category,
      value: stat._count,
    })) || [];

  // Update Profile section to show current user data
  const ProfileSection = () => (
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
            value={user.name || ""}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            value={user.email || ""}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Phone"
            variant="outlined"
            value={user.phoneNumber || ""}
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
            {recentActivities.map((activity) => (
              <ListItem key={activity.id}>
                <ListItemText
                  primary={activity.category}
                  secondary={new Date(activity.createdAt).toLocaleDateString()}
                />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </DashboardCard>
  );

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Box
          sx={{
            borderRadius: "16px",
            bgcolor: "background.paper",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
            mb: 4,
            overflow: "hidden",
          }}
        >
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              "& .Mui-selected": {
                color: "#22c55e !important",
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#22c55e",
                height: "3px",
              },
              "& .MuiTab-root": {
                minHeight: "64px",
                fontSize: "1rem",
              },
            }}
          >
            <Tab
              icon={<Assignment />}
              label="Dashboard"
              sx={{
                textTransform: "none",
                fontWeight: "medium",
                fontSize: "1rem",
              }}
            />
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
                  {/* <StatsCard>
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
                  </StatsCard> */}
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
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#22c55e" />
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

            {/* Updated Recent Activities */}
            <RecentActivitiesSection activities={recentActivities} />
          </Grid>
        </TabPanel>

        {/* Post an Issue Tab */}
        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            {/* Left Column */}
            <Grid item xs={12} md={6}>
              <DashboardCard>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ color: "#22c55e", mb: 3 }}
                >
                  Upload Image
                </Typography>

                <Collapse in={alert.show}>
                  <Alert
                    severity={alert.severity}
                    onClose={() => setAlert({ ...alert, show: false })}
                    sx={{ mb: 2 }}
                  >
                    {alert.message}
                  </Alert>
                </Collapse>

                <Box sx={{ mb: 4 }}>
                  <CloudinaryUpload onImageUpload={handleImageUpload} />
                </Box>

                {loading && (
                  <Box
                    sx={{ display: "flex", justifyContent: "center", my: 2 }}
                  >
                    <CircularProgress sx={{ color: "#22c55e" }} />
                  </Box>
                )}

                {issueAnalysis && (
                  <Paper
                    elevation={2}
                    sx={{ p: 2, mt: 2, bgcolor: "background.default" }}
                  >
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      sx={{ color: "#22c55e", fontWeight: "medium" }}
                    >
                      AI Analysis Results
                    </Typography>
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                    >
                      <Chip
                        label={`Category: ${issueAnalysis.category}`}
                        color="primary"
                        sx={{ bgcolor: "#22c55e", maxWidth: "fit-content" }}
                      />
                      <Box
                        sx={{ display: "flex", gap: 1, alignItems: "center" }}
                      >
                        <Chip
                          label={`Confidence: ${Math.round(
                            issueAnalysis.confidence * 100
                          )}%`}
                          color="primary"
                          variant="outlined"
                        />
                        <Alert
                          severity={
                            issueAnalysis.severity === "HIGH"
                              ? "error"
                              : issueAnalysis.severity === "MEDIUM"
                              ? "warning"
                              : "info"
                          }
                          sx={{ flexGrow: 1 }}
                        >
                          Priority Level: {issueAnalysis.severity}
                        </Alert>
                      </Box>
                    </Box>
                  </Paper>
                )}
              </DashboardCard>
            </Grid>

            {/* Right Column */}
            <Grid item xs={12} md={6}>
              <DashboardCard>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ color: "#22c55e", mb: 3 }}
                >
                  Issue Details
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  {/* Description Field */}
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Describe the Problem"
                    variant="outlined"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    helperText="AI will analyze your description to classify the issue"
                  />

                  {/* Location Field */}
                  <Box>
                    <TextField
                      id="location-input"
                      fullWidth
                      label="Location"
                      variant="outlined"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Search for a location or use current location"
                      InputProps={{
                        endAdornment: (
                          <Box
                            sx={{
                              display: "flex",
                              gap: 1,
                              alignItems: "center",
                            }}
                          >
                            {locationDetails ? (
                              <Chip
                                icon={<LocationOn />}
                                label="Location Set"
                                color="success"
                                onDelete={() => {
                                  setLocation("");
                                  setLocationDetails(null);
                                }}
                              />
                            ) : (
                              <Button
                                size="small"
                                onClick={handleLocationClick}
                                startIcon={<LocationOn />}
                                disabled={loading}
                              >
                                {loading
                                  ? "Getting Location..."
                                  : "Use Current Location"}
                              </Button>
                            )}
                          </Box>
                        ),
                      }}
                    />

                    {locationDetails && (
                      <Paper
                        elevation={1}
                        sx={{
                          mt: 2,
                          p: 2,
                          bgcolor: "background.default",
                          borderRadius: 1,
                          border: "1px solid",
                          borderColor: "divider",
                        }}
                      >
                        <Grid container spacing={2}>
                          {locationDetails.raw?.locality && (
                            <Grid item xs={12} sm={6}>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                City: {locationDetails.raw.locality}
                              </Typography>
                            </Grid>
                          )}
                          {locationDetails.raw?.neighborhood && (
                            <Grid item xs={12} sm={6}>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Area: {locationDetails.raw.neighborhood}
                              </Typography>
                            </Grid>
                          )}
                          {locationDetails.raw?.administrative_area_level_1 && (
                            <Grid item xs={12} sm={6}>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                State:{" "}
                                {
                                  locationDetails.raw
                                    .administrative_area_level_1
                                }
                              </Typography>
                            </Grid>
                          )}
                          {locationDetails.coordinates && (
                            <Grid item xs={12} sm={6}>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Coordinates: {locationDetails.coordinates}
                              </Typography>
                            </Grid>
                          )}
                        </Grid>
                      </Paper>
                    )}
                  </Box>

                  {/* Priority Selection */}
                  <Box>
                    <Typography variant="subtitle1" gutterBottom>
                      Priority Level{" "}
                      {issueAnalysis &&
                        `(AI Suggested: ${issueAnalysis.severity})`}
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      {["low", "medium", "high"].map((priority) => (
                        <Button
                          key={priority}
                          variant={
                            selectedPriority === priority
                              ? "contained"
                              : "outlined"
                          }
                          onClick={() => setSelectedPriority(priority)}
                          sx={{
                            flex: 1,
                            bgcolor:
                              selectedPriority === priority
                                ? priority === "high"
                                  ? "#ef4444"
                                  : priority === "medium"
                                  ? "#f97316"
                                  : "#22c55e"
                                : "transparent",
                            "&:hover": {
                              bgcolor:
                                priority === "high"
                                  ? "#dc2626"
                                  : priority === "medium"
                                  ? "#ea580c"
                                  : "#16a34a",
                            },
                          }}
                        >
                          {priority.toUpperCase()}
                        </Button>
                      ))}
                    </Box>
                  </Box>

                  {/* Submit Button */}
                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    disabled={loading || !imageUrl || !description || !location}
                    onClick={handleSubmit}
                    sx={{
                      bgcolor: "#22c55e",
                      "&:hover": { bgcolor: "#16a34a" },
                      py: 1.5,
                      mt: 2,
                    }}
                  >
                    {loading ? (
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <CircularProgress size={20} sx={{ color: "white" }} />
                        <span>Submitting...</span>
                      </Box>
                    ) : (
                      "Submit Issue"
                    )}
                  </Button>
                </Box>
              </DashboardCard>
            </Grid>
          </Grid>
        </TabPanel>

        {/* My Issues Tab */}
        <TabPanel value={tabValue} index={2}>
          <MyIssuesTab issues={myIssues} />
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
          <ProfileSection />
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
