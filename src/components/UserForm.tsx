import { useState, useEffect } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addUser } from "../store/formSlice";

const UserForm = () => {
  const [isDirty, setIsDirty] = useState(false);
  const dispatch = useDispatch();

  // Load stored users from localStorage on mount
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    console.log("Stored Users:", storedUsers);
  }, []);

  // Warn user if there are unsaved changes.
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      email: "",
      phone: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      address: Yup.string().required("Address is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string().required("Phone is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      const userId = Date.now(); 
      const userData = { id: userId, ...values };

     
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

      const updatedUsers = [...existingUsers, userData];

      
      localStorage.setItem("users", JSON.stringify(updatedUsers));

     
      dispatch(addUser(userData));

      setIsDirty(false);
      resetForm();
      alert("User data saved!");
    },
  });


  useEffect(() => {
    const dirty =
      formik.values.name ||
      formik.values.address ||
      formik.values.email ||
      formik.values.phone;
    setIsDirty(!!dirty);
  }, [formik.values]);

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{ maxWidth: 400, margin: "20px auto", display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Typography variant="h5" textAlign="center">
        User Data Form
      </Typography>
      <TextField
        label="Name"
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={Boolean(formik.touched.name && formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
      />
      <TextField
        label="Address"
        name="address"
        value={formik.values.address}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={Boolean(formik.touched.address && formik.errors.address)}
        helperText={formik.touched.address && formik.errors.address}
      />
      <TextField
        label="Email"
        name="email"
        type="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={Boolean(formik.touched.email && formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      <TextField
        label="Phone"
        name="phone"
        value={formik.values.phone}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={Boolean(formik.touched.phone && formik.errors.phone)}
        helperText={formik.touched.phone && formik.errors.phone}
      />
      <Button type="submit" variant="contained">
        Submit
      </Button>
    </Box>
  );
};

export default UserForm;
