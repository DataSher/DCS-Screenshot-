import axios from 'axios';
import { DCSReport } from './claudeService';
import APP_CONFIG from '../config/appConfig';

export async function logToGoogleSheets(report: DCSReport): Promise<void> {
  const url = APP_CONFIG.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!url || url.trim() === '') return;
  const rows = report.parameters.map(p => ({
    timestamp: report.timestamp,
    screen_date: report.screen_date || '',
    station: report.station,
    unit: report.unit,
    screen_type: report.screen_type,
    section: p.section,
    parameter: p.parameter,
    value: p.value,
    unit_of_meas: p.unit,
    alarm: p.alarm || '',
    trip: p.trip || '',
    status: p.status || '',
  }));
  await axios.post(url, { rows }, { headers: { 'Content-Type': 'application/json' }, timeout: 15000 });
}
