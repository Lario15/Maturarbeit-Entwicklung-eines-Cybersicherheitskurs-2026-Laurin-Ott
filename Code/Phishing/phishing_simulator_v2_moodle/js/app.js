// ── State ──────────────────────────────────────────────────────────────────
var S = {
  idx: 0,
  answers: [],
  score: 0,
  phase: 'start',
  hintsShown: 0,
  linkClicked: false,
  spamClicked: false,
  hoverRevealed: false
};

// ── Helpers ────────────────────────────────────────────────────────────────
function $(id){ return document.getElementById(id); }

function showScreen(id){
  ['start-screen','email-screen','results-screen']
    .forEach(function(s){ 
      var el = $(s);
      if(el) el.style.display = s===id?'block':'none'; 
    });
}

function currentEmail(){ return EMAILS[S.idx]; }

// ── Start ──────────────────────────────────────────────────────────────────
function startSim(){
  S = { idx:0, answers:[], score:0, phase:'reading', hintsShown:0, linkClicked:false, spamClicked:false, hoverRevealed:false };
  loadEmail();
  showScreen('email-screen');
  updateProgress();
}

// ── Load email ─────────────────────────────────────────────────────────────
function loadEmail(){
  var e = currentEmail();
  S.phase = 'reading';
  S.linkClicked = false;
  S.spamClicked = false;
  S.hoverRevealed = false;
  S.hintsShown = 0;

  $('email-counter').textContent = (S.idx+1)+' / '+EMAILS.length;
  $('diff-badge').textContent = 'Schwierigkeit: '+e.difficulty;
  
  $('email-subject').textContent = e.subject;
  $('sender-display').textContent = e.senderDisplay;
  $('sender-real').textContent = '<' + e.senderReal + '>';
  $('email-to').textContent = e.to;
  $('email-date').textContent = e.date;
  $('email-body').innerHTML = e.body;
  
  $('feedback-area').style.display = 'none';
  $('btn-next').style.display = 'none';

  wireBodyLinks();
  renderActionBar();
}

// ── Links & Action Bar ─────────────────────────────────────────────────────
function wireBodyLinks(){
  var links = document.querySelectorAll('.email-action-link, a');
  var e = currentEmail();
  links.forEach(function(l){
    // Hoverbares Ziel anzeigen:
    if(e.linkUrl) {
      l.title = "Ziel-URL: " + e.linkUrl;
    } else {
      l.title = "Ziel-URL: " + l.href;
    }
    
    l.addEventListener('click', function(ev){
      ev.preventDefault();
      // Verhindert das Wegklicken während dem Lesen
    });
  });
}

function renderActionBar(){
  var bar = $('action-bar');
  if(S.phase === 'reading'){
    bar.innerHTML = 
      '<button style="background: #10b981; color: white; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer; margin-right: 10px; font-weight: bold;" onclick="judge(\'legit\')">✅ Legitim</button>'+
      '<button style="background: #ef4444; color: white; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer; font-weight: bold;" onclick="askForReason()">🚨 Verdächtig</button>'; 
  } else {
    bar.innerHTML = '';
  }
}

// ── Begründung Logik ───────────────────────────────────────────────────────
function askForReason() {
  if (S.phase !== 'reading') return;
  $('reason-screen').style.display = 'block';
  $('reason-select').value = ""; // Reset
}

function cancelReason() {
  $('reason-screen').style.display = 'none';
}

function submitReason() {
  var reason = $('reason-select').value;
  if (!reason) {
    alert("Bitte wählen Sie einen Grund aus.");
    return;
  }
  $('reason-screen').style.display = 'none';
  judge('phishing', reason);
}

// ── Auswertung ─────────────────────────────────────────────────────────────
function judge(action, reason){
  if(S.phase !== 'reading') return;
  S.phase = 'judged';
  var e = currentEmail();
  var correct = false;
  var pts = 0;
  var feedbackMsg = "";

  if(e.isPhishing){
    if(action === 'phishing'){
      correct = true;
      if (reason && e.correctReason && reason !== e.correctReason) {
        pts = 1; 
        feedbackMsg = "Richtig als Phishing erkannt (1 Punkt), aber die Begründung war nicht ganz zutreffend. Richtig wäre: " + getReasonText(e.correctReason);
      } else {
        pts = 3;
        feedbackMsg = "Korrekt! Volle Punktzahl (3 Punkte). Sie haben die Phishing-Mail richtig erkannt und begründet.";
      }
    } else {
      feedbackMsg = "Falsch! Dies war eine Phishing-Mail. (0 Punkte)";
    }
  } else {
    if(action === 'legit'){
      correct = true;
      pts = 3;
      feedbackMsg = "Korrekt! Dies war eine legitime E-Mail. (3 Punkte)";
    } else {
      feedbackMsg = "Falsch! Diese E-Mail war harmlos. (0 Punkte)";
    }
  }

  S.score += pts;
  S.answers.push({ emailId: e.id, correct: correct, pts: pts, action: action, reason: reason });

  showFeedback(correct, feedbackMsg);
  $('btn-next').style.display = 'block';
  renderActionBar();
}

function getReasonText(code) {
  switch(code) {
    case 'domain': return "Falsche Absender-Domain";
    case 'link': return "Gefälschter Link";
    case 'druck': return "Künstlicher Zeitdruck / Drohung";
    case 'unbekannt': return "Unbekannter Absender fragt nach Daten";
    default: return "Anderer Grund";
  }
}

function showFeedback(correct, msg) {
  var fb = $('feedback-area');
  fb.style.display = 'block';
  fb.style.backgroundColor = correct ? '#dcfce7' : '#fee2e2';
  fb.style.color = correct ? '#166534' : '#991b1b';
  fb.innerHTML = msg;
}

function nextEmail(){
  S.idx++;
  if(S.idx >= EMAILS.length){
    showResults();
  } else {
    loadEmail();
    updateProgress();
  }
}

function updateProgress(){
  var pct = (S.idx / EMAILS.length) * 100;
  $('progress-fill').style.width = pct + '%';
  $('progress-label').textContent = S.idx + ' von ' + EMAILS.length + ' E-Mails beurteilt';
}

// ── Results ────────────────────────────────────────────────────────────────
function showResults(){
  showScreen('results-screen');
  $('progress-fill').style.width = '100%';
  $('progress-label').textContent = EMAILS.length + ' von ' + EMAILS.length + ' E-Mails beurteilt';
  
  $('res-score').textContent = S.score;
  var maxScore = EMAILS.length * 3;
  var pct = Math.round((S.score / maxScore) * 100);
  $('res-pct').textContent = pct + '%';
  
  var correctAns = S.answers.filter(function(a){ return a.correct; }).length;
  $('res-correct').textContent = correctAns;
  $('res-total').textContent = EMAILS.length;

  var rating = '';
  if(pct >= 90)      rating = '🏆 Exzellent – Sie haben ein ausgeprägtes Gespür für Phishing.';
  else if(pct >= 70) rating = '👍 Gut – die meisten Fälle richtig erkannt. Noch etwas Luft nach oben.';
  else if(pct >= 50) rating = '📚 Durchschnitt – einige Fallen haben Sie erwischt. Üben lohnt sich!';
  else               rating = '⚠️ Vorsicht – zu viele Phishing-Mails wurden übersehen. Bitte IT-Schulung absolvieren.';
  $('res-rating').textContent = rating;

  if (typeof SCORM !== 'undefined' && SCORM.finish) {
    SCORM.finish(pct, pct >= 60);
  }
}