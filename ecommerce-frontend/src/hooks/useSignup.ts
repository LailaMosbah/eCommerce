// React and React Router
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
// React Hook Form and zod
import { signupSchema, type SignupFormValues } from "@validations/signupSchema";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Rediux
import { useAppDispatch, useAppSelector } from "@app/hooks";
import { authRegister, clearStateAuth } from "@features/auth/authSlice";

//Hooks
import useCheckEmailAvailability from "@hooks/useCheckEmailAvailability";

export default function useSignup() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { error, loading, accessToken } = useAppSelector((state) => state.auth);
  const {
    control,
    handleSubmit,
    formState: { errors: formState },
    getFieldState,
    trigger,
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const {
    emailEntered,
    checkEmailAvailability,
    emailAvailabilityStatus,
    resetCheckEmailAvailability,
  } = useCheckEmailAvailability();

  const onSubmit: SubmitHandler<SignupFormValues> = async (data) => {
    const { firstName, lastName, email, password } = data;
    dispatch(authRegister({ firstName, lastName, email, password }))
      .unwrap()
      .then(() => {
        navigate("/login?message=account_created");
      });
  };

  const emailOnBlurHandler = async (e: React.FocusEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;
    await trigger("email");
    const { isDirty, invalid } = getFieldState("email");
    if (isDirty && !invalid && emailEntered != emailValue) {
      checkEmailAvailability(emailValue);
    }

    if (isDirty && !invalid && emailEntered) {
      resetCheckEmailAvailability();
    }
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
    control,
    formState,
    emailAvailabilityStatus,
    handleSubmit,
    onSubmit,
    emailOnBlurHandler,
  };
}
