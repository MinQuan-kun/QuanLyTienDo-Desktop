const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');

let mainWindow;
let backendProcess;
let logStream;
const PORT = process.env.PORT || 5001;

// 1. Khởi động Backend im lặng (Không hiện cửa sổ cmd đen) và ghi log ra file
function startBackend() {
  const isProd = app.isPackaged;
  const exePath = isProd 
    ? path.join(process.resourcesPath, 'start_app.exe')
    : path.join(__dirname, 'start_app.exe');

  try {
    const logDir = app.getPath('userData');
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
    const logPath = path.join(logDir, 'backend.log');
    logStream = fs.createWriteStream(logPath, { flags: 'a' });
    logStream.write(`\n=== KHỞI ĐỘNG HỆ THỐNG: ${new Date().toLocaleString()} ===\n`);
    logStream.write(`Đường dẫn thực thi backend: ${exePath}\n`);
  } catch (logErr) {
    console.error('Không thể tạo file log:', logErr);
  }

  console.log(`Đang chạy Backend từ đường dẫn: ${exePath}`);

  backendProcess = spawn(exePath, [], {
    cwd: isProd ? process.resourcesPath : __dirname,
    env: { ...process.env, PORT: PORT }
  });

  backendProcess.stdout.on('data', (data) => {
    console.log(`[Backend Log]: ${data}`);
    if (logStream) logStream.write(`[Log] ${data}`);
  });

  backendProcess.stderr.on('data', (data) => {
    console.error(`[Backend Error]: ${data}`);
    if (logStream) logStream.write(`[Error] ${data}`);
  });
}

// 2. Chờ Backend khởi động thành công (cổng 5001 phản hồi ping)
function checkServerReady(callback) {
  const req = http.get(`http://localhost:${PORT}/api/ping`, (res) => {
    if (res.statusCode === 200) {
      callback();
    } else {
      setTimeout(() => checkServerReady(callback), 200);
    }
  });
  
  req.on('error', () => {
    setTimeout(() => checkServerReady(callback), 200);
  });
}

// 3. Tạo cửa sổ phần mềm đẹp đẽ
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1366,
    height: 768,
    title: "Hệ Thống Theo Dõi Tiến Độ Công Việc",
    icon: path.join(__dirname, 'build', 'icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  mainWindow.loadURL(`http://localhost:${PORT}`);

  Menu.setApplicationMenu(null); // Ẩn Menu mặc định

  // Cho phép bấm F12 để bật/tắt công cụ nhà phát triển phục vụ debug lỗi
  mainWindow.webContents.on('before-input-event', (event, input) => {
    if (input.key === 'F12' && input.type === 'keyDown') {
      mainWindow.webContents.toggleDevTools();
      event.preventDefault();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
    if (logStream) {
      logStream.write(`=== ĐÓNG ỨNG DỤNG: ${new Date().toLocaleString()} ===\n`);
      logStream.end();
    }
  });
}

// Chạy ứng dụng
app.on('ready', () => {
  startBackend();
  checkServerReady(() => {
    createWindow();
  });
});

// Tắt backend khi đóng app để tránh bị lỗi treo cổng 5001 lần chạy sau
app.on('window-all-closed', () => {
  if (backendProcess) {
    backendProcess.kill();
  }
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('will-quit', () => {
  if (backendProcess) {
    backendProcess.kill();
  }
});
