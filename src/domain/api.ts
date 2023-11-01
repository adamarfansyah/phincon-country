/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useState, useEffect } from "react";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

const Api = axios.create({
  baseURL: "https://restcountries.com/v3.1",
  headers: {
    "Content-Type": "Application/json",
  },
});

export const useFetch = (endpoint: string = "", method: Method = "GET", body: any = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState([]);

  const fetchData = async () => {
    try {
      const response = await Api.request({
        url: endpoint,
        method: method,
        data: body,
      });
      setData(response.data);
      setLoading(false);
    } catch (error: any) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (endpoint !== "") {
      fetchData();
    }
  }, [endpoint]);

  return { data, loading, error };
};

export const usePost = (endpoint: string = "", method: Method = "POST") => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const mutate = async (formData: any) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const response = await Api.request({
        url: endpoint,
        method: method,
        data: formData,
      });

      if (response.status === 201) {
        setSubmitSuccess(true);
      }
    } catch (error: any) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, submitError, submitSuccess, mutate };
};

export const useDelete = (endpoint: string = "", method: Method = "DELETE") => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const onDelete = async (formData: any) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const response = await Api.request({
        url: endpoint,
        method: method,
        data: formData,
      });

      if (response.status === 201) {
        setSubmitSuccess(true);
      }
    } catch (error: any) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, submitError, submitSuccess, onDelete };
};
