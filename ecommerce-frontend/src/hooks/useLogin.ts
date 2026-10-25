import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

// React Hook Form and zod
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod/src/index.js";
import { loginSchema, type LoginFormValues } from "@validations/loginSchema";

// Rediux
import { useAppDispatch, useAppSelector } from "@app/hooks";
import { authLogin, clearStateAuth } from "@features/auth/authSlice";

export default function useLogin() {
  const dispatch = useAppDispatch();
  const { error, loading, accessToken } = useAppSelector((state) => state.auth);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<LoginFormValues>({
    mode: "onBlur",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    console.log(data);
    if (searchParams.get("message")) {
      setSearchParams("");
    }
    dispatch(authLogin(data))
      .unwrap()
      .then(() => {
        navigate("/");
      });
  };

  useEffect(() => {
    return () => {
      dispatch(clearStateAuth());
    };
  }, [dispatch]);

  return {
    error,
    loading,
    accessToken,
    formErrors,
    control,
    searchParams,
    handleSubmit,
    onSubmit,
  };
}
