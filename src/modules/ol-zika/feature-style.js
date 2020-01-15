const { Style, Stroke, Fill } = ol.style;

/**
 * https://www.gab.lc/articles/average_ignoring_extremes_outliers/
 WITH bounds AS (
    SELECT (AVG(cases) - STDDEV_SAMP(cases) * 2) as lower_bound,
           (AVG(cases) + STDDEV_SAMP(cases) * 2) as upper_bound
    FROM locations_with_cases_by_date
  )
  SELECT round(AVG(cases)) as average
  FROM locations_with_cases_by_date
  WHERE cases BETWEEN 
    (SELECT lower_bound FROM bounds) AND
    (SELECT upper_bound FROM bounds)
  ;
 */

const AVERAGE_CASES_COUNT = 256;

const getCaseCountFromReports = reports =>
  reports.reduce((cases, report) => cases + report.value, 0);

const getFillColorByCaseCount = caseCount => {
  const normalized = caseCount / AVERAGE_CASES_COUNT;

  if (normalized >= 1) return [255, 0, 0, 1]; // full red
  if (normalized >= 0.5) return [255, 140, 0, 1]; // orange
  if (normalized > 0) return [255, 255, 0, 1]; // yellow
  return [169, 169, 169, 0.3]; // translucent grey
};

export const invisibleFeatureStyle = () => {
  const color = [0, 0, 0, 0];

  return new Style({
    fill: new Fill({ color }),
    stroke: new Stroke({ color }),
  });
};

/**
 * Builds Feature style from case count
 * - uses feature.properties.cases value
 * - or aggregates across feature.properties.reports
 * @param {ol.Feature} feature
 */
export default function(feature) {
  const { reports, cases } = feature.getProperties();

  const caseCount = reports ? getCaseCountFromReports(reports) : cases;

  const featureStyle = new Style({
    stroke: new Stroke({
      color: [0, 0, 0, 1],
    }),
    fill: new Fill({ color: getFillColorByCaseCount(caseCount) }),
  });

  return [featureStyle];
}
