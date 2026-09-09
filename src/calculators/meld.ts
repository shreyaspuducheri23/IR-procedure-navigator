/** Adult scores. References and intentional upstream differences: content/README.md. */
export type MeldValues = {
  bilirubin: string | number;
  inr: string | number;
  creatinine: string | number;
  sodium: string | number;
  albumin: string | number;
  female: boolean;
  dialysis: boolean;
};

export const clampNumber = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);
export const roundScore = (value: number) => clampNumber(Math.round(value), 6, 40);

export function calculateMeldScores(values: MeldValues) {
  const labs = [values.bilirubin, values.inr, values.creatinine, values.sodium, values.albumin].map(Number);
  if (labs.some((value) => !Number.isFinite(value) || value <= 0)) return null;
  const [bilirubin, inr, creatinine, sodium, albumin] = labs;
  const bounds = {
    bilirubin: Math.max(bilirubin, 1),
    inr: Math.max(inr, 1),
    sodium: clampNumber(sodium, 125, 137),
    albumin: clampNumber(albumin, 1.5, 3.5),
    meldNaCreatinine: values.dialysis ? 4 : clampNumber(creatinine, 1, 4),
    meld3Creatinine: values.dialysis ? 3 : clampNumber(creatinine, 1, 3),
  };
  const b = Math.log(bounds.bilirubin);
  const i = Math.log(bounds.inr);
  const sodiumDeficit = 137 - bounds.sodium;
  const albuminDeficit = 3.5 - bounds.albumin;
  // Round the initial MELD before sodium adjustment. Apply the historical
  // allocation threshold (>11), rather than upstream's unconditional adjustment.
  const baseMeld = roundScore(9.57 * Math.log(bounds.meldNaCreatinine) + 3.78 * b + 11.2 * i + 6.43);
  const meldNa = baseMeld > 11
    ? roundScore(baseMeld + 1.32 * sodiumDeficit - 0.033 * baseMeld * sodiumDeficit)
    : baseMeld;
  const c = Math.log(bounds.meld3Creatinine);
  const meld3 = roundScore(
    (values.female ? 1.33 : 0) + 4.56 * b + 0.82 * sodiumDeficit -
    0.24 * sodiumDeficit * b + 9.09 * i + 11.14 * c +
    1.85 * albuminDeficit - 1.83 * albuminDeficit * c + 6,
  );
  return { meldNa, meld3, baseMeld, bounds };
}
