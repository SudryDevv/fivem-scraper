@echo off
echo Vérification de Node.js...

node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo Node.js n'est pas installé. Installation en cours...
    bitsadmin /transfer "Téléchargement_NodeJS" https://nodejs.org/dist/v20.11.1/node-v20.11.1-x64.msi "%CD%\node_installer.msi"
    echo Installation de Node.js terminée. Ouverture du fichier d'installation...
    start "" "%CD%\node_installer.msi"
) else (
    echo Node.js est déjà installé.
)

echo Exécution du script Node.js...
node index.js
if %errorlevel% neq 0 (
    echo Une erreur s'est produite lors de l'exécution de checker.js.
    pause
    exit /b %errorlevel%
) else (
    pause
)

pause
