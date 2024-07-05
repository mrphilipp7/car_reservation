export type TUser = {
  id: string;
  username: string;
  password: string;
  terms: boolean;
};

export type Car = {
  id: string; // UUID format
  color: string; // Color of the car
  created_at: string; // ISO date string
  in_service: boolean; // Indicates if the car is in service
  license_num: string; // License number
  make: string; // Make of the car (e.g., Chevy)
  mileage: string; // Mileage as a string
  model: string; // Model of the car (e.g., Cruise)
  vec_type: string; // Vehicle type (e.g., sedan)
  vim: string; // VIN (Vehicle Identification Number)
  year: number; // Year of manufacture
};

export type TReservation = {
  id: string;
  created_at: string;
  pickup_time: string;
  status: string;
  car_id: string;
};
