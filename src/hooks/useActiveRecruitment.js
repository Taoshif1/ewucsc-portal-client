import { useEffect, useState } from "react";
import { publicApi } from "../services/api";

export const useActiveRecruitment = () => {
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    publicApi
      .get("/forms/public/active")
      .then((res) => {
        if (alive) setForm(res.data.form || null);
      })
      .catch(() => {
        if (alive) setForm(null);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, []);

  return { form, loading };
};
