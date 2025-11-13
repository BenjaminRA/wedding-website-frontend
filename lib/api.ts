import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY || ''}`,
  },
});

export const getUploadsUrl = (assetUrl: string) => {
  if (assetUrl.startsWith('/')) {
    return `${API_URL.replace('/api', '')}${assetUrl}`;
  }
  return assetUrl;
};

export const getWelcome = async (locale: string = 'en') => {
  const response = await api.get(`/welcome?locale=${locale}&populate=*`);
  return response.data;
};

export const getGallery = async (locale: string = 'en') => {
  const response = await api.get(`/gallery?locale=${locale}&populate=*`);
  return response.data;
};

export const getVenue = async (locale: string = 'en') => {
  const response = await api.get(`/venue?locale=${locale}&populate=*`);
  return response.data;
};

export const getDressCode = async (locale: string = 'en') => {
  const response = await api.get(`/dress-code?locale=${locale}&populate=*`);
  return response.data;
};

export const getGifts = async (locale: string = 'en') => {
  const response = await api.get(`/gift?locale=${locale}&populate=*`);
  return response.data;
};

export const getSchedule = async (locale: string = 'en') => {
  const response = await api.get(`/schedule?locale=${locale}&populate=*`);
  return response.data;
};

export const findGuestWithPassword = async (
  firstName: string,
  lastName: string,
  password: string
) => {
  const response = await api.post('/guests/find-with-password', {
    firstName,
    lastName,
    password,
  });
  return response.data;
};

export const updateGuestRSVP = async (
  guestId: number | string,
  data: { rsvp: boolean; attending: boolean }
) => {
  const response = await api.put(`/guests/${guestId}`, {
    data: {
      rsvp: data.rsvp,
      attending: data.attending,
    },
  });
  return response.data;
};

export const submitRSVP = async (data: any) => {
  const response = await api.post('/rsvps', { data });
  return response.data;
};

export default api;
