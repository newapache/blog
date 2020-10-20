import React, { useState, useEffect } from "react";
import {
  NavLink,
  Modal,
  ModalHeader,
  ModalBody,
  Alert,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_ERROR_REQUEST, LOGIN_REQUEST } from "../../redux/types";

const LoginModdal = () => {
  const [modal, setModal] = useState(false);
  const [localMsg, setLocalMsg] = useState("");
  const [form, setValues] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const { errorMsg } = useSelector((state) => state.auth);
};

export default LoginModdal;
