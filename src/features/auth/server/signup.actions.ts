"use server";

import { z } from "zod";
import { signupSchema, signupValues } from "../schemas/signup.schema";
import { AxiosRequestConfig, isAxiosError } from "axios";
import { apiClient } from "@/src/services/apiClient";


type SignupFieldErrors = Partial<Record<keyof signupValues, string[]>>;

type SignupActionReturn =
  | { success: true; message: string }
  | { success: false; message: string; fieldErrors?: SignupFieldErrors };

export async function signupAction(values: signupValues):Promise<SignupActionReturn>{
  const validationResults = signupSchema.safeParse(values);

  if (validationResults.success === false) {
    const { formErrors, fieldErrors } = z.flattenError(validationResults.error);

    return {
      success: false,
      message: formErrors[0] ?? "fix errors",
      fieldErrors,
    };
  }

  try {
    const options: AxiosRequestConfig = {
      method: "POST",
      url: `/auth/signup`,
      data: validationResults.data,
    };

    await apiClient.request(options);

    return {
      success: true,
      message: "created successfully",
    };
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        success: false,
        message: error.response?.data.message ?? "errors",
      };
    }

    return {
      success: false,
      message: "wrong",
    };
  }
}
