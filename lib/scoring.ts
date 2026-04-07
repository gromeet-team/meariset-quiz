export function getSliderScore(value: number): number {
  if (value <= 25) return 4;
  if (value <= 50) return 3;
  if (value <= 75) return 2;
  return 1;
}

export function getButtonMashScore(count: number): number {
  if (count <= 3) return 1;
  if (count <= 7) return 2;
  if (count <= 12) return 3;
  return 4;
}

export function getDragSortScore(exercisePosition: number): number {
  // exercisePosition is 0-indexed position of 운동
  return exercisePosition + 1; // 1st=1점, 2nd=2점, 3rd=3점, 4th=4점
}

export function calculateTotalScore(answers: number[]): number {
  return answers.reduce((sum, score) => sum + score, 0);
}
