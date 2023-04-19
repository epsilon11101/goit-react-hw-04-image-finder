import React, { Component, useEffect, useState } from "react";

import ImageGalleryItem from "./ImageGalleryItem/ImageGalleryItem";
import api from "../../services/api";
import classes from "./ImageGallery.module.css";

import Masonry from "@mui/lab/Masonry";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import toast, { Toaster } from "react-hot-toast";

import { createPortal } from "react-dom";

const portalElement = document.getElementById("portal");

const ImageGallery = (props) => {
  const { page, inputData } = props;
  const [fetchData, setFetchData] = useState([]);
  const [sorce, setSorce] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  const closeModal = () => setShowModal(false);
  const DataError = () => toast.error("error on fetching data");
  const warning = () =>
    toast("I cant find anything with this query", {
      icon: "👽",
    });

  useEffect(() => {
    const getData = async () => {
      let data = [];
      try {
        data = await fetchingData();
        setFetchData(data);
      } catch (error) {
        error();
      } finally {
        if (data.length === 0) warning();
      }
    };

    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      let data = [];
      try {
        data = await fetchingData();
        setFetchData([...fetchData, ...data]);
      } catch (error) {
      } finally {
      }
    };
    getData();
  }, [page]);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchingData();
        if (data.length === 0) warning();
        setFetchData(data);
      } catch (error) {
        DataError();
      }
    };
    getData();
  }, [inputData]);

  const fetchingData = async () => {
    setShowLoader(true);
    try {
      api.query = inputData;
      api.page = page;
      const fetchData = await api.fetch();
      setShowLoader(false);
      return fetchData;
    } catch (error) {
      error();
    } finally {
      setShowLoader(false);
    }
  };

  const clickedElementHandler = (e) => {
    const sorce = e.target.getAttribute("data-sorce");
    if (sorce) {
      setSorce(sorce);
      setShowModal(true);
    }
  };

  return (
    <div className={classes.wrapper} onClick={clickedElementHandler}>
      <Masonry columns={4} spacing={5} key="masonry">
        <ImageGalleryItem fetchData={fetchData} />
      </Masonry>
      {createPortal(
        <Modal
          open={showModal}
          onClose={closeModal}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <img
            src={sorce}
            alt="modalImg"
            style={{
              width: "50%",
              height: "50%",
              objectFit: "cover",
              border: "none",
              filter: "none",
              transform: "none",
              cursor: "none",
            }}
          />
        </Modal>,
        portalElement
      )}
      {createPortal(
        <Backdrop
          sx={{
            color: "#646cff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={showLoader}
        >
          <CircularProgress color="inherit" />
        </Backdrop>,
        portalElement
      )}
      {createPortal(<Toaster />, portalElement)}
    </div>
  );
};

export default ImageGallery;
