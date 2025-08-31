import { clearAuthCookies, getToken } from "@/utils/cookies";
import { API_ENDPOINT } from "../constants/endpoint";
import type { LoginPayload, RegisterPayload } from "../types/payload/auth";
import type { ChangePasswordPayload } from "../types/payload/change-password";
import { ExtendedError } from "../extended-error";

export async function Register({ name, email, phone, password, address }: RegisterPayload) {
  const response = await fetch(`${API_ENDPOINT}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      phone,
      password,
      address,
    }),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw ExtendedError.fromApiResponse(responseData, response.status);
  }

  return responseData;
}

export async function Login({ phone, password }: LoginPayload) {
  const response = await fetch(`${API_ENDPOINT}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      phone,
      password,
    }),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw ExtendedError.fromApiResponse(responseData, response.status);
  }

  return responseData;
}

export async function ChangePassword({
  currentPassword,
  newPassword,
  newPasswordConfirmation,
}: ChangePasswordPayload) {
  const token = getToken();
  const response = await fetch(`${API_ENDPOINT}/auth/password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({
      currentPassword,
      newPassword,
      newPasswordConfirmation,
    }),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw ExtendedError.fromApiResponse(responseData, response.status);
  }

  return responseData;
}

export async function Logout(): Promise<void> {
  const token = getToken();
  const response = await fetch(`${API_ENDPOINT}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw ExtendedError.fromApiResponse(responseData, response.status);
  }

  clearAuthCookies();
  return responseData;
}
