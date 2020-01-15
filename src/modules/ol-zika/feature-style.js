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
const STANDARD_DEVIATION = 1922;

const getFillColorByCaseCount = caseCount => {
  const standardized = (caseCount - AVERAGE_CASES_COUNT) / STANDARD_DEVIATION;

  if (standardized >= 1) return [255, 0, 0, 1]; // full red
  if (standardized >= 0) return [255, 140, 0, 1]; // orange
  if (standardized > -0.13) return [255, 255, 0, 1]; // yellow
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
