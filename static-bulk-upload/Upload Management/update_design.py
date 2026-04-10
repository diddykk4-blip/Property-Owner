import re

file_path = r'complete-product-management.html'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

print('File loaded. Lines:', len(content.splitlines()))

custom_style = """    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="global-styles.css">
    <style>
        body { font-family: 'Inter', sans-serif !important; background: var(--n-50) !important; color: var(--blue-gray-800) !important; }
        .header { display: none; }
        .app-header { height: 72px; background: var(--white); padding: 0 32px; display: flex; align-items: center; position: sticky; top: 0; z-index: 100; border-bottom: 1px solid var(--wire-border); }
        .header-content { width: 100%; max-width: 1400px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
        .header-logo { display: flex; align-items: center; gap: 8px; }
        .logo-icon { width: 32px; height: 32px; background: var(--primary-base); color: var(--n-900); border-radius: 6px; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 18px; }
        .logo-text { font-size: 20px; font-weight: 700; letter-spacing: -0.02em; color: var(--n-900); }
        .header-actions { display: flex; align-items: center; gap: 20px; }
        .user-profile { display: flex; align-items: center; gap: 8px; cursor: pointer; }
        .user-avatar { width: 36px; height: 36px; background: var(--primary-base); color: var(--blue-gray-800); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 700; }
        .user-name { font-size: 14px; font-weight: 500; color: var(--blue-gray-800); }
        .tabs { background: var(--white); border-bottom: 1px solid var(--wire-border); padding: 0 32px; }
        .tabs-content { max-width: 1400px; margin: 0 auto; display: flex; gap: 32px; }
        .tab { padding: 16px 0; cursor: pointer; color: var(--blue-gray-500); font-weight: 600; font-size: 14px; position: relative; transition: all 0.2s; border-bottom: 2px solid transparent; }
        .tab:hover { color: var(--n-900); }
        .tab.active { color: var(--primary-base); border-bottom-color: var(--primary-base); }
        .tab-content { display: none; }
        .tab-content.active { display: block; animation: wm-fadeIn 0.3s ease-out; }
        @keyframes wm-fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
        .container { max-width: 1400px; margin: 0 auto; padding: 32px; }
        .card { background: var(--white); border-radius: 12px; border: 1px solid var(--wire-border); margin-bottom: 24px; box-shadow: var(--shadow-sm); }
        .card-header { padding: 24px; border-bottom: 1px solid var(--wire-border); }
        .card-header h2 { font-size: 20px; font-weight: 600; margin-bottom: 4px; color: var(--n-900); }
        .card-header p { color: var(--blue-gray-500); font-size: 14px; }
        .card-body { padding: 24px; }
        .form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; }
        .form-group { margin-bottom: 20px; display: flex; flex-direction: column; gap: 8px; }
        .form-group.full-width { grid-column: 1 / -1; }
        label { display: block; font-size: 14px; font-weight: 600; color: var(--blue-gray-800); }
        .label-required::after { content: '*'; color: var(--error-base); margin-left: 4px; }
        input[type="text"], input[type="number"], input[type="date"], select, textarea { width: 100%; padding: 12px 16px; border: 1px solid var(--n-200); border-radius: 8px; font-family: 'Inter', sans-serif; font-size: 14px; color: var(--blue-gray-800); background: var(--white); transition: all 0.2s; }
        input:focus, select:focus, textarea:focus { outline: none; border-color: var(--primary-base); box-shadow: 0 0 0 3px rgba(255, 190, 0, 0.2); }
        textarea { resize: vertical; min-height: 100px; }
        .helper-text { font-size: 12px; color: var(--blue-gray-500); }
        .btn { padding: 10px 20px; border-radius: 8px; font-weight: 600; font-size: 14px; cursor: pointer; border: none; display: inline-flex; align-items: center; gap: 8px; transition: all 0.2s; font-family: 'Inter', sans-serif; }
        .btn-primary { background: var(--primary-base); color: var(--n-900); border: 1px solid transparent; }
        .btn-primary:hover { background: var(--primary-200); box-shadow: var(--shadow-sm); transform: translateY(-1px); }
        .btn-secondary { background: var(--white); color: var(--blue-gray-800); border: 1px solid var(--wire-border); }
        .btn-secondary:hover { background: var(--n-25); }
        .btn-ghost { background: transparent; color: var(--blue-gray-500); box-shadow: none; }
        .btn-ghost:hover { background: var(--n-50); color: var(--blue-gray-800); }
        .btn-sm { padding: 6px 12px; font-size: 13px; }
        .btn-success { background: var(--success-base); color: white; }
        .btn-success:hover { background: #0c7c32; }
        .btn-error { background: var(--error-base); color: white; }
        .btn-error:hover { background: #b01f1a; }
        .collapsible-section { border: 1px solid var(--wire-border); border-radius: 8px; margin-bottom: 20px; overflow: hidden; background: var(--white); }
        .collapsible-header { background: var(--n-25); padding: 16px 24px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; user-select: none; border-bottom: 1px solid var(--wire-border); }
        .collapsible-header:hover { background: #e5e9ed; }
        .collapsible-header h3 { font-size: 16px; font-weight: 600; color: var(--n-900); margin: 0; }
        .collapsible-icon { transition: transform 0.2s; color: var(--n-600); }
        .collapsible-section.collapsed .collapsible-icon { transform: rotate(-90deg); }
        .collapsible-body { padding: 24px; display: block; }
        .collapsible-section.collapsed .collapsible-body { display: none; }
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 24px; margin-bottom: 32px; }
        .stat-card { background: var(--white); border-radius: 12px; padding: 24px; border: 1px solid var(--wire-border); box-shadow: var(--shadow-xs); }
        .stat-label { font-size: 12px; color: var(--blue-gray-500); text-transform: uppercase; font-weight: 600; letter-spacing: 0.05em; margin-bottom: 8px; }
        .stat-value { font-size: 40px; font-weight: 700; color: var(--n-900); letter-spacing: -0.02em; line-height: 1; }
        .search-bar { display: flex; gap: 16px; margin-bottom: 24px; flex-wrap: wrap; }
        .search-input-wrapper { flex: 1; min-width: 300px; position: relative; }
        .search-input { width: 100%; padding: 10px 14px 10px 40px !important; font-family: 'Inter', sans-serif; }
        .search-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: var(--blue-gray-500); width: 16px; height: 16px; }
        .table-container { overflow-x: auto; border-radius: 8px; border: 1px solid var(--wire-border); background: var(--white); }
        table { width: 100%; border-collapse: collapse; }
        thead { background: var(--n-25); }
        th { padding: 12px 16px; text-align: left; font-weight: 600; font-size: 12px; color: var(--blue-gray-500); border-bottom: 1px solid var(--wire-border); text-transform: uppercase; letter-spacing: 0.05em; }
        td { padding: 16px; border-bottom: 1px solid var(--wire-border); font-size: 14px; color: var(--blue-gray-800); }
        tbody tr:hover { background: var(--n-25); }
        tbody tr:last-child td { border-bottom: none; }
        .product-info { display: flex; align-items: center; gap: 12px; }
        .product-image { width: 48px; height: 48px; border-radius: 8px; object-fit: cover; border: 1px solid var(--wire-border); }
        .product-details h4 { font-weight: 500; font-size: 14px; margin-bottom: 2px; color: var(--n-900); }
        .product-sku { font-size: 12px; color: var(--blue-gray-500); }
        .action-buttons { display: flex; gap: 8px; }
        .info-banner { background: var(--secondary-50); border: 1px solid #99B3FF; padding: 12px 16px; border-radius: 8px; display: flex; gap: 12px; margin-bottom: 24px; color: var(--secondary-base); }
        .info-banner svg { color: var(--secondary-base); width: 20px; height: 20px; flex-shrink: 0; margin-top: 2px; }
        .info-banner-text { font-size: 14px; }
        .badge { display: inline-flex; align-items: center; gap: 6px; padding: 4px 12px; border-radius: 16px; font-size: 12px; font-weight: 600; }
        .badge-pending { background: var(--warning-light); color: #B0740E; }
        .badge-approved { background: var(--success-light); color: var(--success-base); }
        .badge-rejected, .badge-failed { background: var(--error-light); color: var(--error-base); }
        .badge-archived { background: var(--n-100); color: var(--n-700); }
        .badge-synced { background: var(--success-light); color: var(--success-base); }
        .badge-syncing { background: var(--secondary-50); color: var(--secondary-base); }
        .status-dot { width: 6px; height: 6px; border-radius: 50%; }
        .status-dot.approved { background: var(--success-base); }
        .status-dot.pending { background: #F3A218; }
        .status-dot.syncing { background: var(--secondary-base); animation: wmPulse 2s infinite; }
        .status-dot.rejected { background: var(--error-base); }
        @keyframes wmPulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        .upc-display { display: flex; align-items: center; gap: 16px; padding: 16px; background: var(--n-25); border-radius: 8px; border: 1px solid var(--wire-border); }
        .upc-code { font-family: 'Courier New', monospace; font-size: 20px; font-weight: 600; color: var(--n-900); }
        .upc-label { font-size: 12px; color: var(--blue-gray-500); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
        .image-upload-area { border: 2px dashed var(--wire-border); border-radius: 12px; padding: 32px; text-align: center; cursor: pointer; transition: all 0.2s; }
        .image-upload-area:hover { border-color: var(--primary-base); background: var(--n-25); }
        .upload-icon { width: 48px; height: 48px; margin: 0 auto 16px; color: var(--blue-gray-500); }
        .image-preview-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 16px; margin-top: 16px; }
        .image-preview { position: relative; aspect-ratio: 1; border-radius: 8px; overflow: hidden; border: 1px solid var(--wire-border); }
        .image-preview img { width: 100%; height: 100%; object-fit: cover; }
        .image-preview-remove { position: absolute; top: 8px; right: 8px; background: rgba(0,0,0,0.7); color: white; border: none; border-radius: 50%; width: 24px; height: 24px; cursor: pointer; display: flex; align-items: center; justify-content: center; }
        .modal-overlay { position: fixed; inset: 0; background: rgba(0, 0, 0, 0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; opacity: 0; pointer-events: none; transition: opacity 0.2s; padding: 16px; }
        .modal-overlay.active { opacity: 1; pointer-events: all; }
        .modal { background: var(--white); border-radius: 12px; box-shadow: var(--shadow-lg); max-width: 600px; width: 100%; max-height: 90vh; overflow: hidden; display: flex; flex-direction: column; transform: scale(0.95); transition: transform 0.2s; }
        .modal-large { max-width: 900px; }
        .modal-overlay.active .modal { transform: scale(1); }
        .modal-header { padding: 24px; border-bottom: 1px solid var(--wire-border); display: flex; justify-content: space-between; align-items: center; }
        .modal-header h3 { font-size: 20px; font-weight: 600; color: var(--n-900); margin: 0; }
        .modal-close { background: none; border: none; cursor: pointer; color: var(--blue-gray-500); padding: 8px; border-radius: 6px; }
        .modal-close:hover { background: var(--n-50); }
        .modal-body { padding: 24px; overflow-y: auto; flex: 1; }
        .modal-footer { padding: 24px; border-top: 1px solid var(--wire-border); display: flex; gap: 12px; justify-content: flex-end; background: var(--n-25); }
        .detail-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 24px; }
        .detail-item { display: flex; flex-direction: column; gap: 4px; }
        .detail-label { font-size: 12px; color: var(--blue-gray-500); text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600; }
        .detail-value { font-size: 14px; color: var(--n-900); }
        .detail-value-large { font-size: 18px; font-weight: 600; }
        .user-badge { display: inline-flex; align-items: center; gap: 12px; padding: 8px 16px; background: var(--n-25); border-radius: 8px; border: 1px solid var(--wire-border); }
        .user-info h4 { font-size: 14px; font-weight: 600; color: var(--n-900); margin: 0; }
        .user-id { font-size: 12px; color: var(--blue-gray-500); }
        .timeline { position: relative; padding-left: 32px; }
        .timeline::before { content: ''; position: absolute; left: 8px; top: 0; bottom: 0; width: 2px; background: var(--wire-border); }
        .timeline-item { position: relative; margin-bottom: 24px; }
        .timeline-dot { position: absolute; left: -28px; top: 4px; width: 12px; height: 12px; border-radius: 50%; background: var(--white); border: 2px solid var(--primary-base); }
        .timeline-content { padding: 16px; background: var(--n-25); border-radius: 8px; border: 1px solid var(--wire-border); }
        .timeline-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
        .timeline-title { font-weight: 600; font-size: 14px; color: var(--n-900); }
        .timeline-date { font-size: 12px; color: var(--blue-gray-500); }
        .timeline-description { font-size: 14px; color: var(--blue-gray-500); }
        .notification-bell { position: relative; padding: 8px; border-radius: 8px; cursor: pointer; transition: background 0.2s; color: var(--n-800); }
        .notification-bell:hover { background: var(--n-50); }
        .notification-badge { position: absolute; top: 4px; right: 4px; background: var(--error-base); color: white; font-size: 10px; padding: 2px 6px; border-radius: 999px; font-weight: 600; }
        .notification-dropdown { position: absolute; top: 100%; right: 0; margin-top: 8px; width: 400px; background: var(--white); border-radius: 12px; box-shadow: var(--shadow-lg); border: 1px solid var(--wire-border); display: none; z-index: 200; }
        .notification-dropdown.active { display: block; }
        .notification-header { padding: 16px 24px; border-bottom: 1px solid var(--wire-border); display: flex; justify-content: space-between; align-items: center; }
        .notification-list { max-height: 400px; overflow-y: auto; }
        .notification-item { padding: 16px 24px; border-bottom: 1px solid var(--wire-border); cursor: pointer; transition: background 0.2s; }
        .notification-item:hover { background: var(--n-25); }
        .notification-item.unread { background: rgba(0, 65, 255, 0.04); }
        .notification-content { display: flex; gap: 16px; }
        .notification-icon { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .notification-icon.success { background: var(--success-light); color: var(--success-base); }
        .notification-icon.error { background: var(--error-light); color: var(--error-base); }
        .notification-icon.info { background: var(--secondary-50); color: var(--secondary-base); }
        .notification-text h4 { font-size: 14px; font-weight: 600; margin: 0 0 4px 0; color: var(--n-900); }
        .notification-text p { font-size: 13px; color: var(--blue-gray-500); margin: 0; line-height: 1.4; }
        .notification-time { font-size: 12px; color: var(--blue-gray-500); margin-top: 8px; }
        .form-actions { display: flex; gap: 16px; justify-content: flex-end; padding-top: 24px; border-top: 1px solid var(--wire-border); margin-top: 32px; }
        .hidden-input { display: none; }
    </style>"""

app_header = """    <header class="app-header">
        <div class="header-content">
            <div class="header-logo" style="margin-right: auto;">
                <div class="logo-icon">W</div>
                <div class="logo-text">Product Management</div>
            </div>
            <div class="header-actions">
                <div class="notification-bell" onclick="toggleNotifications()">
                    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                    </svg>
                    <span class="notification-badge">3</span>
                    <div class="notification-dropdown" id="notificationDropdown">
                        <div class="notification-header">
                            <h3 style="font-size: 1rem; font-weight: 600; margin:0;">Notifications</h3>
                            <button class="btn-ghost" style="padding: 0.25rem; font-size: 0.75rem; border:none; cursor:pointer;" onclick="event.stopPropagation()">Mark all as read</button>
                        </div>
                        <div class="notification-list">
                            <div class="notification-item unread">
                                <div class="notification-content">
                                    <div class="notification-icon success">
                                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                    </div>
                                    <div class="notification-text">
                                        <h4>Product Approved</h4>
                                        <p>Samsung Galaxy S24 Ultra has been approved and synced to PrestaShop</p>
                                        <div class="notification-time">5 minutes ago</div>
                                    </div>
                                </div>
                            </div>
                            <div class="notification-item unread">
                                <div class="notification-content">
                                    <div class="notification-icon error">
                                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                    </div>
                                    <div class="notification-text">
                                        <h4>Product Rejected</h4>
                                        <p>Nike Air Max 270 - Missing product images</p>
                                        <div class="notification-time">1 hour ago</div>
                                    </div>
                                </div>
                            </div>
                            <div class="notification-item">
                                <div class="notification-content">
                                    <div class="notification-icon info">
                                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                    </div>
                                    <div class="notification-text">
                                        <h4>Product Pending Review</h4>
                                        <p>Sony WH-1000XM5 Headphones is awaiting approval</p>
                                        <div class="notification-time">2 hours ago</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="user-profile" style="margin-left: 1rem; border-left: 1px solid var(--wire-border); padding-left: 1rem;">
                    <div class="user-avatar">J</div>
                    <div class="user-name">John Seller</div>
                </div>
            </div>
        </div>
    </header>"""

content = re.sub(r'<style>.*?</style>', custom_style, content, flags=re.DOTALL)
content = re.sub(r'<header class="header">.*?</header>', app_header, content, flags=re.DOTALL)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Done! File updated successfully.")
