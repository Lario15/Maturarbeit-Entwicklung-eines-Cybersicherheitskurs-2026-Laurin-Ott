import string
import sys

# Hier fügt Moodle das password = "..." des Schülers ein
{{ STUDENT_ANSWER }}

# Sicherheitscheck, falls die Variable vom Schüler gelöscht wurde
if 'password' not in locals():
    print("Fehler: Bitte definiere eine Variable namens 'password'!")
    sys.exit(0)

# 1. Die blockierten Begriffe (Wörterbuch-Blacklist)
TOP_BAD_WORDS = [
    "passwort", "password", "admin", "administrator", "geheim", "secret", "login", 
    "schule", "lernen", "lehrer", "schüler", "klasse", "winterthur", "zürich",
    "sommer", "winter", "frühling", "herbst", "ferien", "sonne", "mond",
    "hallo", "welcome", "super", "cool", "master", "king", "boss",
    "peter", "hans", "anna", "maria", "max", "felix", "monika",
    "fussball", "sport", "auto", "musik", "gaming", "handy", "computer",
    "123456", "123456789", "qwertz", "qwerty", "asdfgh"
]

# 2. Kriterien einzeln prüfen
criteria = [
    (len(password) >= 12, "Mindestens 12 Zeichen lang"),
    (any(c.islower() for c in password), "Enthält Kleinbuchstaben"),
    (any(c.isupper() for c in password), "Enthält Grossbuchstaben"),
    (any(c.isdigit() for c in password), "Enthält mindestens eine Zahl"),
    (any(c in string.punctuation for c in password), "Enthält mindestens ein Sonderzeichen"),
    # Hier ist dein neuer Wörterbuch-Check eingebaut:
    (not any(word in password.lower() for word in TOP_BAD_WORDS), "Keine offensichtlichen Wörter oder Namen")
]

# 3. Report generieren
all_ok = True
print("--- PASSWORT-CHECK REPORT ---")
for fulfilled, desc in criteria:
    status = "✅ ERFÜLLT" if fulfilled else "❌ NICHT ERFÜLLT"
    print(f"{desc}: {status}")
    if not fulfilled:
        all_ok = False

print("------------------------------")
if all_ok:
    print("ERGEBNIS: Das Passwort ist perfekt und absolut sicher!")
else:
    print("ERGEBNIS: Das Passwort ist NOCH NICHT sicher genug.")