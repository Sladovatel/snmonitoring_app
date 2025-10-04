const information = document.getElementById('info')
information.innerText = `Приложение использует Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), и Electron (v${versions.electron()})`