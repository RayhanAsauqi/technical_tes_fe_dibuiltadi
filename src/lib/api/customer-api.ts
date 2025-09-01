import { getToken } from "@/utils/cookies";
import { API_ENDPOINT } from "../constants/endpoint";
import type { CustomerPayload } from "../types/payload/customer";
import { ExtendedError } from "../extended-error";

export async function CreateCustomer(payload: CustomerPayload): Promise<any> {
  const token = getToken();
  const response = await fetch(`${API_ENDPOINT}/customers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw ExtendedError.fromApiResponse(responseData, response.status);
  }

  return responseData;
}

export async function UpdateCustomer(code: string, payload: CustomerPayload): Promise<any> {
  const token = getToken();
  try {
    const response = await fetch(`${API_ENDPOINT}/customers/${code}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(payload),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw ExtendedError.fromApiResponse(responseData, response.status);
    }

    return responseData;
  } catch (error) {
    console.error("Update customer error:", error);
    throw error;
  }
}
