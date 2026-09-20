"use server";

import { z } from "zod";
import { AxiosRequestConfig, isAxiosError } from "axios";
import { apiClient } from "@/src/services/apiClient";
import { loginSchema, loginValues } from "../schemas/login.schema";

type LoginResponse = {
  message: string;
  user: {
    name: string;
    email: string;
    role: string;
  };
  token: string;
};

type LoginFieldErrors = Partial<Record<keyof loginValues, string[]>>;

type LoginActionReturn =
  | { success: true; message: string; data: LoginResponse }
  | { success: false; message: string; fieldErrors?: LoginFieldErrors };

export async function loginAction(
  values: loginValues,
): Promise<LoginActionReturn> {
  const validationResults = loginSchema.safeParse(values);

  if (validationResults.success === false) {
    const { formErrors, fieldErrors } = z.flattenError(validationResults.error);

    return {
      success: false,
      message: formErrors[0] ?? "Please check the form fields and try again.",
      fieldErrors,
    };
  }

  try {
    const options: AxiosRequestConfig = {
      method: "POST",
      url: `/auth/signin`,
      data: validationResults.data,
    };

    const { data } = await apiClient.request(options);

    return {
      success: true,
      message: "Login successful.",
      data,
    };
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        success: false,
        message: error.response?.data.message ?? "Unable to log in. Please check your email and password.",
      };
    }

    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}
