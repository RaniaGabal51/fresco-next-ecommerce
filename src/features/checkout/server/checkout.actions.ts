"use server";

import axios from "axios";
import { cookies } from "next/headers";
import { shippingAddressValues } from "../schemas/checkout.schema";
import { apiClient } from "@/src/services/apiClient";

export async function createCashOrder({
  cartId,
  shippingAddress,
}: {
  cartId: string;
  shippingAddress: shippingAddressValues;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) {
    return {
      status: "fail",
      message: "you are not logged in.",
    };
  }

  try {
    const { data } = await apiClient.post(
      `/orders/${cartId}`,
      { shippingAddress },
      {
        headers: {
          token: token.value,
        },
      },
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        status: "fail",
        message:
          error.response?.data?.message ||
          error.message ||
          "Failed to create cash order.",
      };
    }

    return {
      status: "fail",
      message: error instanceof Error ? error.message : String(error),
    };
  }
}

export async function createOnlineOrder({
  cartId,
  shippingAddress,
  url,
}: {
  cartId: string;
  shippingAddress: shippingAddressValues;
  url: string;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) {
    return {
      status: "fail",
      message: "You are not logged in.",
    };
  }

  try {
    const { data } = await apiClient.post(
      `/orders/checkout-session/${cartId}?url=${encodeURIComponent(url)}`,
      { shippingAddress },
      {
        headers: {
          token: token.value,
        },
      },
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        status: "fail",
        message:
          error.response?.data?.message ||
          error.message ||
          "Failed to create online order.",
      };
    }

    return {
      status: "fail",
      message: error instanceof Error ? error.message : String(error),
    };
  }
}