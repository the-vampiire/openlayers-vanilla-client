export const getCaseCountFromReports = reports =>
  reports.reduce((cases, report) => cases + report.value, 0);

export const sortFeaturesByCount = (firstFeature, secondFeature) => {
  const { cases, reports } = firstFeature.getProperties();

  let firstCount, secondCount;
  if (reports) {
    firstCount = reports.length;
    secondCount = secondFeature.get("reports").length;
  } else {
    firstCount = cases;
    secondCount = secondFeature.get("cases");
  }

  if (firstCount === secondCount) return 0;

  // descending order
  return firstCount > secondCount ? -1 : 1;
};
