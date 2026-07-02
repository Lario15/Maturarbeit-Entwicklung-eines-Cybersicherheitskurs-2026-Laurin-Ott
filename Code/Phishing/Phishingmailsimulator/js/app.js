// ── State ──────────────────────────────────────────────────────────────────
var S = {
  idx: 0,
  answers: [],
  score: 0,
  phase: 'start',   // start | reading | judged | results
  hintsShown: 0,
  linkClicked: false,
  spamClicked: false,
  hoverRevealed: false
};

// ── Helpers ────────────────────────────────────────────────────────────────
function $(id){ return document.getElementById(id); }

function showScreen(id){
  ['start-screen','email-screen','phishing-caught-screen','legit-link-screen','results-screen']
    .forEach(function(s){ $(s).style.display = s===id?'block':'none'; });
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
  $('diff-badge').className = 'diff-badge diff-'+e.difficulty;
  $('email-subject-display').textContent = e.subject;
  $('email-date-display').textContent = e.date;
  $('email-to-display').textContent = e.to;
  $('email-body-area').innerHTML = e.body;

  // Sender display with hover tooltip
  var senderCell = $('email-sender-cell');
  senderCell.innerHTML =
    '<span class="sender-name" id="sender-hover-target" title="Hover zum Anzeigen der echten Adresse">'+
      escHtml(e.senderDisplay)+
    '</span>'+
    '<span class="sender-real-badge" id="sender-real-badge" style="display:none">'+
      '<span class="real-addr-label">Echte Adresse:</span> '+
      '<span id="sender-real-text"></span>'+
    '</span>';

  var hoverTarget = $('sender-hover-target');
  hoverTarget.addEventListener('mouseenter', revealSender);
  hoverTarget.addEventListener('focus', revealSender);

  // Wire up links in body
  wireBodyLinks();

  // Thread snippet
  var ts = $('thread-snippet');
  if(e.threadSnippet){
    ts.textContent = e.threadSnippet;
    ts.style.display = 'block';
  } else {
    ts.style.display = 'none';
  }

  // Bottom action bar
  renderActionBar();

  // Feedback & hints
  $('feedback-box').style.display = 'none';
  $('hints-panel').style.display = 'none';
  $('hint-btn').style.display = 'inline-block';
  $('hint-counter-span').textContent = e.clues.length;
  $('hints-list').innerHTML = '';
  $('next-btn').style.display = 'none';
}

function escHtml(s){
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function revealSender(){
  if(S.hoverRevealed) return;
  S.hoverRevealed = true;
  var e = currentEmail();
  var badge = $('sender-real-badge');
  var txt   = $('sender-real-text');
  var realAddr = e.senderReal;
  var legitAddr = e.senderLegit;
  // Highlight differences
  var html = '';
  for(var i=0; i<realAddr.length; i++){
    if(i < legitAddr.length && realAddr[i] !== legitAddr[i]){
      html += '<span class="addr-diff">'+escHtml(realAddr[i])+'</span>';
    } else if(i >= legitAddr.length){
      html += '<span class="addr-diff">'+escHtml(realAddr[i])+'</span>';
    } else {
      html += escHtml(realAddr[i]);
    }
  }
  txt.innerHTML = html;
  badge.style.display = 'inline-flex';

  // pulse effect
  var target = $('sender-hover-target');
  target.classList.add('revealed');
}

function wireBodyLinks(){
  var e = currentEmail();
  var links = $('email-body-area').querySelectorAll('a.email-action-link');
  links.forEach(function(a){
    // NEU: Zeigt die Ziel-URL beim Darüberfahren (Hover) an
    if(e.linkUrl) {
      a.title = "Ziel-URL: " + e.linkUrl;
    }

    a.removeAttribute('href');
    a.style.cursor = 'pointer';
    a.addEventListener('click', function(ev){
      ev.preventDefault();
      handleLinkClick(e);
    });
  });
}

function handleLinkClick(e){
  if(S.phase !== 'reading') return;
  S.linkClicked = true;
  if(e.linkIsPhishing){
    // Show phishing caught screen
    $('phishing-url-shown').textContent = e.linkUrl;
    $('phishing-caught-back').onclick = function(){
      showScreen('email-screen');
      // Award hint-reveal for having clicked
      if(!e.isPhishing) return; // shouldn't happen
      revealOneClue();
    };
    showScreen('phishing-caught-screen');
  } else {
    // Legit link
    $('legit-link-url').textContent = e.linkUrl;
    $('legit-link-back').onclick = function(){ showScreen('email-screen'); };
    showScreen('legit-link-screen');
  }
}

// ── Action bar ─────────────────────────────────────────────────────────────
function renderActionBar(){
  var bar = document.getElementById('action-bar');
  if(S.phase === 'reading'){
    // Aktionstasten anzeigen. Korrekter Funktionsaufruf: submitAnswer()
    bar.innerHTML = 
      '<button class="btn btn-legit" onclick="submitAnswer(\'legit\'); renderActionBar();">✅ Legitim (Keine Gefahr)</button>'+
      '<button class="btn btn-phish" onclick="askForReason()">🚨 Verdächtig / Phishing</button>'; 
  } else {
    // Leiste leer lassen, da submitAnswer() den originalen "Nächste Mail"-Button einblendet
    bar.innerHTML = ''; 
  }
}

// ── Answer submission ──────────────────────────────────────────────────────
function submitAnswer(choice){
  if(S.phase !== 'reading') return;
  S.phase = 'judged';

  var e = currentEmail();
  var markedAsPhishing = (choice === 'spam');
  var correct = (markedAsPhishing === e.isPhishing);

  // Scoring: 3pts no hints, 2pts 1 hint, 1pt 2+ hints, 0 wrong
  var pts = 0;
  if(correct){
    if(S.hintsShown === 0)       pts = 3;
    else if(S.hintsShown === 1)  pts = 2;
    else                          pts = 1;
  }
  S.score += pts;
  S.answers.push({ emailId:e.id, correct:correct, isPhishing:e.isPhishing, choice:choice, hints:S.hintsShown, pts:pts });

  // Disable action bar
  var btns = $('action-bar').querySelectorAll('button');
  btns.forEach(function(b){ b.disabled = true; });

  // Show full clues
  showAllClues();

  // Feedback
  showFeedback(correct, e, choice);

  $('next-btn').style.display = 'inline-block';
  $('next-btn').textContent = (S.idx+1 < EMAILS.length) ? 'Nächste Mail →' : 'Auswertung →';
  $('hint-btn').style.display = 'none';
}

function showFeedback(correct, e, choice){
  var box = $('feedback-box');
  box.style.display = 'block';
  box.className = 'feedback-box ' + (correct ? 'fb-correct' : 'fb-wrong');

  var icon = correct ? '✅' : '❌';
  var verdict = '';
  if(correct && e.isPhishing)   verdict = 'Richtig – das war eine Phishing-Mail!';
  if(correct && !e.isPhishing)  verdict = 'Richtig – das war eine legitime Mail!';
  if(!correct && e.isPhishing)  verdict = 'Leider falsch – das war eine Phishing-Mail!';
  if(!correct && !e.isPhishing) verdict = 'Leider falsch – das war eine legitime Mail!';

  box.innerHTML =
    '<p class="fb-title">'+icon+' '+verdict+'</p>'+
    '<p class="fb-expl">'+e.explanation+'</p>';
}

// ── Hints ──────────────────────────────────────────────────────────────────
function toggleHints(){
  var panel = $('hints-panel');
  var e = currentEmail();
  if(panel.style.display === 'none'){
    panel.style.display = 'block';
    revealOneClue();
  } else {
    panel.style.display = 'none';
  }
}

function revealOneClue(){
  var e = currentEmail();
  var list = $('hints-list');
  var shown = list.children.length;
  if(shown >= e.clues.length) return;
  S.hintsShown++;
  $('hint-counter-span').textContent = Math.max(0, e.clues.length - S.hintsShown);

  var li = document.createElement('li');
  li.className = 'hint-item anim-in';
  li.innerHTML = '<span class="hint-num">'+(shown+1)+'</span><span>'+e.clues[shown]+'</span>';
  list.appendChild(li);
  $('hints-panel').style.display = 'block';

  var moreBtn = $('more-hint-btn');
  if(S.hintsShown >= e.clues.length){
    if(moreBtn) moreBtn.style.display = 'none';
    $('hint-btn').textContent = '💡 Alle Hinweise aufgedeckt';
    $('hint-btn').disabled = true;
  }
}

function showAllClues(){
  var e = currentEmail();
  var list = $('hints-list');
  list.innerHTML = '';
  e.clues.forEach(function(c, i){
    var li = document.createElement('li');
    li.className = 'hint-item';
    li.innerHTML = '<span class="hint-num">'+(i+1)+'</span><span>'+c+'</span>';
    list.appendChild(li);
  });
  $('hints-panel').style.display = 'block';
  $('hint-btn').style.display = 'none';
}

// ── Navigation ─────────────────────────────────────────────────────────────
function nextEmail(){
  S.idx++;
  if(S.idx >= EMAILS.length){ showResults(); }
  else { loadEmail(); updateProgress(); }
}

function updateProgress(){
  var pct = (S.idx / EMAILS.length) * 100;
  $('progress-fill').style.width = pct+'%';
  $('progress-label').textContent = S.idx+' von '+EMAILS.length+' E-Mails beurteilt';
}

// ── Results ────────────────────────────────────────────────────────────────
function showResults(){
  showScreen('results-screen');
  updateProgress();

  var maxPts = EMAILS.length * 3;
  var pct = Math.round((S.score / maxPts) * 100);
  var correct = S.answers.filter(function(a){ return a.correct; }).length;

  $('res-score').textContent = S.score;
  $('res-max').textContent = maxPts;
  $('res-pct').textContent = pct+'%';
  $('res-correct').textContent = correct;
  $('res-total').textContent = EMAILS.length;

  var rating = '';
  if(pct >= 90)      rating = '🏆 Exzellent – Sie haben ein ausgeprägtes Gespür für Phishing.';
  else if(pct >= 70) rating = '👍 Gut – die meisten Fälle richtig erkannt. Noch etwas Luft nach oben.';
  else if(pct >= 50) rating = '📚 Durchschnitt – einige Fallen haben Sie erwischt. Üben lohnt sich!';
  else               rating = '⚠️ Vorsicht – zu viele Phishing-Mails wurden übersehen. Bitte IT-Schulung absolvieren.';
  $('res-rating').textContent = rating;

  var det = $('res-details');
  det.innerHTML = '';
  S.answers.forEach(function(a){
    var e = EMAILS.find(function(x){ return x.id === a.emailId; });
    var div = document.createElement('div');
    div.className = 'res-item '+(a.correct?'res-ok':'res-fail');
    div.innerHTML =
      '<span class="res-icon">'+(a.correct?'✅':'❌')+'</span>'+
      '<span class="res-subj">'+escHtml(e.subject)+'</span>'+
      '<span class="res-badge '+(e.isPhishing?'badge-p':'badge-l')+'">'+
        (e.isPhishing?'Phishing':'Legitim')+'</span>'+
      '<span class="res-pts">'+a.pts+' Pkt</span>';
    det.appendChild(div);
  });

  SCORM.finish(pct, pct >= 60);
}

function restartSim(){
  S = { idx:0, answers:[], score:0, phase:'start', hintsShown:0, linkClicked:false, spamClicked:false, hoverRevealed:false };
  showScreen('start-screen');
  updateProgress();
}

window.addEventListener('DOMContentLoaded', function(){
  showScreen('start-screen');
  updateProgress();
});

function askForReason() {
  document.getElementById('reason-screen').style.display = 'block';
  document.getElementById('reason-select').value = ""; // Dropdown zurücksetzen
}

function submitReason() {
  var reason = document.getElementById('reason-select').value;
  if (!reason) {
    alert("Bitte wählen Sie einen Grund aus.");
    return;
  }
  document.getElementById('reason-screen').style.display = 'none';
  
  // Die Original-Bewertung aufrufen ('spam' ist das Schlüsselwort für Phishing im System)
  submitAnswer('spam');
  
  // Leiste aktualisieren, um die Buttons auszublenden
  renderActionBar(); 
}