import { getCaseCountFromReports } from "./data-utils.js";

const { Style, Stroke, Fill } = ol.style;

/**
 * calculate trimmed average of cases
 * https://www.gab.lc/articles/average_ignoring_extremes_outliers/
 * 
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

const getFillColorByCaseCount = caseCount => {
  const standardized = caseCount / AVERAGE_CASES_COUNT;

  if (standardized >= 1) return [255, 0, 0, 0.8]; // full red
  if (standardized === 0) return [90, 90, 90, 0.3];
  if (standardized >= 0.25) return [255, 140, 0, 0.8]; // orange
  if (standardized >= 0.1) return [255, 255, 0, 0.8]; // yellow
  return [200, 200, 0, 0.2]; // light yellow
};

export const invisibleFeatureStyle = () => {
  const color = [0, 0, 0, 0];

  return new Style({
    fill: new Fill({ color }),
    stroke: new Stroke({ color, width: 2 }),
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
