import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import "./App.css";
import MaterialUIDatePickers from "./Components/DatePicker";
import { CloudUpload, ArrowBack, Delete } from "@material-ui/icons";
import axios from "axios";

function App() {
  const [formInfo, setFormInfo] = useState({});
  console.log("forminfo", formInfo);
  const [selectedDate, setSelectedDate] = useState(null);
  const [priority, setPriority] = useState("");
  const [location, setLocation] = useState("");
  const [requestType, setRequestType] = useState("");
  const [subRequestType, setSubRequestType] = useState("");
  const [emailErrorText, setEmailErrorText] = useState("");
  const [nameErrorText, setNameErrorText] = useState("");
  const [numberErrorText, setNumberErrorText] = useState("");
  const [priorityErrorText, setPriorityErrorText] = useState("");
  const [requestErrorText, setRequestErrorText] = useState("");
  const [subRequestErrorText, setSubRequestErrorText] = useState("");
  const [maintenanceRequestErrorText, setMaintenanceRequestErrorText] =
    useState("");
  const [unitErrorText, setUnitErrorText] = useState("");
  const [locationErrorText, setLocationErrorText] = useState("");
  const [dateErrorText, setDateErrorText] = useState("");
  const [imageErrorText, setImageErrorText] = useState("");

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    setFormInfo({
      ...formInfo,
      date: newDate,
    });
    setDateErrorText("");
  };

  const handleProfileChange = async (event) => {
    document.getElementById("fileInput").click();
  };

  const HandlePhoneNumber = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setFormInfo({
      ...formInfo,
      phoneNumber: formattedPhoneNumber,
    });
    setNumberErrorText("");
  };

  const formatPhoneNumber = (value) => {
    if (!value) return value;
    const inputPhoneNumber = value.replace(/[^\d]/g, "");
    const phoneNumberLength = inputPhoneNumber.length;
    if (phoneNumberLength < 4) return inputPhoneNumber;
    if (phoneNumberLength < 7) {
      return `${inputPhoneNumber.slice(0, 3)}-${inputPhoneNumber.slice(3)}`;
    }
    return `${inputPhoneNumber.slice(0, 3)}-${inputPhoneNumber.slice(
      3,
      6
    )}-${inputPhoneNumber.slice(6, 10)}`;
  };

  const saveFormData = async (e) => {
    e.preventDefault();
    setDateErrorText(!formInfo.date ? "This field is required" : "");
    setNameErrorText(!formInfo.fullName ? "This field is required" : "");
    setEmailErrorText(!formInfo.email ? "This field is required" : "");
    setNumberErrorText(!formInfo.phoneNumber ? "This field is required" : "");
    setPriorityErrorText(!formInfo.priority ? "This field is required" : "");
    setLocationErrorText(!formInfo.location ? "This field is required" : "");
    setUnitErrorText(!formInfo.unit ? "This field is required" : "");
    setRequestErrorText(!formInfo.requestType ? "This field is required" : "");
    setMaintenanceRequestErrorText(
      !formInfo.maintenanceDetails ? "This field is required" : ""
    );
    setSubRequestErrorText(
      !formInfo.subRequestType ? "This field is required" : ""
    );
    setImageErrorText(!formInfo.formImage ? "This field is required" : "");
    const formData = new FormData();
    formData.append("date", formInfo.date);
    formData.append("fullName", formInfo.fullName);
    formData.append("email", formInfo.email);
    formData.append("phoneNumber", formInfo.phoneNumber);
    formData.append("priority", formInfo.priority);
    formData.append("location", formInfo.location);
    formData.append("unit", formInfo.unit);
    formData.append("requestType", formInfo.requestType);
    formData.append("maintenanceDetails", formInfo.maintenanceDetails);
    formData.append("subRequestType", formInfo.subRequestType);
    formData.append("formImage", formInfo.formImage);
    // let params = {
    //   formInfo,
    // };
    const formKeys = [
      "fullName",
      "email",
      "phoneNumber",
      "priority",
      "location",
      "unit",
      "requestType",
      "maintenanceDetails",
      "subRequestType",
    ];

    const isFormValid = formKeys.every((e) =>
      Object.keys(formInfo).includes(e)
    );
    console.log("formData", formData);
    try {
      if (isFormValid) {
        await axios.post("http://localhost:3002/api/submitData", formData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const emailValidation = (event) => {
    const email = event.target.value;
    setFormInfo({
      ...formInfo,
      email: email,
    });
    if (email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
      setEmailErrorText("");
    } else {
      setEmailErrorText("Please enter valid email address");
    }
  };

  const deleteSelectedFile = (e) => {
    setFormInfo({ ...formInfo, formImage: "" });
  };

  return (
    <>
      <Paper>
        <Grid container>
          <Grid
            item
            lg={1}
            sm={1}
            md={1}
            xs={1}
            style={{
              padding: "20px 10px ",
              fontWeight: "bold",
            }}
          >
            <ArrowBack style={{ fontSize: "28px" }} />
          </Grid>
          <Grid
            item
            lg={11}
            sm={11}
            md={11}
            xs={11}
            style={{
              padding: "10px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              src="https://www.sumasoft.com/wp-content/uploads/2021/02/suma-soft-logo-1-75x40.png"
              alt="Logo"
              height="50px"
            />
          </Grid>
        </Grid>
      </Paper>
      <Paper
        style={{
          backgroundColor: "#f3efefa6",
          padding: "10px 10px 10px 10px",
        }}
      >
        <Grid container style={{ display: "flex", justifyContent: "center" }}>
          <Grid item md={6} xs={12} lg={6}>
            <Typography
              style={{
                fontWeight: "bold",
                fontSize: "30px",
                marginBottom: "10px",
              }}
            >
              Service Request
            </Typography>

            <Paper elevation={0} style={{ padding: "30px" }}>
              <Grid container spacing={2}>
                <Grid item md={12} xs={12} lg={12}>
                  <MaterialUIDatePickers
                    value={selectedDate}
                    handleDateChange={handleDateChange}
                    dateErrorText={dateErrorText}
                  />
                </Grid>
                <Grid item md={12} xs={12} lg={12}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    size="small"
                    variant="outlined"
                    required
                    error={nameErrorText}
                    helperText={nameErrorText}
                    value={formInfo.fullName || ""}
                    onChange={(event) => {
                      setFormInfo({
                        ...formInfo,
                        fullName: event.target.value,
                      });
                      setNameErrorText("");
                    }}
                  />
                </Grid>
                <Grid item md={12} xs={12} lg={12}>
                  <TextField
                    fullWidth
                    type="email"
                    label="Email"
                    size="small"
                    variant="outlined"
                    required
                    error={emailErrorText}
                    helperText={emailErrorText}
                    value={formInfo.email || ""}
                    onChange={(e) => emailValidation(e)}
                  />
                </Grid>
                <Grid item md={12} xs={12} lg={12}>
                  <TextField
                    required
                    error={numberErrorText}
                    helperText={numberErrorText}
                    fullWidth
                    label="Phone Number"
                    size="small"
                    variant="outlined"
                    placeholder="xxx-xxx-xxxx"
                    value={formInfo.phoneNumber || ""}
                    onChange={(e) => HandlePhoneNumber(e)}
                  />
                </Grid>

                <Grid item md={12} xs={12} lg={12}>
                  <FormControl
                    variant="outlined"
                    fullWidth
                    size="small"
                    required
                    error={priorityErrorText}
                  >
                    <InputLabel>Priority</InputLabel>
                    <Select
                      required
                      label="Priority"
                      fullWidth
                      MenuProps={{
                        PaperProps: {
                          style: { marginTop: 45 },
                        },
                      }}
                      value={priority}
                      onChange={(event) => {
                        setPriority(event.target.value);
                        setFormInfo({
                          ...formInfo,
                          priority: event.target.value,
                        });
                        setPriorityErrorText("");
                      }}
                    >
                      <MenuItem value="Urgent - Live Chat Conversation">
                        Urgent - Live Chat Conversation
                      </MenuItem>
                    </Select>
                    <FormHelperText>{priorityErrorText}</FormHelperText>
                  </FormControl>
                </Grid>

                <Grid item md={12} xs={12} lg={12}>
                  <FormControl
                    variant="outlined"
                    fullWidth
                    size="small"
                    required
                    error={locationErrorText}
                  >
                    <InputLabel>Location</InputLabel>
                    <Select
                      MenuProps={{
                        PaperProps: {
                          style: { marginTop: 45 },
                        },
                      }}
                      required
                      label="Location"
                      fullWidth
                      value={location}
                      onChange={(event) => {
                        setLocation(event.target.value);
                        setFormInfo({
                          ...formInfo,
                          location: event.target.value,
                        });
                        setLocationErrorText("");
                      }}
                    >
                      <MenuItem value="In - Unit">In - Unit</MenuItem>
                    </Select>
                    <FormHelperText error={locationErrorText}>
                      {locationErrorText}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item md={12} xs={12} lg={12}>
                  <TextField
                    type="number"
                    InputProps={{
                      inputProps: {
                        max: 3,
                        min: 1,
                      },
                    }}
                    required
                    error={unitErrorText}
                    helperText={unitErrorText}
                    fullWidth
                    label="Unit"
                    size="small"
                    variant="outlined"
                    value={formInfo.unit || ""}
                    onChange={(event) => {
                      setFormInfo({
                        ...formInfo,
                        unit: event.target.value,
                      });
                      setUnitErrorText("");
                    }}
                  />
                </Grid>
                <Grid item md={12} xs={12} lg={12}>
                  <FormControl
                    variant="outlined"
                    fullWidth
                    size="small"
                    required
                    error={requestErrorText}
                  >
                    <InputLabel>Request Type</InputLabel>
                    <Select
                      required
                      MenuProps={{
                        PaperProps: {
                          style: { marginTop: 45 },
                        },
                      }}
                      label="Request Type"
                      fullWidth
                      value={requestType}
                      onChange={(event) => {
                        setRequestType(event.target.value);
                        setFormInfo({
                          ...formInfo,
                          requestType: event.target.value,
                        });
                        setRequestErrorText("");
                      }}
                    >
                      <MenuItem value="Electicity">Electicity</MenuItem>
                    </Select>
                    <FormHelperText error={requestErrorText}>
                      {requestErrorText}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item md={12} xs={12} lg={12}>
                  <FormControl
                    variant="outlined"
                    fullWidth
                    size="small"
                    required
                    error={subRequestErrorText}
                  >
                    <InputLabel id="demo-simple-select-label">
                      Sub - Request Type
                    </InputLabel>
                    <Select
                      MenuProps={{
                        PaperProps: {
                          style: { marginTop: 45 },
                        },
                      }}
                      required
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Sub - Request Type"
                      fullWidth
                      value={subRequestType}
                      onChange={(event) => {
                        setSubRequestType(event.target.value);
                        setFormInfo({
                          ...formInfo,
                          subRequestType: event.target.value,
                        });
                        setSubRequestErrorText("");
                      }}
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                    <FormHelperText error={subRequestErrorText}>
                      {subRequestErrorText}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item md={12} xs={12} lg={12}>
                  <TextField
                    required
                    error={maintenanceRequestErrorText}
                    helperText={maintenanceRequestErrorText}
                    multiline
                    fullWidth
                    label="Maintenance Request Details"
                    size="small"
                    variant="outlined"
                    minRows={4}
                    value={formInfo.maintenanceDetails || ""}
                    onChange={(event) => {
                      setFormInfo({
                        ...formInfo,
                        maintenanceDetails: event.target.value,
                      });
                      setMaintenanceRequestErrorText("");
                    }}
                  />
                </Grid>

                <Grid item md={12} xs={12} lg={12}>
                  <Box
                    fullWidth
                    style={{
                      border: "dotted",
                      height: "100px",
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                      borderColor: imageErrorText ? "red" : "#d3caca",
                    }}
                  >
                    <CloudUpload
                      style={{ fontSize: "50px", paddingTop: "10px" }}
                      color="primary"
                      onClick={handleProfileChange}
                    />
                    <input
                      required
                      type="file"
                      id="fileInput"
                      // accept=".png/*,.xlsx/*,.pdf/*"
                      multiple
                      onChange={(event) => {
                        setFormInfo({
                          ...formInfo,
                          formImage: event.target.files[0],
                        });
                        setImageErrorText("");
                      }}
                      style={{ display: "none" }}
                    />
                    <Typography color="primary">Tap to upload</Typography>
                  </Box>
                </Grid>
                {formInfo.formImage ? (
                  <Grid item md={12} xs={12} lg={12}>
                    <span
                      style={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <Typography>{formInfo.formImage.name}</Typography>
                      <Delete
                        color="primary"
                        onClick={(e) => deleteSelectedFile(e)}
                        style={{
                          height: 28,
                          width: 28,
                          float: "right",
                        }}
                      />
                    </span>
                  </Grid>
                ) : (
                  <Grid item md={12} xs={12} lg={12}>
                    <Typography style={{ color: "red" }}>
                      {imageErrorText}
                    </Typography>
                  </Grid>
                )}
                <Grid
                  item
                  md={12}
                  xs={12}
                  lg={12}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Button
                    onClick={(e) => saveFormData(e)}
                    variant="contained"
                    color="primary"
                  >
                    SEND REQUEST
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

export default App;
