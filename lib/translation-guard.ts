export type ProtectedText = {
  text: string;
  restore: (translatedText: string) => string;
};

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function protectTranslationTerms(
  sourceText: string,
  terms: string[],
): ProtectedText {
  const replacements: Array<{ placeholder: string; value: string }> = [];
  const sortedTerms = [...new Set(terms)]
    .filter(Boolean)
    .sort((first, second) => second.length - first.length);

  let protectedText = sourceText;

  sortedTerms.forEach((term) => {
    const pattern = new RegExp(`\\b${escapeRegExp(term)}\\b`, "g");

    protectedText = protectedText.replace(pattern, (match) => {
      const existing = replacements.find((item) => item.value === match);
      const placeholder =
        existing?.placeholder ?? `__PROTECTED_TERM_${replacements.length}__`;

      if (!existing) {
        replacements.push({ placeholder, value: match });
      }

      return placeholder;
    });
  });

  return {
    text: protectedText,
    restore(translatedText: string) {
      return replacements.reduce(
        (result, item) => result.replaceAll(item.placeholder, item.value),
        translatedText,
      );
    },
  };
}
