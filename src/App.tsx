import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import './App.css';

// Global state cho completed orders
const CompletedOrdersContext = createContext<{
  completedOrders: Array<{id: string, order: string, completedAt: string, epcs: string[]}>;
  addCompletedOrder: (order: {id: string, order: string, epcs: string[]}) => void;
}>({
  completedOrders: [],
  addCompletedOrder: () => {}
});

// Dashboard Component
function Dashboard() {
  const { completedOrders } = useContext(CompletedOrdersContext);
  const inventoryData = [
    { sku: 'SKU001', name: 'iPhone 15 Pro Max', stock: 120 },
    { sku: 'SKU002', name: 'Samsung Galaxy S24', stock: 80 },
    { sku: 'SKU003', name: 'MacBook Pro M3', stock: 45 },
    { sku: 'SKU004', name: 'iPad Air 5th Gen', stock: 67 },
    { sku: 'SKU005', name: 'AirPods Pro 2', stock: 150 },
    { sku: 'SKU006', name: 'Apple Watch Series 9', stock: 92 },
    { sku: 'SKU007', name: 'Sony WH-1000XM5', stock: 38 },
    { sku: 'SKU008', name: 'Dell XPS 13', stock: 25 },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="company-header">
          <div className="company-brand">
            <h1 className="page-title">📊 WMS Dashboard</h1>
            <div className="company-info">
              <span className="company-name">Powered by Innotech Vietnam</span>
              <span className="company-website">innotech-vn.com</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-2 mb-8">
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Tồn kho theo SKU</h2>
            <p className="card-subtitle">Thông tin tồn kho hiện tại trong kho</p>
          </div>
          <div className="card-content">
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>SKU</th>
                    <th>Tên sản phẩm</th>
                    <th className="text-right">Tồn kho</th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryData.map(item => (
                    <tr key={item.sku}>
                      <td className="font-medium">{item.sku}</td>
                      <td>{item.name}</td>
                      <td className="text-right">
                        <span className={`status-badge ${item.stock > 50 ? 'status-success' : item.stock > 20 ? 'status-active' : 'status-error'}`}>
                          {item.stock}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Đơn hàng đang chờ xử lý</h2>
            <p className="card-subtitle">Danh sách đơn hàng cần được xử lý</p>
          </div>
          <div className="card-content">
            <div className="list">
              <div className="list-item">
                <div className="flex-1">
                  <div className="font-semibold">Mã đơn: ORD001</div>
                  <div className="text-muted">5 sản phẩm (iPhone, AirPods, Apple Watch)</div>
                </div>
                <span className="status-badge status-pending">Chờ lấy hàng</span>
              </div>
              <div className="list-item">
                <div className="flex-1">
                  <div className="font-semibold">Mã đơn: ORD002</div>
                  <div className="text-muted">3 sản phẩm (MacBook, iPad, Sony)</div>
                </div>
                <span className="status-badge status-pending">Chờ lấy hàng</span>
              </div>
              <div className="list-item">
                <div className="flex-1">
                  <div className="font-semibold">Mã đơn: ORD003</div>
                  <div className="text-muted">2 sản phẩm (Samsung, Dell)</div>
                </div>
                <span className="status-badge status-pending">Chờ lấy hàng</span>
              </div>
            </div>
          </div>
        </div>

        {/* Completed Orders Section */}
        <div>
          <h2 className="card-title">📦 Đơn hàng đã hoàn thành - Chờ xuất đi</h2>
          <div className="card">
            <div className="card-content">
              {completedOrders.length === 0 ? (
                <div className="text-center text-muted py-8">
                  Chưa có đơn hàng nào hoàn thành
                </div>
              ) : (
                <div className="list">
                  {completedOrders.map((order, idx) => (
                    <div key={idx} className="list-item">
                      <div className="flex-1">
                        <div className="font-semibold">Mã đơn: {order.order}</div>
                        <div className="text-muted">
                          {order.epcs.length} sản phẩm ({order.epcs.join(', ')})
                        </div>
                        <div className="text-muted text-sm">
                          Hoàn thành: {order.completedAt}
                        </div>
                      </div>
                      <span className="status-badge status-success">✅ Sẵn sàng xuất</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <Link to="/batch-pick/create" className="btn btn-primary btn-lg">
          ➕ Tạo lệnh batch-pick mới
        </Link>
      </div>
      
      {/* Company Footer */}
      <div className="company-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <img 
                src="https://innotech-vn.com/wp-content/themes/innotech/public/images/logo_innotech_2_optimized.png" 
                alt="Innotech Vietnam Logo" 
                className="footer-logo-img"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'inline';
                }}
              />
              <span className="footer-logo-fallback" style={{display: 'none'}}>🏢</span>
              <span>Innotech Vietnam</span>
            </div>
            <div className="footer-tagline">Leading Software Development Company</div>
          </div>
          <div className="footer-services">
            <span>WMS Solutions</span>
            <span>•</span>
            <span>Custom Software</span>
            <span>•</span>
            <span>AI Development</span>
            <span>•</span>
            <span>Mobile & Web Apps</span>
          </div>
          <div className="footer-contact">
            <span>📧 info@innotech-vn.com</span>
            <span>•</span>
            <span>🌐 innotech-vn.com</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Create Batch Pick Component
function CreateBatchPick() {
  const navigate = useNavigate();
  const [selectedSKU, setSelectedSKU] = useState('');
  const [showEPC, setShowEPC] = useState(false);

  const mockSKUs = [
    { sku: 'SKU001', name: 'iPhone 15 Pro Max' },
    { sku: 'SKU002', name: 'Samsung Galaxy S24' },
    { sku: 'SKU003', name: 'MacBook Pro M3' },
    { sku: 'SKU004', name: 'iPad Air 5th Gen' },
    { sku: 'SKU005', name: 'AirPods Pro 2' },
    { sku: 'SKU006', name: 'Apple Watch Series 9' },
    { sku: 'SKU007', name: 'Sony WH-1000XM5' },
    { sku: 'SKU008', name: 'Dell XPS 13' },
    { sku: 'SKU009', name: 'Nintendo Switch OLED' },
    { sku: 'SKU010', name: 'PS5 Console' },
    { sku: 'SKU011', name: 'Xbox Series X' },
    { sku: 'SKU012', name: 'Meta Quest 3' },
    { sku: 'SKU013', name: 'Steam Deck' },
    { sku: 'SKU014', name: 'Microsoft Surface Pro 9' },
    { sku: 'SKU015', name: 'Google Pixel 8 Pro' },
  ];

  const mockEPCs = [
    // iPhone 15 Pro Max
    { epc: 'EPC001', sku: 'SKU001', timestamp: '2024-06-01', location: 'Kệ A1 - Tầng 1 - Ô 1' },
    { epc: 'EPC002', sku: 'SKU001', timestamp: '2024-06-02', location: 'Kệ A1 - Tầng 1 - Ô 2' },
    { epc: 'EPC003', sku: 'SKU001', timestamp: '2024-06-03', location: 'Kệ A1 - Tầng 1 - Ô 3' },
    
    // Samsung Galaxy S24
    { epc: 'EPC004', sku: 'SKU002', timestamp: '2024-06-01', location: 'Kệ A1 - Tầng 2 - Ô 1' },
    { epc: 'EPC005', sku: 'SKU002', timestamp: '2024-06-02', location: 'Kệ A1 - Tầng 2 - Ô 2' },
    
    // MacBook Pro M3
    { epc: 'EPC006', sku: 'SKU003', timestamp: '2024-06-01', location: 'Kệ B1 - Tầng 1 - Ô 1' },
    { epc: 'EPC007', sku: 'SKU003', timestamp: '2024-06-03', location: 'Kệ B1 - Tầng 1 - Ô 2' },
    
    // iPad Air 5th Gen
    { epc: 'EPC008', sku: 'SKU004', timestamp: '2024-06-02', location: 'Kệ A2 - Tầng 1 - Ô 1' },
    { epc: 'EPC009', sku: 'SKU004', timestamp: '2024-06-04', location: 'Kệ A2 - Tầng 1 - Ô 2' },
    { epc: 'EPC010', sku: 'SKU004', timestamp: '2024-06-05', location: 'Kệ A2 - Tầng 1 - Ô 3' },
    
    // AirPods Pro 2
    { epc: 'EPC011', sku: 'SKU005', timestamp: '2024-06-01', location: 'Kệ C1 - Tầng 1 - Ô 1' },
    { epc: 'EPC012', sku: 'SKU005', timestamp: '2024-06-02', location: 'Kệ C1 - Tầng 1 - Ô 2' },
    { epc: 'EPC013', sku: 'SKU005', timestamp: '2024-06-03', location: 'Kệ C1 - Tầng 1 - Ô 3' },
    { epc: 'EPC014', sku: 'SKU005', timestamp: '2024-06-04', location: 'Kệ C1 - Tầng 1 - Ô 4' },
    
    // Apple Watch Series 9
    { epc: 'EPC015', sku: 'SKU006', timestamp: '2024-06-02', location: 'Kệ C2 - Tầng 1 - Ô 1' },
    { epc: 'EPC016', sku: 'SKU006', timestamp: '2024-06-03', location: 'Kệ C2 - Tầng 1 - Ô 2' },
    
    // Sony WH-1000XM5
    { epc: 'EPC017', sku: 'SKU007', timestamp: '2024-06-01', location: 'Kệ D1 - Tầng 1 - Ô 1' },
    { epc: 'EPC018', sku: 'SKU007', timestamp: '2024-06-04', location: 'Kệ D1 - Tầng 1 - Ô 2' },
    
    // Dell XPS 13
    { epc: 'EPC019', sku: 'SKU008', timestamp: '2024-06-02', location: 'Kệ B2 - Tầng 1 - Ô 1' },
    { epc: 'EPC020', sku: 'SKU008', timestamp: '2024-06-05', location: 'Kệ B2 - Tầng 1 - Ô 2' },
    
    // Nintendo Switch OLED
    { epc: 'EPC021', sku: 'SKU009', timestamp: '2024-06-01', location: 'Kệ E1 - Tầng 1 - Ô 1' },
    { epc: 'EPC022', sku: 'SKU009', timestamp: '2024-06-03', location: 'Kệ E1 - Tầng 1 - Ô 2' },
    { epc: 'EPC023', sku: 'SKU009', timestamp: '2024-06-04', location: 'Kệ E1 - Tầng 1 - Ô 3' },
    
    // PS5 Console
    { epc: 'EPC024', sku: 'SKU010', timestamp: '2024-06-02', location: 'Kệ E2 - Tầng 1 - Ô 1' },
    { epc: 'EPC025', sku: 'SKU010', timestamp: '2024-06-05', location: 'Kệ E2 - Tầng 1 - Ô 2' },
    
    // Xbox Series X
    { epc: 'EPC026', sku: 'SKU011', timestamp: '2024-06-01', location: 'Kệ E3 - Tầng 1 - Ô 1' },
    { epc: 'EPC027', sku: 'SKU011', timestamp: '2024-06-04', location: 'Kệ E3 - Tầng 1 - Ô 2' },
    
    // Meta Quest 3
    { epc: 'EPC028', sku: 'SKU012', timestamp: '2024-06-03', location: 'Kệ F1 - Tầng 1 - Ô 1' },
    { epc: 'EPC029', sku: 'SKU012', timestamp: '2024-06-05', location: 'Kệ F1 - Tầng 1 - Ô 2' },
    
    // Steam Deck
    { epc: 'EPC030', sku: 'SKU013', timestamp: '2024-06-02', location: 'Kệ F2 - Tầng 1 - Ô 1' },
    { epc: 'EPC031', sku: 'SKU013', timestamp: '2024-06-04', location: 'Kệ F2 - Tầng 1 - Ô 2' },
    
    // Microsoft Surface Pro 9
    { epc: 'EPC032', sku: 'SKU014', timestamp: '2024-06-01', location: 'Kệ B3 - Tầng 1 - Ô 1' },
    { epc: 'EPC033', sku: 'SKU014', timestamp: '2024-06-03', location: 'Kệ B3 - Tầng 1 - Ô 2' },
    
    // Google Pixel 8 Pro
    { epc: 'EPC034', sku: 'SKU015', timestamp: '2024-06-02', location: 'Kệ A3 - Tầng 1 - Ô 1' },
    { epc: 'EPC035', sku: 'SKU015', timestamp: '2024-06-05', location: 'Kệ A3 - Tầng 1 - Ô 2' },
  ];

  const handleSelectSKU = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSKU(e.target.value);
    setShowEPC(false);
  };

  const handleSuggest = () => {
    setShowEPC(true);
  };

  const handleCreateBatch = () => {
    navigate('/batch-pick/view/BP001');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">🛠️ Tạo lệnh lấy hàng theo lô</h1>
      </div>
      
      <div className="card max-w-lg" style={{ margin: '0 auto' }}>
        <div className="card-header">
          <h2 className="card-title">Thiết lập batch-pick</h2>
          <p className="card-subtitle">Chọn SKU và gợi ý EPC theo nguyên tắc FIFO</p>
        </div>
        <div className="card-content">
          <div className="form-group">
            <label className="form-label">Chọn SKU cần lấy</label>
            <div className="form-row">
              <select value={selectedSKU} onChange={handleSelectSKU} className="form-select">
                <option value="">-- Chọn SKU --</option>
                {mockSKUs.map(sku => (
                  <option key={sku.sku} value={sku.sku}>{sku.sku} - {sku.name}</option>
                ))}
              </select>
              <button onClick={handleSuggest} className="btn btn-primary" disabled={!selectedSKU}>
                🔍 Gợi ý EPC (FIFO)
              </button>
            </div>
          </div>

          {showEPC && selectedSKU && (
            <div className="mb-6">
              <h3 className="font-semibold mb-4">Danh sách EPC gợi ý (FIFO)</h3>
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>EPC</th>
                      <th>Thời gian nhập kho</th>
                      <th>Vị trí</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockEPCs
                      .filter(e => e.sku === selectedSKU)
                      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
                      .map(e => (
                      <tr key={e.epc}>
                        <td className="font-medium">{e.epc}</td>
                        <td>{e.timestamp}</td>
                        <td className="text-muted">{e.location}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <button onClick={handleCreateBatch} className="btn btn-success w-full" disabled={!showEPC || !selectedSKU}>
            ✅ Tạo lệnh lấy hàng
          </button>
        </div>
      </div>
    </div>
  );
}

// View Batch Pick Component
function ViewBatchPick() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Sử dụng cùng data như trang Create để đồng bộ
  const allEPCs = [
    // iPhone 15 Pro Max
    { epc: 'EPC001', sku: 'SKU001', name: 'iPhone 15 Pro Max', timestamp: '2024-06-01', location: 'Kệ A1 - Tầng 1 - Ô 1' },
    { epc: 'EPC002', sku: 'SKU001', name: 'iPhone 15 Pro Max', timestamp: '2024-06-02', location: 'Kệ A1 - Tầng 1 - Ô 2' },
    { epc: 'EPC003', sku: 'SKU001', name: 'iPhone 15 Pro Max', timestamp: '2024-06-03', location: 'Kệ A1 - Tầng 1 - Ô 3' },
    
    // Samsung Galaxy S24
    { epc: 'EPC004', sku: 'SKU002', name: 'Samsung Galaxy S24', timestamp: '2024-06-01', location: 'Kệ A1 - Tầng 2 - Ô 1' },
    { epc: 'EPC005', sku: 'SKU002', name: 'Samsung Galaxy S24', timestamp: '2024-06-02', location: 'Kệ A1 - Tầng 2 - Ô 2' },
    
    // MacBook Pro M3
    { epc: 'EPC006', sku: 'SKU003', name: 'MacBook Pro M3', timestamp: '2024-06-01', location: 'Kệ B1 - Tầng 1 - Ô 1' },
    { epc: 'EPC007', sku: 'SKU003', name: 'MacBook Pro M3', timestamp: '2024-06-03', location: 'Kệ B1 - Tầng 1 - Ô 2' },
    
    // iPad Air 5th Gen
    { epc: 'EPC008', sku: 'SKU004', name: 'iPad Air 5th Gen', timestamp: '2024-06-02', location: 'Kệ A2 - Tầng 1 - Ô 1' },
    { epc: 'EPC009', sku: 'SKU004', name: 'iPad Air 5th Gen', timestamp: '2024-06-04', location: 'Kệ A2 - Tầng 1 - Ô 2' },
    { epc: 'EPC010', sku: 'SKU004', name: 'iPad Air 5th Gen', timestamp: '2024-06-05', location: 'Kệ A2 - Tầng 1 - Ô 3' },
    
    // AirPods Pro 2
    { epc: 'EPC011', sku: 'SKU005', name: 'AirPods Pro 2', timestamp: '2024-06-01', location: 'Kệ C1 - Tầng 1 - Ô 1' },
    { epc: 'EPC012', sku: 'SKU005', name: 'AirPods Pro 2', timestamp: '2024-06-02', location: 'Kệ C1 - Tầng 1 - Ô 2' },
    { epc: 'EPC013', sku: 'SKU005', name: 'AirPods Pro 2', timestamp: '2024-06-03', location: 'Kệ C1 - Tầng 1 - Ô 3' },
    { epc: 'EPC014', sku: 'SKU005', name: 'AirPods Pro 2', timestamp: '2024-06-04', location: 'Kệ C1 - Tầng 1 - Ô 4' },
  ];

  // Giả sử batch này được tạo từ SKU001 (iPhone)
  // Trong thực tế, bạn sẽ lưu selectedSKU vào localStorage hoặc state management
  const selectedSKU = 'SKU001'; // Demo cho iPhone
  
  const mockBatchPick = {
    id: 'BP001',
    selectedSKU: selectedSKU,
    epcs: allEPCs
      .filter(e => e.sku === selectedSKU)
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
  };

  const handleSendToDevice = () => {
    navigate(`/batch-pick/process/${id}`);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">📃 Danh sách lấy hàng điện tử</h1>
      </div>
      
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Batch-pick: {mockBatchPick.id}</h2>
          <p className="card-subtitle">
            SKU: {mockBatchPick.selectedSKU} - {mockBatchPick.epcs[0]?.name} 
            ({mockBatchPick.epcs.length} EPC cần lấy theo thứ tự FIFO)
          </p>
        </div>
        <div className="card-content">
          <div className="table-container mb-6">
            <table className="table">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>EPC</th>
                  <th>SKU</th>
                  <th>Tên sản phẩm</th>
                  <th>Thời gian nhập kho</th>
                  <th>Vị trí</th>
                </tr>
              </thead>
              <tbody>
                {mockBatchPick.epcs.map((e, index) => (
                  <tr key={e.epc}>
                    <td className="font-medium text-center">{index + 1}</td>
                    <td className="font-medium">{e.epc}</td>
                    <td>{e.sku}</td>
                    <td>{e.name}</td>
                    <td>{e.timestamp}</td>
                    <td className="text-muted">{e.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="flex gap-4">
            <button className="btn btn-secondary">
              🖨️ In danh sách
            </button>
            <button onClick={handleSendToDevice} className="btn btn-success">
              📱 Gửi đến thiết bị nhân viên kho
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Process Batch Pick Component
function ProcessBatchPick() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [scanned, setScanned] = useState('');
  const [done, setDone] = useState<string[]>([]);

  // Sử dụng cùng logic filter như ViewBatchPick
  const selectedSKU = 'SKU001'; // Demo cho iPhone (trong thực tế lấy từ props/state)
  
  const allEPCs = [
    { epc: 'EPC001', sku: 'SKU001', name: 'iPhone 15 Pro Max', location: 'Kệ A1 - Tầng 1 - Ô 1' },
    { epc: 'EPC002', sku: 'SKU001', name: 'iPhone 15 Pro Max', location: 'Kệ A1 - Tầng 1 - Ô 2' },
    { epc: 'EPC003', sku: 'SKU001', name: 'iPhone 15 Pro Max', location: 'Kệ A1 - Tầng 1 - Ô 3' },
    { epc: 'EPC004', sku: 'SKU002', name: 'Samsung Galaxy S24', location: 'Kệ A1 - Tầng 2 - Ô 1' },
    { epc: 'EPC005', sku: 'SKU002', name: 'Samsung Galaxy S24', location: 'Kệ A1 - Tầng 2 - Ô 2' },
    { epc: 'EPC006', sku: 'SKU003', name: 'MacBook Pro M3', location: 'Kệ B1 - Tầng 1 - Ô 1' },
    { epc: 'EPC007', sku: 'SKU003', name: 'MacBook Pro M3', location: 'Kệ B1 - Tầng 1 - Ô 2' },
  ];

  const mockEPCs = allEPCs.filter(e => e.sku === selectedSKU);

  const handleScan = () => {
    if (scanned === mockEPCs[current].epc) {
      setDone([...done, scanned]);
      setScanned('');
      setCurrent(current + 1);
    } else {
      alert('Barcode không khớp EPC cần lấy!');
    }
  };

  const handleRFIDScan = () => {
    // Mô phỏng quét RFID - tự động điền EPC hiện tại
    setScanned(mockEPCs[current].epc);
  };

  const isFinished = current >= mockEPCs.length;

  const handleGoToSorting = () => {
    navigate('/sorting-station');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">🚶‍♂️ Thực hiện lấy hàng</h1>
      </div>
      
      <div className="card max-w-md" style={{ margin: '0 auto' }}>
        <div className="card-content">
          {!isFinished ? (
            <>
              <div className="progress-container">
                <div className="progress-text">
                  Tiến độ: {done.length}/{mockEPCs.length} EPC 
                  <span className="text-muted ml-2">({selectedSKU} - {mockEPCs[0]?.name})</span>
                </div>
              </div>

              <div className="card mb-6" style={{ background: 'var(--primary-50)', border: '2px solid var(--primary-200)' }}>
                <div className="card-content">
                  <div className="font-bold text-primary-600 mb-2">EPC cần lấy tiếp theo:</div>
                  <div className="font-bold text-xl mb-2">{mockEPCs[current].epc}</div>
                  <div className="text-muted mb-1">SKU: {mockEPCs[current].sku} - {mockEPCs[current].name}</div>
                  <div className="text-muted">📍 Vị trí: {mockEPCs[current].location}</div>
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Quét RFID để nhập EPC</label>
                <div className="form-row mb-3">
                  <button onClick={handleRFIDScan} className="btn btn-warning w-full">
                    📡 Quét RFID
                  </button>
                </div>
                <label className="form-label">Xác nhận EPC đã lấy</label>
                <div className="form-row">
                  <input 
                    value={scanned} 
                    onChange={e => setScanned(e.target.value)} 
                    className="form-input"
                    placeholder="Nhập mã EPC hoặc quét RFID..."
                  />
                  <button onClick={handleScan} className="btn btn-primary" disabled={!scanned}>
                    ✅ Đã lấy
                  </button>
                </div>
              </div>
              
              {done.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">Đã hoàn thành:</h4>
                  <div className="list">
                    {done.map(epc => (
                      <div key={epc} className="list-item">
                        <span className="status-badge status-success">✓</span>
                        <span className="font-medium">{epc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center">
              <div className="text-success font-bold text-2xl mb-6">
                🎉 Đã hoàn thành tất cả EPC cần lấy!
                <div className="text-base text-muted mt-2">
                  {selectedSKU} - {mockEPCs[0]?.name} ({mockEPCs.length} EPC)
                </div>
              </div>
              <button onClick={handleGoToSorting} className="btn btn-warning btn-lg w-full">
                🧠 Đi đến Trạm phân loại →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Sorting Station Component
function SortingStation() {
  const { addCompletedOrder } = useContext(CompletedOrdersContext);
  const [inputEPC, setInputEPC] = useState('');
  const [logs, setLogs] = useState<{epc: string, bin: string, status: string}[]>([]);
  const [error, setError] = useState('');
  const [bins, setBins] = useState([
    { id: 'BIN01', order: 'ORD001', status: 'Đang chờ', epcs: ['EPC001'] },
    { id: 'BIN02', order: 'ORD002', status: 'Đang chờ', epcs: ['EPC002', 'EPC003'] },
    { id: 'BIN03', order: 'ORD003', status: 'Đang chờ', epcs: ['EPC004'] },
    { id: 'BIN04', order: 'ORD004', status: 'Đang chờ', epcs: ['EPC005', 'EPC006'] },
    { id: 'BIN05', order: 'ORD005', status: 'Đang chờ', epcs: ['EPC007'] },
    { id: 'BIN06', order: 'ORD006', status: 'Đang chờ', epcs: ['EPC008', 'EPC009'] },
  ]);

  // Tạo layout 6x3 grid (18 slots tổng cộng)
  const createWarehouseLayout = () => {
    const layout = [];
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 6; col++) {
        const slotIndex = row * 6 + col + 1;
        const binId = `BIN${slotIndex.toString().padStart(2, '0')}`;
        const bin = bins.find(b => b.id === binId);
        layout.push({
          id: binId,
          isEmpty: !bin,
          bin: bin || null,
          position: { row, col }
        });
      }
    }
    return layout;
  };

  const handleSort = () => {
    setError('');
    let found = false;
    let newBins = bins.map(bin => {
      if (bin.epcs.includes(inputEPC)) {
        found = true;
        const remainingEPCs = bin.epcs.filter(e => e !== inputEPC);
        const newStatus = remainingEPCs.length === 0 ? 'Hoàn thành' : 'Đèn sáng (chỉ dẫn)';
        
        setLogs([...logs, { epc: inputEPC, bin: bin.id, status: 'Thành công' }]);
        return { ...bin, status: newStatus, epcs: remainingEPCs };
      }
      return bin;
    });
    if (!found) {
      setError('EPC không hợp lệ hoặc không thuộc lệnh batch!');
      setLogs([...logs, { epc: inputEPC, bin: '-', status: 'Lỗi' }]);
    } else {
      setBins(newBins);
    }
    setInputEPC('');
  };

  const handleRFIDScan = () => {
    // Mô phỏng quét RFID - tự động điền một EPC có sẵn
    const availableEPCs = bins.flatMap(bin => bin.epcs);
    if (availableEPCs.length > 0) {
      // Lấy EPC đầu tiên có sẵn
      setInputEPC(availableEPCs[0]);
      setError('');
    } else {
      setError('Không có EPC nào trong hệ thống để quét!');
    }
  };

  const handleBinClick = (binId: string) => {
    // Khi nhân viên bấm vào thùng đang sáng đèn để xác nhận đã đặt hàng xong
    const updatedBins = bins.map(bin => {
      if (bin.id === binId && bin.status.includes('Đèn sáng')) {
        return { ...bin, status: 'Hoàn thành' };
      }
      return bin;
    });
    setBins(updatedBins);
  };

  // Kiểm tra xem tất cả bins có EPC đã hoàn thành chưa
  const isAllCompleted = bins.every(bin => bin.status === 'Hoàn thành' || bin.epcs.length === 0);
  const hasCompletedBins = bins.some(bin => bin.status === 'Hoàn thành');

  const handleConfirmComplete = () => {
    // Lưu tất cả completed orders vào global state
    const completedBins = bins.filter(bin => bin.status === 'Hoàn thành');
    completedBins.forEach(bin => {
      addCompletedOrder({
        id: bin.id,
        order: bin.order,
        epcs: [bin.id] // Sử dụng bin ID làm EPC để demo
      });
    });

    // Reset tất cả bins về trạng thái ban đầu
    setBins(bins.map(bin => ({ ...bin, status: 'Đang chờ', epcs: [bin.id] })));
    setLogs([]);
    
    alert('✅ Đã xác nhận hoàn thành! Các đơn hàng đã được chuyển sang Dashboard.');
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">🧠 Trạm phân loại hàng hóa</h1>
      </div>
      
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Phân loại tự động với RFID</h2>
          <p className="card-subtitle">Quét EPC để kích hoạt đèn chỉ dẫn thùng chứa</p>
        </div>
        <div className="card-content">
          <div className="form-group">
            <label className="form-label">Quét RFID để nhập EPC</label>
            <div className="form-row mb-3">
              <button onClick={handleRFIDScan} className="btn btn-warning w-full">
                📡 Quét RFID
              </button>
            </div>
            <label className="form-label">EPC sản phẩm cần phân loại</label>
            <div className="form-row">
              <input 
                value={inputEPC} 
                onChange={e => setInputEPC(e.target.value)} 
                className="form-input"
                placeholder="Nhập EPC hoặc quét RFID..."
              />
              <button onClick={handleSort} className="btn btn-primary" disabled={!inputEPC}>
                🔍 Phân loại
              </button>
            </div>
          </div>

          {error && (
            <div className="alert alert-error">
              ⚠️ {error}
            </div>
          )}

          {/* Sơ đồ Warehouse Layout */}
          <div className="warehouse-layout">
            <div className="warehouse-title">📦 Sơ đồ Kho Hàng - Trạm Phân Loại</div>
            <div className="warehouse-grid">
              {createWarehouseLayout().map(slot => {
                const isLighting = slot.bin && slot.bin.status.includes('Đèn');
                const isCompleted = slot.bin && slot.bin.epcs.length === 0;
                const isOccupied = slot.bin && slot.bin.epcs.length > 0;
                
                return (
                  <div 
                    key={slot.id}
                    className={`bin-slot ${
                      isLighting ? 'lighting' : 
                      isCompleted ? 'completed' : 
                      isOccupied ? 'occupied' : ''
                    }`}
                    title={
                      isLighting ? `${slot.bin?.order} - Bấm để xác nhận đã đặt hàng xong` :
                      slot.bin ? `${slot.bin.order} - ${slot.bin.epcs.join(', ')}` : 'Trống'
                    }
                    onClick={() => isLighting && handleBinClick(slot.id)}
                    style={{ cursor: isLighting ? 'pointer' : 'default' }}
                  >
                    <div className="bin-id">{slot.id}</div>
                    <div className="bin-status">
                      {isLighting ? '💡' : 
                       isCompleted ? '✅' : 
                       isOccupied ? '📦' : '⬜'}
                    </div>
                    {slot.bin && (
                      <div className="bin-info">{slot.bin.order}</div>
                    )}
                  </div>
                );
              })}
            </div>
            
            {/* Legend */}
            <div className="warehouse-legend">
              <div className="legend-item">
                <div className="legend-box legend-empty"></div>
                <span>⬜ Trống</span>
              </div>
              <div className="legend-item">
                <div className="legend-box legend-occupied"></div>
                <span>📦 Có hàng</span>
              </div>
              <div className="legend-item">
                <div className="legend-box legend-lighting"></div>
                <span>💡 Đèn sáng</span>
              </div>
              <div className="legend-item">
                <div className="legend-box legend-completed"></div>
                <span>✅ Hoàn thành</span>
              </div>
            </div>
          </div>

          <div className="grid grid-2 mb-6">
            <div>
              <h3 className="font-semibold mb-4">Chi tiết thùng chứa</h3>
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Thùng</th>
                      <th>Đơn hàng</th>
                      <th>Trạng thái</th>
                      <th>EPC còn lại</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bins.map(bin => (
                      <tr key={bin.id}>
                        <td className="font-medium">{bin.id}</td>
                        <td>{bin.order}</td>
                        <td>
                          <span className={`status-badge ${bin.status.includes('Đèn') ? 'status-active' : 'status-pending'}`}>
                            {bin.status.includes('Đèn') ? '💡' : '⏳'} {bin.status}
                          </span>
                        </td>
                        <td className="text-muted">{bin.epcs.join(', ') || 'Đã đủ'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Log phân loại</h3>
              <div className="list" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {logs.length === 0 ? (
                  <div className="list-item text-muted">Chưa có hoạt động phân loại nào</div>
                ) : (
                  logs.map((log, idx) => (
                    <div key={idx} className="list-item">
                      <span className={`status-badge ${log.status === 'Lỗi' ? 'status-error' : 'status-success'}`}>
                        {log.status === 'Lỗi' ? '❌' : '✅'}
                      </span>
                      <div>
                        <div className="font-medium">EPC: {log.epc}</div>
                        <div className="text-muted">→ Thùng: {log.bin} [{log.status}]</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Nút xác nhận hoàn thành khi có bins hoàn thành */}
          {hasCompletedBins && (
            <div className="card mt-6">
              <div className="card-content text-center">
                <h3 className="font-semibold mb-4">🎉 Có thùng hàng đã hoàn thành!</h3>
                <p className="text-muted mb-4">
                  Bấm nút bên dưới để xác nhận và chuyển các đơn hàng sang trạng thái "Chờ xuất đi"
                </p>
                <button 
                  onClick={handleConfirmComplete}
                  className="btn btn-success btn-lg w-full mb-4"
                >
                  ✅ Xác nhận hoàn thành tất cả
                </button>
              </div>
            </div>
          )}
          
          <div className="text-center">
            <Link to="/" className="btn btn-secondary">
              🏠 Về Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Navigation Component
function Navigation() {
  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <img 
            src="https://innotech-vn.com/wp-content/themes/innotech/public/images/logo_innotech_2_optimized.png" 
            alt="Innotech Vietnam Logo" 
            className="nav-logo"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const fallback = e.currentTarget.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = 'inline';
            }}
          />
          <span className="nav-logo-fallback" style={{display: 'none', fontSize: 'var(--font-size-xl)'}}>🏢</span>
          <span className="nav-company">Innotech Vietnam</span>
          <span className="nav-demo-badge">DEMO</span>
        </div>
        <div className="nav-links">
          <Link to="/" className="nav-link">🏠 Dashboard</Link>
          <Link to="/batch-pick/create" className="nav-link">🛠️ Tạo lệnh</Link>
          <Link to="/batch-pick/view/BP001" className="nav-link">📃 Xem danh sách</Link>
          <Link to="/batch-pick/process/BP001" className="nav-link">🚶‍♂️ Thực hiện</Link>
          <Link to="/sorting-station" className="nav-link">🧠 Phân loại</Link>
        </div>
      </div>
    </nav>
  );
}

// Main App Component
function App() {
  const [completedOrders, setCompletedOrders] = useState<Array<{id: string, order: string, completedAt: string, epcs: string[]}>>([]);
  
  const addCompletedOrder = (order: {id: string, order: string, epcs: string[]}) => {
    const newCompletedOrder = {
      ...order,
      completedAt: new Date().toLocaleString('vi-VN')
    };
    setCompletedOrders(prev => [...prev, newCompletedOrder]);
  };

  return (
    <CompletedOrdersContext.Provider value={{ completedOrders, addCompletedOrder }}>
      <Router>
        <div className="app-container">
          <Navigation />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/batch-pick/create" element={<CreateBatchPick />} />
            <Route path="/batch-pick/view/:id" element={<ViewBatchPick />} />
            <Route path="/batch-pick/process/:id" element={<ProcessBatchPick />} />
            <Route path="/sorting-station" element={<SortingStation />} />
          </Routes>
        </div>
      </Router>
    </CompletedOrdersContext.Provider>
  );
}

export default App;
