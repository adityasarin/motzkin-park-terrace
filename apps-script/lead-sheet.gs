/**
 * Motzkin Park Terrace: lead webhook for Google Sheets.
 *
 * Setup
 * 1. Create a Google Sheet with a tab named "Leads".
 * 2. Extensions → Apps Script, paste this file, and save.
 * 3. Project Settings → Script properties: add
 *      SECRET        a long random string (also set as SHEET_WEBHOOK_SECRET in the site's env)
 *      ALERT_EMAILS  comma-separated sales inboxes
 *      CALLMEBOT_PHONE / CALLMEBOT_KEY   optional, for a WhatsApp ping via CallMeBot
 * 4. Deploy → New deployment → Web app: Execute as "Me", Who has access "Anyone".
 *    Copy the /exec URL into SHEET_WEBHOOK_URL.
 * 5. Run `setup` once from the editor to write the header row and the status validation.
 *
 * The same URL can receive Google Ads lead-form webhooks (set "google_key" in Ads to SECRET).
 */

const COLUMNS = [
  "timestamp", "name", "phone", "email", "config", "intent", "visit_date",
  "source", "medium", "campaign", "gclid", "fbclid", "page", "landing_page",
  "status", "owner", "next_follow_up", "notes", "event_id",
];
const STATUSES = ["New", "Contacted", "Site Visit Booked", "Visited", "Negotiation", "Booked", "Lost"];

function setup() {
  const sh = sheet_();
  sh.getRange(1, 1, 1, COLUMNS.length).setValues([COLUMNS]).setFontWeight("bold");
  sh.setFrozenRows(1);
  const statusCol = COLUMNS.indexOf("status") + 1;
  const rule = SpreadsheetApp.newDataValidation().requireValueInList(STATUSES, true).build();
  sh.getRange(2, statusCol, 5000, 1).setDataValidation(rule);
}

function doPost(e) {
  const props = PropertiesService.getScriptProperties();
  let body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch (err) {
    return json_({ ok: false, error: "bad_json" });
  }

  // Google Ads lead form extension payload
  if (body.google_key !== undefined) {
    if (body.google_key !== props.getProperty("SECRET")) return json_({ ok: false, error: "forbidden" });
    body = fromGoogleAds_(body);
  } else if ((body.secret || "") !== (props.getProperty("SECRET") || "")) {
    return json_({ ok: false, error: "forbidden" });
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const row = COLUMNS.map((c) => (body[c] !== undefined ? String(body[c]) : ""));
    if (!row[0]) row[0] = new Date().toISOString();
    if (!row[COLUMNS.indexOf("status")]) row[COLUMNS.indexOf("status")] = "New";
    sheet_().appendRow(row);
  } finally {
    lock.releaseLock();
  }

  alert_(body, props);
  return json_({ ok: true });
}

function fromGoogleAds_(p) {
  const get = (id) => ((p.user_column_data || []).find((c) => c.column_id === id) || {}).string_value || "";
  return {
    timestamp: new Date().toISOString(),
    name: get("FULL_NAME"),
    phone: get("PHONE_NUMBER"),
    email: get("EMAIL"),
    intent: "google-lead-form",
    source: "google",
    medium: "lead-form",
    campaign: String(p.campaign_id || ""),
    gclid: p.gcl_id || "",
    status: "New",
  };
}

function alert_(b, props) {
  const to = props.getProperty("ALERT_EMAILS");
  const subject = `New lead: ${b.name} (${b.config || "type not chosen"}, ${b.intent})`;
  const text = [
    `Name: ${b.name}`,
    `Phone: ${b.phone}`,
    `Email: ${b.email || "-"}`,
    `Wants: ${b.intent}${b.visit_date ? " on " + b.visit_date : ""}`,
    `Villa: ${b.config || "-"}`,
    `Source: ${b.source || "-"} / ${b.medium || "-"} / ${b.campaign || "-"}`,
    `Page: ${b.page || "-"}`,
    "",
    "Call within 5 minutes. Then update the status in the sheet.",
  ].join("\n");
  if (to) MailApp.sendEmail(to, subject, text);

  const phone = props.getProperty("CALLMEBOT_PHONE");
  const key = props.getProperty("CALLMEBOT_KEY");
  if (phone && key) {
    const msg = encodeURIComponent(`${subject}\n${b.phone}`);
    UrlFetchApp.fetch(`https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${msg}&apikey=${key}`, { muteHttpExceptions: true });
  }
}

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheetByName("Leads") || ss.insertSheet("Leads");
}

function json_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
