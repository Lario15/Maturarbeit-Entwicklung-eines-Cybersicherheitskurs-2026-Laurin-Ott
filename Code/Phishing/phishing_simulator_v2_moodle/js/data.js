// All 8 emails. isPhishing = true means it IS a phishing mail.
// action: "link" = user must click link/button (goes to phishing warning page or legit page)
//         "spam" = user should mark as spam
//         "legit-link" = has a link but mail is legitimate
// senderDisplay = what shows in bold (the display name)
// senderReal = what shows on hover (the actual from address)

var EMAILS = [

  // ── 1. Microsoft MFA (PHISHING – very convincing) ──────────────────────────
  {
    id: 1,
    isPhishing: true,
    difficulty: "schwer",
    action: "link",
    senderDisplay: "Microsoft Konto-Team",
    senderReal: "account-security@micosoft-account.com",
    senderLegit: "account-security@microsoft.com",
    to: "l.steiner@edu.stud.zh.ch",
    subject: "Sicherheitsbenachrichtigung: Anmeldeversuch von neuem Gerät",
    date: "Fr, 29. Mai 2026  08:47",
    linkLabel: "Aktivität überprüfen",
    linkUrl: "https://login.microsoftonline.com",          // shown in status bar (real destination handled by app)
    linkIsPhishing: true,
    threadSnippet: null,
    body: `
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;font-family:'Segoe UI',Arial,sans-serif;font-size:14px;color:#333">
  <tr><td style="padding:24px 0 16px;text-align:center">
    <svg width="108" height="24" viewBox="0 0 108 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="11" height="11" fill="#F25022"/><rect x="13" width="11" height="11" fill="#7FBA00"/><rect y="13" width="11" height="11" fill="#00A4EF"/><rect x="13" y="13" width="11" height="11" fill="#FFB900"/><text x="30" y="18" font-family="Segoe UI,Arial" font-size="20" font-weight="600" fill="#737373">Microsoft</text></svg>
  </td></tr>
  <tr><td style="background:#fff;border:1px solid #e0e0e0;border-radius:4px;padding:32px">
    <p style="font-size:20px;font-weight:600;margin:0 0 20px;color:#1b1b1b">Verdächtige Anmeldeaktivität</p>
    <p>Ihr Microsoft-Konto hat einen Anmeldeversuch von einem unbekannten Gerät erhalten. Aus Sicherheitsgründen haben wir den Zugriff vorübergehend eingeschränkt.</p>
    <table style="width:100%;background:#f5f5f5;border-radius:4px;padding:14px;margin:18px 0;font-size:13px" cellpadding="0" cellspacing="0">
      <tr><td style="color:#737373;padding:3px 0">Datum &amp; Uhrzeit</td><td style="text-align:right;font-weight:600">29.05.2026, 08:31 Uhr</td></tr>
      <tr><td style="color:#737373;padding:3px 0">Standort</td><td style="text-align:right;font-weight:600">Bukarest, Rumänien</td></tr>
      <tr><td style="color:#737373;padding:3px 0">Gerät</td><td style="text-align:right;font-weight:600">Windows 11 / Chrome</td></tr>
      <tr><td style="color:#737373;padding:3px 0">IP-Adresse</td><td style="text-align:right;font-weight:600">185.220.101.47</td></tr>
    </table>
    <p>Falls Sie dies nicht waren, empfehlen wir Ihnen, Ihre Kontosicherheit sofort zu überprüfen und Ihr Passwort zu ändern.</p>
    <div style="text-align:center;margin:24px 0">
      <a href="#PHISHING_LINK" class="email-action-link" style="display:inline-block;background:#0078d4;color:#fff;text-decoration:none;padding:12px 32px;border-radius:2px;font-weight:600;font-size:15px">Aktivität überprüfen</a>
    </div>
    <p style="font-size:12px;color:#737373">Falls Sie selbst angemeldet haben, können Sie diese Nachricht ignorieren. Der unbekannte Zugriff wird nach 48 Stunden automatisch gesperrt.</p>
  </td></tr>
  <tr><td style="padding:16px 0;text-align:center;font-size:11px;color:#a0a0a0">
    Microsoft Corporation · One Microsoft Way · Redmond, WA 98052<br>
    <a href="#" onclick="return false" style="color:#a0a0a0">Datenschutz</a> · <a href="#" onclick="return false" style="color:#a0a0a0">Abmelden</a>
  </td></tr>
</table>`,
    clues: [
      "Die Absender-Domain lautet <strong>micosoft-account.com</strong> – ein «i» fehlt im Wort «microsoft». Echte Microsoft-Mails kommen ausschliesslich von <em>@microsoft.com</em> oder <em>@accountprotection.microsoft.com</em>.",
      "Der Link führt nicht zu <em>login.microsoftonline.com</em>, obwohl er so beschriftet ist – die echte Ziel-URL weicht ab.",
      "Die Standortangabe «Bukarest» erzeugt gezielt Angst – diese Taktik soll zu voreiligem Klicken verleiten.",
      "Microsoft verschickt echte Sicherheits-Alerts nur an die registrierte Adresse und nennt dort niemals eine fremde IP mit Countdown."
    ],
    explanation: "CEO-Niveau Phishing: Das Microsoft-Branding ist pixel-genau kopiert. Einziger Hinweis ist die Absender-Domain <strong>micosoft-account.com</strong> (fehlendes «r»). Solche Mails sollten als Spam markiert und dem IT-Helpdesk gemeldet werden."
  },

  // ── 2. PostFinance Login (PHISHING) ───────────────────────────────────────
  {
    id: 2,
    isPhishing: true,
    difficulty: "schwer",
    action: "spam",
    senderDisplay: "PostFinance E-Banking",
    senderReal: "ebanking@postfinance-ch.net",
    senderLegit: "ebanking@postfinance.ch",
    to: "l.steiner@edu.stud.zh.ch",
    subject: "Ihre TAN-Liste läuft ab – jetzt erneuern",
    date: "Do, 28. Mai 2026  11:03",
    linkLabel: null,
    linkUrl: null,
    linkIsPhishing: false,
    threadSnippet: null,
    body: `
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;font-family:Arial,sans-serif;font-size:14px;color:#333">
  <tr><td style="background:#FFCC00;padding:16px 24px">
    <span style="font-size:20px;font-weight:800;color:#000;letter-spacing:-0.5px">Post<span style="color:#CC0000">Finance</span></span>
  </td></tr>
  <tr><td style="background:#fff;padding:28px 24px;border:1px solid #ddd;border-top:none">
    <p style="font-size:17px;font-weight:700;margin:0 0 14px">Ihre photoTAN-Karte läuft in 3 Tagen ab</p>
    <p>Guten Tag</p>
    <p>Ihre aktuelle photoTAN-Karte (Endnummer <strong>···· 8821</strong>) verliert am <strong>31.05.2026</strong> ihre Gültigkeit. Um Unterbrüche im E-Banking zu vermeiden, erneuern Sie Ihre TAN-Karte bitte noch heute.</p>
    <p>So gehen Sie vor:</p>
    <ol style="padding-left:18px;line-height:1.9">
      <li>Loggen Sie sich in Ihr E-Banking ein</li>
      <li>Navigieren Sie zu <strong>Einstellungen → Sicherheit → TAN-Karte erneuern</strong></li>
      <li>Folgen Sie den Anweisungen auf dem Bildschirm</li>
    </ol>
    <p>Die neue Karte ist sofort aktiv. Bei Fragen erreichen Sie uns unter <strong>0800 888 710</strong> (kostenlos, Mo–Fr 7–20 Uhr).</p>
    <p style="margin-top:20px">Freundliche Grüsse<br><strong>PostFinance AG</strong><br>E-Banking Kundendienst</p>
  </td></tr>
  <tr><td style="padding:12px 0;text-align:center;font-size:11px;color:#aaa">
    PostFinance AG · Mingerstrasse 20 · 3030 Bern · <a href="#" onclick="return false" style="color:#aaa">Datenschutz</a>
  </td></tr>
</table>`,
    clues: [
      "Die Absender-Domain lautet <strong>postfinance-ch.net</strong> – echte PostFinance-Mails kommen ausschliesslich von <em>@postfinance.ch</em>. Die Endung <em>.net</em> statt <em>.ch</em> ist ein sicheres Zeichen.",
      "PostFinance kommuniziert TAN-Abläufe ausschliesslich per Brief oder direkt im E-Banking – niemals per E-Mail.",
      "Die Kartennummer «···· 8821» ist erfunden – eine seriöse Bank würde niemals eine Kartennummer erwähnen, die Sie selbst nicht verifizieren können.",
      "Kein Link in der Mail – die Angreifer wollen, dass Sie sich «normal» einloggen und dann auf einer gefälschten Folgeseite landen."
    ],
    explanation: "Subtile Phishing-Mail ohne auffälligen Link: Die Angreifer setzen darauf, dass Sie sich «normal» ins E-Banking einloggen – über einen Lesezeichen-Link, der dann zu einer geklonten Login-Seite führt. Einziger Hinweis: <strong>postfinance-ch.net</strong> statt <em>postfinance.ch</em>."
  },

  // ── 3. HR-Lohnabrechnung (LEGITIM) ────────────────────────────────────────
  {
    id: 3,
    isPhishing: false,
    difficulty: "schwer",
    action: "legit-link",
    senderDisplay: "HR Kantonsschule Im Lee",
    senderReal: "hr@edu.stud.zh.ch",
    senderLegit: "hr@edu.stud.zh.ch",
    to: "l.steiner@edu.stud.zh.ch",
    subject: "Ihre Lohnabrechnung Mai 2026 – jetzt im Mitarbeiterportal",
    date: "Fr, 29. Mai 2026  07:15",
    linkLabel: "Mitarbeiterportal öffnen",
    linkUrl: "https://portal.kantonsschule-imlee.ch",
    linkIsPhishing: false,
    threadSnippet: null,
    body: `
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;font-family:Arial,sans-serif;font-size:14px;color:#333">
  <tr><td style="background:#003399;padding:14px 22px;color:#fff">
    <strong style="font-size:16px">Kantonsschule Im Lee</strong>
    <span style="font-size:12px;opacity:0.75;margin-left:12px">Personalwesen</span>
  </td></tr>
  <tr><td style="background:#fff;padding:26px 22px;border:1px solid #e0e0e0;border-top:none">
    <p>Guten Morgen Frau Steiner</p>
    <p>Ihre Lohnabrechnung für den Monat <strong>Mai 2026</strong> steht im Mitarbeiterportal zur Verfügung. Sie können sich mit Ihren gewohnten Schul-Login-Daten anmelden.</p>
    <div style="text-align:center;margin:22px 0">
      <a href="#LEGIT_LINK" class="email-action-link" style="display:inline-block;background:#003399;color:#fff;text-decoration:none;padding:11px 28px;border-radius:3px;font-weight:600">Mitarbeiterportal öffnen</a>
    </div>
    <p style="font-size:12px;color:#888">Direktlink: <span style="color:#003399">https://portal.edu.stud.zh.ch</span></p>
    <p>Bei technischen Problemen wenden Sie sich an <a href="mailto:it-support@edu.stud.zh.ch" style="color:#003399">it-support@edu.stud.zh.ch</a> oder Tel. 052 235 12 00.</p>
    <p style="margin-top:18px">Mit freundlichen Grüssen<br><strong>Sandra Meier</strong><br>Personalverwaltung</p>
  </td></tr>
  <tr><td style="padding:10px 0;text-align:center;font-size:11px;color:#aaa">Kantonsschule Im Lee · Kantonsschulstrasse 18 · 8400 Winterthur</td></tr>
</table>`,
    clues: [
      "Die Absender-Domain <strong>@edu.stud.zh.ch</strong> stimmt genau mit der eigenen Schul-Domain überein.",
      "Der Link führt direkt auf <em>portal.edu.stud.zh.ch</em> – die eigene Schul-Subdomain, die explizit auch als Textlink angegeben wird.",
      "Kein Zeitdruck, keine Drohung, keine Aufforderung zur Dateneingabe in der Mail selbst.",
      "Der Inhalt ist konkret und erwartet (Lohnabrechnung kommt monatlich). Die Absenderin ist namentlich bekannt."
    ],
    explanation: "Legitime interne Schulmail: Eigene Domain, bekannte Absenderin, kein Zeitdruck, Link auf eigene Subdomain mit explizit sichtbarer URL. Diese Mail darf bedenkenlos geöffnet werden."
  },

  // ── 4. DHL Paket (PHISHING) ───────────────────────────────────────────────
  {
    id: 4,
    isPhishing: true,
    difficulty: "mittel",
    action: "link",
    senderDisplay: "DHL Paketservice Schweiz",
    senderReal: "noreply@dhl-delivery-ch.com",
    senderLegit: "noreply@dhl.com",
    to: "l.steiner@edu.stud.zh.ch",
    subject: "Ihr Paket konnte nicht zugestellt werden – Aktion erforderlich",
    date: "Mi, 27. Mai 2026  14:22",
    linkLabel: "Neue Lieferzeit wählen",
    linkUrl: "https://www.dhl.com/ch-de/home.html",
    linkIsPhishing: true,
    threadSnippet: null,
    body: `
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;font-family:Arial,sans-serif;font-size:14px;color:#333">
  <tr><td style="background:#FFCC00;padding:16px 22px">
    <span style="font-size:22px;font-weight:900;color:#D40511;letter-spacing:-1px">DHL</span>
    <span style="font-size:13px;color:#333;margin-left:10px">Express | Paket | Fracht</span>
  </td></tr>
  <tr><td style="background:#fff;padding:26px 22px;border:1px solid #e5e5e5;border-top:none">
    <p style="font-size:16px;font-weight:700;color:#D40511;margin:0 0 14px">Zustellversuch fehlgeschlagen</p>
    <p>Sehr geehrte Frau Steiner</p>
    <p>Wir haben heute versucht, ein Paket an Ihre Adresse zuzustellen. Da niemand anwesend war, konnte die Lieferung nicht abgeschlossen werden.</p>
    <table style="width:100%;background:#fff8f8;border:1px solid #f5c6c6;border-radius:3px;padding:12px;margin:16px 0;font-size:13px" cellpadding="0" cellspacing="0">
      <tr><td style="color:#888;padding:2px 0">Sendungsnummer</td><td style="text-align:right;font-weight:700">1Z999AA1012345678</td></tr>
      <tr><td style="color:#888;padding:2px 0">Gewicht</td><td style="text-align:right;font-weight:700">1.4 kg</td></tr>
      <tr><td style="color:#888;padding:2px 0">Paketnachnahme</td><td style="text-align:right;font-weight:700;color:#D40511">CHF 2.50 offen</td></tr>
    </table>
    <p>Bitte wählen Sie innerhalb von <strong>48 Stunden</strong> einen neuen Lieferzeitpunkt, andernfalls wird das Paket an den Absender zurückgeschickt.</p>
    <div style="text-align:center;margin:22px 0">
      <a href="#PHISHING_LINK" class="email-action-link" style="display:inline-block;background:#D40511;color:#fff;text-decoration:none;padding:12px 30px;border-radius:2px;font-weight:700;font-size:15px">Neue Lieferzeit wählen</a>
    </div>
    <p style="font-size:12px;color:#aaa">DHL Paket GmbH · Sträßchensweg 10 · 53113 Bonn</p>
  </td></tr>
</table>`,
    clues: [
      "Die Absender-Domain lautet <strong>dhl-delivery-ch.com</strong> – DHL versendet ausschliesslich von <em>@dhl.com</em> oder <em>@dhl.de</em>, nie von einer Domain mit «-delivery» im Namen.",
      "«Paketnachnahme CHF 2.50 offen» – kleine Beträge sollen dazu verleiten, schnell zu klicken ohne nachzudenken. Beim Link werden dann Kreditkartendaten verlangt.",
      "«48 Stunden» Frist – künstlicher Zeitdruck ist ein klassisches Phishing-Signal.",
      "DHL verwendet in der Schweiz keine .com-Domain für offizielle Kundenkommunikation, sondern dhl.com/ch oder dhl.de."
    ],
    explanation: "DHL-Phishing ist eine der häufigsten Angriffsarten. Die Mail ist visuell überzeugend, aber die Domain <strong>dhl-delivery-ch.com</strong> verrät den Betrug. Der Button führt auf eine Seite, die Kreditkartendaten abfragt."
  },

  // ── 5. IT-Support Passwort (LEGITIM) ──────────────────────────────────────
  {
    id: 5,
    isPhishing: false,
    difficulty: "schwer",
    action: "legit-link",
    senderDisplay: "IT-Support KS Im Lee",
    senderReal: "it-support@edu.stud.zh.ch",
    senderLegit: "it-support@edu.stud.zh.ch",
    to: "l.steiner@edu.stud.zh.ch",
    subject: "Pflichtaktion: Passwort-Reset bis 30.05.2026",
    date: "Mo, 26. Mai 2026  09:00",
    linkLabel: "Passwort jetzt ändern",
    linkUrl: "https://accounts.edu.stud.zh.ch/password-reset",
    linkIsPhishing: false,
    threadSnippet: "Aufgrund der kantonalen IT-Sicherheitsrichtlinie (Zyklus 90 Tage) wird ein Reset benötigt.",
    body: `
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;font-family:Arial,sans-serif;font-size:14px;color:#333">
  <tr><td style="background:#003399;padding:14px 22px;color:#fff">
    <strong>Kantonsschule Im Lee</strong>
    <span style="font-size:12px;opacity:0.75;margin-left:10px">IT-Support</span>
  </td></tr>
  <tr><td style="background:#fff8e1;padding:12px 22px;border-left:4px solid #FFC107;font-size:13px">
    <strong>⚠ Pflichtaktion erforderlich</strong> – Ihr Schulpasswort muss bis 30.05.2026 geändert werden.
  </td></tr>
  <tr><td style="background:#fff;padding:24px 22px;border:1px solid #e0e0e0;border-top:none">
    <p>Guten Morgen Frau Steiner</p>
    <p>Gemäss der kantonalen IT-Sicherheitsrichtlinie (Passwort-Rotationszyklus 90 Tage) läuft Ihr aktuelles Schulpasswort am <strong>30.05.2026</strong> ab.</p>
    <p>Bitte ändern Sie Ihr Passwort über das untenstehende Link. Sie werden auf das bekannte Self-Service-Portal weitergeleitet, das Sie bereits für frühere Resets genutzt haben.</p>
    <div style="text-align:center;margin:22px 0">
      <a href="#LEGIT_LINK" class="email-action-link" style="display:inline-block;background:#003399;color:#fff;text-decoration:none;padding:11px 26px;border-radius:3px;font-weight:600">Passwort jetzt ändern</a>
    </div>
    <p style="font-size:12px;color:#888">URL: <span style="color:#003399">https://accounts.kantonsschule-imlee.ch/password-reset</span></p>
    <p style="font-size:13px;color:#555">Falls Sie Probleme haben, wenden Sie sich an den IT-Support: <strong>052 235 12 00</strong> oder kommen Sie direkt ins IT-Büro (Raum E04).</p>
    <p style="margin-top:18px">Mit freundlichen Grüssen<br><strong>IT-Support Team</strong><br>Kantonsschule Im Lee</p>
  </td></tr>
</table>`,
    clues: [
      "Absender-Domain <strong>@edu.stud.zh.ch</strong> ist die eigene Schul-Domain – intern und konsistent.",
      "Der Link zeigt explizit die vollständige URL <em>accounts.edu.stud.zh.ch</em> als Klartext – seriöse IT-Abteilungen tun das bewusst, damit man die Domain prüfen kann.",
      "Telefonnummer und Raumnummer (E04) sind konkret und verifizierbar – keine Phantomdaten.",
      "Kein Dateneingabe-Formular in der Mail selbst – Passwort wird nur auf dem Portal geändert."
    ],
    explanation: "Legitime IT-Mail mit Passwort-Reset-Aufforderung. Solche Mails wirken verdächtig, sind aber echt: eigene Domain, explizite URL, Telefonnummer und Raum zur Verifikation. Im Zweifel: beim IT-Support anrufen, bevor man klickt."
  },

  // ── 6. CEO-Fraud Überweisung (PHISHING) ───────────────────────────────────
  {
    id: 6,
    isPhishing: true,
    difficulty: "schwer",
    action: "spam",
    senderDisplay: "Dr. Peter Schlatter (Rektor)",
    senderReal: "p.schlatter@edu.stud.zh.ch",
    senderLegit: "p.schlatter@edu.stud.zh.ch",
    to: "l.steiner@edu.stud.zh.ch",
    subject: "Vertraulich – dringende Zahlung heute",
    date: "Fr, 29. Mai 2026  16:54",
    linkLabel: null,
    linkUrl: null,
    linkIsPhishing: false,
    threadSnippet: null,
    body: `
<div style="font-family:Arial,sans-serif;font-size:14px;color:#1a1a1a;max-width:520px;margin:0 auto">
  <p>Guten Tag Frau Steiner</p>
  <p>Ich bin derzeit in einem Gespräch mit unserem Schulträger und kann kurz nicht erreichbar sein. Ich benötige Ihre sofortige Hilfe bei einer vertraulichen, zeitkritischen Zahlung.</p>
  <p>Wir haben heute noch einen Vertrag mit einem externen Referenten abgeschlossen. Die Honorarzahlung muss heute bis 17:30 Uhr eingegangen sein, damit der Auftrag gültig ist.</p>
  <table style="background:#f9f9f9;border:1px solid #ddd;border-radius:4px;padding:14px;width:100%;font-size:13px;margin:16px 0" cellpadding="4" cellspacing="0">
    <tr><td><strong>Betrag:</strong></td><td>CHF 3'200.–</td></tr>
    <tr><td><strong>Empfänger:</strong></td><td>Bildung &amp; Kultur Consulting GmbH</td></tr>
    <tr><td><strong>IBAN:</strong></td><td>CH93 0076 2011 6238 5295 7</td></tr>
    <tr><td><strong>Verwendungszweck:</strong></td><td>Referentenhonorar Mai 2026</td></tr>
  </table>
  <p>Bitte veranlassen Sie die Überweisung umgehend und bestätigen Sie mir kurz per Mail. Besprechen Sie dies bitte noch nicht mit Kollegen, da der Vertrag erst nach Zahlungseingang offiziell kommuniziert wird.</p>
  <p>Besten Dank &amp; beste Grüsse<br><strong>Dr. Peter Schlatter</strong><br>Rektor, Kantonsschule Im Lee</p>
  <p style="font-size:11px;color:#aaa;margin-top:20px">Kantonsschule Im Lee · Kantonsschulstrasse 18 · 8400 Winterthur · 052 235 12 00</p>
</div>`,
    clues: [
      "Die Domain lautet <strong>edu.stud.zh.ch</strong> statt <em>.net</em> – minimaler Unterschied, maximale Wirkung. Der Angreifer hat eine fast identische Domain registriert.",
      "«Besprechen Sie dies bitte noch nicht mit Kollegen» – Isolierungstaktik. Phishing-Angriffe leben davon, dass das Opfer keine zweite Meinung einholt.",
      "«Heute bis 17:30 Uhr» – extremer Zeitdruck bei gleichzeitiger Unerreichbarkeit des Absenders ist das klassische CEO-Fraud-Muster.",
      "Überweisungsaufträge müssen immer telefonisch beim vermeintlichen Auftraggeber verifiziert werden – niemals nur auf Basis einer E-Mail."
    ],
    explanation: "CEO-Fraud / BEC (Business Email Compromise): Der Angreifer hat eine Domain mit <strong>.net</strong> statt <strong>.ch</strong> registriert und gibt sich als Schulleiter aus. Zeitdruck + Geheimhaltung + ungewöhnliche Zahlung = drei Warnsignale gleichzeitig. Immer telefonisch verifizieren."
  },

  // ── 7. Adobe Sign (PHISHING – sehr schwer) ────────────────────────────────
  {
    id: 7,
    isPhishing: true,
    difficulty: "schwer",
    action: "link",
    senderDisplay: "Adobe Sign",
    senderReal: "echosign@adobesign-notifications.com",
    senderLegit: "echosign@adobesign.com",
    to: "l.steiner@edu.stud.zh.ch",
    subject: "Dokument zur Unterzeichnung: Arbeitsvertrag_Nachtrag_2026.pdf",
    date: "Do, 28. Mai 2026  13:37",
    linkLabel: "Dokument überprüfen und unterzeichnen",
    linkUrl: "https://acrobat.adobe.com/id/urn:aaid:sc:EU",
    linkIsPhishing: true,
    threadSnippet: null,
    body: `
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;font-family:'Adobe Clean',Arial,sans-serif;font-size:14px;color:#2c2c2c">
  <tr><td style="background:#fff;padding:20px 24px;border-bottom:2px solid #FA0F00">
    <svg xmlns="http://www.w3.org/2000/svg" width="90" height="28" viewBox="0 0 90 28"><rect width="28" height="28" rx="4" fill="#FA0F00"/><text x="7" y="20" font-family="Arial" font-size="16" font-weight="900" fill="#fff">Ai</text><text x="34" y="20" font-family="Arial" font-size="16" font-weight="700" fill="#2c2c2c">Adobe</text></svg>
  </td></tr>
  <tr><td style="padding:28px 24px;background:#fff;border:1px solid #e8e8e8;border-top:none">
    <p style="font-size:18px;font-weight:700;margin:0 0 6px">Dokument zur Unterzeichnung</p>
    <p style="color:#747474;font-size:13px;margin:0 0 20px">gesendet von <strong>Sandra Meier</strong> &lt;s.meier@edu.stud.zh.ch&gt;</p>
    <table style="background:#f4f4f4;border-radius:4px;padding:14px 16px;width:100%;font-size:13px;margin-bottom:20px" cellpadding="3" cellspacing="0">
      <tr><td style="color:#747474">Dokument</td><td><strong>Arbeitsvertrag_Nachtrag_2026.pdf</strong></td></tr>
      <tr><td style="color:#747474">Ablaufdatum</td><td><strong style="color:#c00">30.05.2026, 23:59 Uhr</strong></td></tr>
      <tr><td style="color:#747474">Gesendet von</td><td>Sandra Meier (Personalverwaltung)</td></tr>
    </table>
    <p>Bitte überprüfen Sie das Dokument und unterzeichnen Sie es bis zum Ablaufdatum.</p>
    <div style="text-align:center;margin:24px 0">
      <a href="#PHISHING_LINK" class="email-action-link" style="display:inline-block;background:#FA0F00;color:#fff;text-decoration:none;padding:13px 32px;border-radius:3px;font-weight:700;font-size:15px">Dokument überprüfen und unterzeichnen</a>
    </div>
    <p style="font-size:12px;color:#aaa;text-align:center">Adobe Acrobat Sign · adobe.com/sign</p>
  </td></tr>
  <tr><td style="padding:12px 0;text-align:center;font-size:11px;color:#c0c0c0">
    Adobe Inc. · 345 Park Avenue · San Jose, CA 95110-2704<br>
    <a href="#" onclick="return false" style="color:#c0c0c0">Datenschutz</a> · <a href="#" onclick="return false" style="color:#c0c0c0">Abmelden</a>
  </td></tr>
</table>`,
    clues: [
      "Die Absender-Domain lautet <strong>adobesign-notifications.com</strong> – echte Adobe Sign Benachrichtigungen kommen von <em>@adobesign.com</em> oder <em>@echosign.com</em>.",
      "«Sandra Meier» als angebliche Absenderin klingt plausibel (aus Mail 3 bekannt), aber die eigentliche Domain des Umschlags verrät den Betrug.",
      "Das Ablaufdatum «30.05.2026» liegt in zwei Tagen – minimaler Zeitdruck, gerade genug, um nicht zu zögern.",
      "Adobe Sign Links zeigen immer auf <em>adobesign.com</em> oder <em>eu1.documents.adobe.com</em> – niemals auf eine Domain mit «-notifications» im Namen."
    ],
    explanation: "Hochentwickeltes Spear-Phishing: Die Mail nutzt den bekannten Namen «Sandra Meier» aus einer früheren Mail und das Adobe-Branding perfekt. Einziger Hinweis: die Domain <strong>adobesign-notifications.com</strong>. Beim Klick wird nach Microsoft-Login-Daten gefragt."
  },

  // ── 8. Swisscom Rechnung (LEGITIM) ────────────────────────────────────────
  {
    id: 8,
    isPhishing: false,
    difficulty: "mittel",
    action: "legit-link",
    senderDisplay: "Swisscom Rechnung",
    senderReal: "rechnung@swisscom.com",
    senderLegit: "rechnung@swisscom.com",
    to: "l.steiner@edu.stud.zh.ch",
    subject: "Ihre Swisscom Rechnung Mai 2026 – CHF 89.90",
    date: "Di, 27. Mai 2026  06:00",
    linkLabel: "Rechnung anzeigen",
    linkUrl: "https://www.swisscom.ch/de/privatkunden/mein-konto.html",
    linkIsPhishing: false,
    threadSnippet: null,
    body: `
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;font-family:TheSans,Arial,sans-serif;font-size:14px;color:#1a1a1a">
  <tr><td style="background:#0A4FBF;padding:16px 22px">
    <span style="color:#fff;font-size:20px;font-weight:800;letter-spacing:-0.5px">swisscom</span>
  </td></tr>
  <tr><td style="background:#fff;padding:26px 22px;border:1px solid #e5e5e5;border-top:none">
    <p style="font-size:16px;font-weight:700;margin:0 0 16px">Ihre Rechnung für Mai 2026 ist verfügbar</p>
    <p>Guten Tag</p>
    <p>Ihre Swisscom Rechnung für den Abrechnungszeitraum <strong>01.–31. Mai 2026</strong> steht in Ihrem Kundenkonto bereit.</p>
    <table style="width:100%;background:#f0f5ff;border-radius:4px;padding:14px;margin:16px 0;font-size:13px" cellpadding="4" cellspacing="0">
      <tr><td style="color:#555">Rechnungsbetrag</td><td style="text-align:right;font-size:18px;font-weight:800;color:#0A4FBF">CHF 89.90</td></tr>
      <tr><td style="color:#555">Fällig am</td><td style="text-align:right;font-weight:600">15. Juni 2026</td></tr>
      <tr><td style="color:#555">Kundennummer</td><td style="text-align:right">··· ··· 4412</td></tr>
    </table>
    <p>Falls Sie einen Dauerauftrag oder eBanking-Einzug eingerichtet haben, müssen Sie nichts unternehmen.</p>
    <div style="text-align:center;margin:22px 0">
      <a href="#LEGIT_LINK" class="email-action-link" style="display:inline-block;background:#0A4FBF;color:#fff;text-decoration:none;padding:11px 28px;border-radius:20px;font-weight:700">Rechnung anzeigen</a>
    </div>
    <p style="font-size:12px;color:#aaa">swisscom.ch/rechnung · Fragen? 0800 800 800 (kostenlos)</p>
  </td></tr>
  <tr><td style="padding:10px 0;text-align:center;font-size:11px;color:#bbb">Swisscom AG · Alte Tiefenaustrasse 6 · 3048 Worblaufen</td></tr>
</table>`,
    clues: [
      "Die Domain <strong>@swisscom.com</strong> ist die offizielle Swisscom-Domain für Kundenrechnungen – verifizierbar auf der Swisscom-Website.",
      "Die Kundennummer ist teilweise geschwärzt (··· ··· 4412) – legitime Unternehmen zeigen nur die letzten Stellen, nicht die vollständige Nummer.",
      "Kein Zeitdruck: Zahlungsfrist ist der 15. Juni, also in 17 Tagen – ausreichend Zeit für ruhige Überprüfung.",
      "Der Link führt auf <em>swisscom.ch/mein-konto</em> – die Hauptdomain des Anbieters, nicht auf eine obskure Subdomain."
    ],
    explanation: "Legitime Rechnungsmail von Swisscom: eigene offizielle Domain, kein Zeitdruck, geschwärzte Kundennummer (Datenschutz), Link auf die Haupt-Domain. Solche Mails können mit ruhigem Gewissen geöffnet werden."
  }
];
