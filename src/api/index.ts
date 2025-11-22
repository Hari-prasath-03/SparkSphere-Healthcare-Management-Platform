import client from "@/lib/supabase";

export const signupUser = async (
  name: string,
  email: string,
  password: string
) => {
  return await client.auth.signUp({
    email,
    password,
    options: {
      data: { name },
    },
  });
};

export const loginUser = async (email: string, password: string) => {
  return await client.auth.signInWithPassword({
    email,
    password,
  });
};

export const signOutUser = async () => {
  return await client.auth.signOut();
};

export const getUserRole = async (userId: string) => {
  return await client.from("users").select("role").eq("id", userId).single();
};

export const profileSetup = async (
  userId: string,
  name: string,
  age: number | null,
  location: string | null,
  alternatePhone: string | null,
  bloodGroup: string | null,
  conditions: {
    sugar: boolean;
    thyroid: boolean;
    bonePain: boolean;
  }
) => {
  await client
    .from("patient_details")
    .insert({
      user_id: userId,
      name,
      age,
      location,
      alternate_phone: alternatePhone,
      blood_group: bloodGroup,
      condition_sugar: conditions.sugar,
      condition_thyroid: conditions.thyroid,
      condition_bone_pain: conditions.bonePain,
    })
    .single();
};

export const getProfile = async (userId: string) => {
  return await client
    .from("patient_details")
    .select("*")
    .eq("user_id", userId)
    .single();
};

export const getTreatments = async (patientId: string) => {
  return await client
    .from("treatments")
    .select("*, hospital:users!hospital_id(name, role)")
    .eq("patient_id", patientId)
    .order("treatment_date", { ascending: false });
};

export const addTreatment = async (
  patientId: string,
  hospitalId: string,
  description: string,
  prescription: Record<string, unknown>
) => {
  return await client
    .from("treatments")
    .insert({
      patient_id: patientId,
      hospital_id: hospitalId,
      description,
      prescription,
    })
    .single();
};
