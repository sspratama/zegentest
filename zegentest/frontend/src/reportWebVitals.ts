import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function reportWebVitals(onPerfEntry?: (entry: any) => void) {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    getCLS(onPerfEntry);
    getFID(onPerfEntry);
    getFCP(onPerfEntry);
    getLCP(onPerfEntry);
    getTTFB(onPerfEntry);
  }
}

export default reportWebVitals;
