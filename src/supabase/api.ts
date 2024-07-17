import supabase from "./config";

interface IsignUpWithEmailAndPasswordProps {
  email: string;
  password: string;
}

// ----- SIGN USER UP WITH EMAIL AND PASSWORD ----- //
export const signUpWithEmailAndPassword = async (
  props: IsignUpWithEmailAndPasswordProps
) => {
  return await supabase.auth.signUp({
    email: props.email,
    password: props.password,
  });
};

interface IsignInWithEmailAndPasswordProps {
  email: string;
  password: string;
}

// ----- SING IN WITH EMAIL AND PASSWORD ----- //
export const signInWithEmailAndPassword = async (
  props: IsignInWithEmailAndPasswordProps
) => {
  return await supabase.auth.signInWithPassword({
    email: props.email,
    password: props.password,
  });
};

// ----- SIGN OUT A USER ----- //
export const signOut = async () => {
  return await supabase.auth.signOut();
};

// ----- GET CURRENT USER ----- //
export const getCurrentUser = async () => {
  return await supabase.auth.getUser();
};

// ----- GET TABLE DATA FOR CARS ON LOT ----- //
export const fetchLotTableData = async () => {
  return await supabase.from("car_information").select(`
    id, 
    make,
    model,
    year`);
};

// ----- GET ALL INFO ON A CAR BASED ON UUID ----- //
export const fetchCarDetails = async (id: string | undefined) => {
  if (id) {
    return await supabase.from("car_information").select().eq("id", id);
  }
};

// ----- GET ALL RESERVATIONS ----- //
export const fetchReservations = async () => {
  // Convert the JavaScript Date object to a start and end of day in ISO format
  const startOfDay = new Date();
  startOfDay.setUTCHours(0, 0, 0, 0); // Set to the start of the day (UTC)

  const endOfDay = new Date();
  endOfDay.setUTCHours(23, 59, 59, 999); // Set to the end of the day (UTC)

  // Fetch reservations where pickup_time is within the specified day
  const { data, error } = await supabase
    .from("reservations")
    .select()
    .gte("pickup_time", startOfDay.toISOString())
    .lt("pickup_time", endOfDay.toISOString());

  if (error) {
    console.error("Error fetching reservations:", error);
    return [];
  }

  return data;
};

// ----- GET ALL RESSERVATIONS ON A GIVEN DATE ----- //
export const fetchReservationsOnDate = async (date: string | number | Date) => {
  // Convert the JavaScript Date object to a start and end of day in ISO format
  const startOfDay = new Date(date);
  startOfDay.setUTCHours(0, 0, 0, 0); // Set to the start of the day (UTC)

  const endOfDay = new Date(date);
  endOfDay.setUTCHours(23, 59, 59, 999); // Set to the end of the day (UTC)

  // Fetch reservations where pickup_time is within the specified day
  const { data, error } = await supabase
    .from("reservations")
    .select()
    .gte("pickup_time", startOfDay.toISOString())
    .lt("pickup_time", endOfDay.toISOString())
    .order("pickup_time", { ascending: true });

  if (error) {
    console.error("Error fetching reservations:", error);
    return [];
  }

  return data;
};

// ----- GET BRANCH LOCATION BASED ON USER ID ----- //
export const fetchBranchLocationByUserId = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const id = user?.id;

  if (!id) {
    throw new Error("User not authenticated");
  }

  const { data, error } = await supabase.rpc("get_branch_location", {
    user_id: id,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data[0];
};
