import { z } from "zod";
import { createServerClient } from "@/lib/supabase/server";

const similarQuestionSchema = z.object({
  id: z.string(),
  question: z.string(),
  similarity_score: z.number(),
  status: z.string(),
});

export type SimilarQuestion = z.infer<typeof similarQuestionSchema>;

const similarQuestionsSchema = z.array(similarQuestionSchema);

export async function detectDuplicateQuestions(
  dealId: string,
  question: string,
  threshold: number = 0.3
): Promise<SimilarQuestion[]> {
  const supabase = await createServerClient();

  const { data, error } = await supabase.rpc("find_similar_questions", {
    p_deal_id: dealId,
    p_question: question,
    p_threshold: threshold,
  });

  if (error) {
    console.error("Error detecting duplicates:", error);
    return [];
  }

  const parsed = similarQuestionsSchema.safeParse(data || []);
  if (!parsed.success) {
    console.error("Invalid duplicate detection response:", parsed.error);
    return [];
  }

  return parsed.data;
}
