var EMAILS = [
  // ── 1. Microsoft MFA (PHISHING) ──────────────────────────
  {
    id: 1,
    isPhishing: true,
    correctReason: "domain", // Begründung: Falsche Domain (micosoft)
    difficulty: "schwer",
    action: "link",
    senderDisplay: "Microsoft Konto-Team",
    senderReal: "account-security@micosoft-account.com", // Gefälschte Domain
    senderLegit: "account-security@microsoft.com",
    to: "l.steiner@edu.stud.zh.ch", // Neue Domain!
    subject: "Sicherheitsbenachrichtigung: Anmeldeversuch von neuem Gerät",
    date: "Fr, 29. Mai 2026  08:47",
    linkLabel: "Aktivität überprüfen",
    linkUrl: "https://login.microsoftonline.security-update.com/login",
    linkIsPhishing: true,
    body: `
      <div style="font-family:'Segoe UI',Arial,sans-serif;font-size:14px;color:#333;">
        <h2>Ungewöhnlicher Anmeldeversuch</h2>
        <p>Wir haben eine ungewöhnliche Anmeldung bei Ihrem Konto l.steiner@edu.stud.zh.ch festgestellt.</p>
        <p>Bitte überprüfen Sie diese Aktivität, um Ihr Konto zu schützen. Wenn Sie dies nicht innerhalb von 24 Stunden tun, wird Ihr Konto vorübergehend gesperrt.</p>
        <div style="margin:20px 0;">
          <a href="#" class="email-action-link" style="background:#0078D4;color:#fff;text-decoration:none;padding:10px 20px;border-radius:4px;">Aktivität überprüfen</a>
        </div>
      </div>`
  },

  // ── 2. IT Support / Speicherplatz (PHISHING) ──────────────────────────
  {
    id: 2,
    isPhishing: true,
    correctReason: "druck", // Begründung: Künstlicher Zeitdruck / Drohung
    difficulty: "mittel",
    action: "link",
    senderDisplay: "IT Helpdesk ZH",
    senderReal: "support-zh@edu-zh-support.net", 
    senderLegit: "support@edu.stud.zh.ch",
    to: "l.steiner@edu.stud.zh.ch",
    subject: "DRINGEND: Ihr Postfach ist fast voll",
    date: "Mo, 1. Juni 2026  14:12",
    linkLabel: "Speicherplatz erweitern",
    linkUrl: "http://edu.stud.zh.ch.quota-upgrade.info",
    linkIsPhishing: true,
    body: `
      <div style="font-family:Arial,sans-serif;font-size:14px;color:#333;">
        <p>Hallo,</p>
        <p>Ihr E-Mail-Postfach (l.steiner@edu.stud.zh.ch) hat sein Limit von 2 GB fast erreicht (99% voll).</p>
        <p style="color:red; font-weight:bold;">Eingehende E-Mails werden ab 15:00 Uhr blockiert, wenn Sie Ihr Limit nicht sofort erhöhen.</p>
        <div style="margin:20px 0;">
          <a href="#" class="email-action-link" style="background:#cc0000;color:#fff;text-decoration:none;padding:10px 20px;">Speicherplatz kostenlos erweitern</a>
        </div>
      </div>`
  },

  // ── 3. Legitime Swisscom Rechnung (LEGITIM) ──────────────────────────
  {
    id: 3,
    isPhishing: false,
    difficulty: "leicht",
    action: "legit-link",
    senderDisplay: "Swisscom",
    senderReal: "rechnung@swisscom.com",
    senderLegit: "rechnung@swisscom.com",
    to: "l.steiner@edu.stud.zh.ch",
    subject: "Ihre Swisscom Rechnung vom Mai 2026",
    date: "Mi, 3. Juni 2026  10:05",
    linkLabel: "Rechnung anzeigen",
    linkUrl: "https://www.swisscom.ch/rechnung",
    linkIsPhishing: false,
    body: `
      <div style="font-family:Arial,sans-serif;font-size:14px;color:#333;">
        <h2>Ihre aktuelle Rechnung ist da</h2>
        <p>Guten Tag</p>
        <p>Ihre Rechnung für den Monat Mai ist online verfügbar. Der Rechnungsbetrag beträgt CHF 59.90.</p>
        <p>Bitte begleichen Sie den Betrag bis zum 15. Juni. Wenn Sie eBill nutzen, müssen Sie nichts weiter unternehmen.</p>
        <div style="margin:20px 0;">
          <a href="#" class="email-action-link" style="background:#0A4FBF;color:#fff;text-decoration:none;padding:10px 20px;border-radius:4px;">Rechnung anzeigen</a>
        </div>
      </div>`
  }
];