"use server";

import { cookies } from "next/headers";
import { isAxiosError } from "axios";
import { apiClient } from "@/src/services/apiClient";
import type { Product } from "@/src/features/products/types/products.types";

type WishlistResponse = {
  status: "success" | "fail" | "error";
  message?: string;
  count?: number;
  data?: Product[] | Product;
};

async function getAuthToken() {
  const cookieStore = await cookies();
  return cookieStore.get("token")?.value;
}

export async function getWishlist(): Promise<WishlistResponse> {
  const token = await getAuthToken();

  if (!token) {
    return { status: "fail", message: "Please log in to view your wishlist." };
  }

  try {
    const { data } = await apiClient.get("/wishlist", {
      headers: { token },
    });

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        status: "fail",
        message: error.response?.data?.message ?? "Failed to load wishlist.",
      };
    }

    return { status: "fail", message: "Something went wrong." };
  }
}

export async function addProductToWishlist(
  productId: string,
): Promise<WishlistResponse> {
  const token = await getAuthToken();

  if (!token) {
    return { status: "fail", message: "Please log in to use your wishlist." };
  }

  try {
    const { data } = await apiClient.post(
      "/wishlist",
      { productId },
      { headers: { token } },
    );

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        status: "fail",
        message: error.response?.data?.message ?? "Failed to add product.",
      };
    }

    return { status: "fail", message: "Something went wrong." };
  }
}

export async function removeProductFromWishlist(
  productId: string,
): Promise<WishlistResponse> {
  const token = await getAuthToken();

  if (!token) {
    return { status: "fail", message: "Please log in to use your wishlist." };
  }

  try {
    const { data } = await apiClient.delete(`/wishlist/${productId}`, {
      headers: { token },
    });

    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        status: "fail",
        message: error.response?.data?.message ?? "Failed to remove product.",
      };
    }

    return { status: "fail", message: "Something went wrong." };
  }
}