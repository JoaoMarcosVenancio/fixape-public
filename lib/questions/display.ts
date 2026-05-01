const SUBJECT_DISPLAY_NAMES: Record<string, string> = {
  "Língua Portuguesa (Português)": "Língua Portuguesa",
  "Direito Constitucional (CF/1988 e Doutrina)": "Direito Constitucional",
};

export function getSubjectDisplayName(subject: string): string {
  return SUBJECT_DISPLAY_NAMES[subject] ?? subject;
}
