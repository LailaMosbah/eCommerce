import { useState } from "react";

import axios from "axios";

type StatusEmail = "idle" | "checking" | "vaild" | "unValid" | "failed";

const useCheckEmailAvailability = () => {
  const [emailAvailabilityStatus, setEmailAvailabilityStatus] =
    useState<StatusEmail>("idle");

  const [emailEntered, setEmailEntered] = useState<null | string>(null);

  const checkEmailAvailability = async (email: string) => {
    setEmailEntered(email);
    setEmailAvailabilityStatus("checking");

    try {
      const response = await axios.get(
        `http://localhost:5005/users?email=${email}`,
      );

      if (!response.data.length) setEmailAvailabilityStatus("vaild");
      else setEmailAvailabilityStatus("unValid");
    } catch {
      setEmailAvailabilityStatus("failed");
    }
  };

  const resetCheckEmailAvailability = () => {
    setEmailAvailabilityStatus("idle");
    setEmailEntered(null);
  };

  return {
    emailAvailabilityStatus,
    emailEntered,
    checkEmailAvailability,
    resetCheckEmailAvailability,
  };
};

export default useCheckEmailAvailability;
