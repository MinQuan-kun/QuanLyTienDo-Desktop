const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const http = require('http');

let mainWindow;
let backendProcess;
const PORT = process.env.PORT || 5001;

// 1. Khởi động Backend im lặng (Không hiện cửa sổ cmd đen)
function startBackend() {
  const isProd = app.isPackaged;
  const exePath = isProd 
    ? path.join(process.resourcesPath, 'start_app.exe')
    : path.join(__dirname, 'start_app.exe');

  console.log(`Đang chạy Backend từ đường dẫn: ${exePath}`);

  backendProcess = spawn(exePath, [], {
    cwd: isProd ? process.resourcesPath : __dirname,
    env: { ...process.env, PORT: PORT }
  });

  backendProcess.stdout.on('data', (data) => {
    console.log(`[Backend Log]: ${data}`);
  });

  backendProcess.stderr.on('data', (data) => {
    console.error(`[Backend Error]: ${data}`);
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

  mainWindow.on('closed', () => {
    mainWindow = null;
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
