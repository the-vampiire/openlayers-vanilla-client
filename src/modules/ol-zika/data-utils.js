export const getCaseCountFromReports = reports =>
  reports.reduce((cases, report) => cases + report.value, 0);

export const sortFeaturesByCount = (firstFeature, secondFeature) => {
  const { cases, reports } = firstFeature.getProperties();

  const firstCount = reports ? getCaseCountFromReports(reports) : cases;

  const secondCount = reports
    ? getCaseCountFromReports(secondFeature.get("reports"))
    : secondFeature.get("cases");

  // descending order
  return firstCount === secondCount ? 0 : firstCount > secondCount ? -1 : 1;
};
