'use server';

import { createClient } from "@/lib/supabase/server";

export interface SaveRecommendationHistoryParams {
  academicResults: any[];
  skills: string[];
  interests: string[];
  personalityTraits: string[];
  aiResponse: any;
  overallConfidence: number;
}

export async function saveRecommendationHistory(params: SaveRecommendationHistoryParams) {
  const supabase = await createClient();
  const { data: authData, error: authError } = await supabase.auth.getClaims();

  if (authError || !authData?.claims) {
    return { error: "Not authenticated" };
  }

  const userId = (authData.claims as any).sub;

  const { data, error } = await supabase
    .from("recommendation_history")
    .insert({
      user_id: userId,
      academic_results: params.academicResults,
      skills: params.skills,
      interests: params.interests,
      personality_traits: params.personalityTraits,
      ai_response: params.aiResponse,
      overall_confidence: params.overallConfidence,
    })
    .select()
    .single();

  if (error) {
    console.error("Error saving recommendation history:", error);
    return { error: error.message };
  }

  return { data };
}

export async function getRecommendationHistory() {
  const supabase = await createClient();
  const { data: authData, error: authError } = await supabase.auth.getClaims();

  if (authError || !authData?.claims) {
    return { error: "Not authenticated", data: [] };
  }

  const userId = (authData.claims as any).sub;

  const { data, error } = await supabase
    .from("recommendation_history")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching recommendation history:", error);
    return { error: error.message, data: [] };
  }

  return { data: data || [] };
}
