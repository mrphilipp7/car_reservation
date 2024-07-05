import supabase from "@/supabase/config";
import { redirect } from "react-router-dom";

export const AppLoader = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/");
  }
  return null;
};
