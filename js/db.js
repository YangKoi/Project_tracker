/**
 * Petro-Track IndexedDB Manager
 * Quản lý lưu trữ cục bộ cho dự án, thư mục và tệp tin đính kèm
 */

const DB_NAME = 'PetroTrackDB';
const DB_VERSION = 1;

let dbInstance = null;

// Hàm mở kết nối cơ sở dữ liệu
export function openDB() {
    if (dbInstance) return Promise.resolve(dbInstance);

    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = (event) => {
            console.error('Lỗi kết nối database:', event.target.error);
            reject(event.target.error);
        };

        request.onsuccess = (event) => {
            dbInstance = event.target.result;
            resolve(dbInstance);
        };

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            
            // Store chứa các dự án
            if (!db.objectStoreNames.contains('projects')) {
                db.createObjectStore('projects', { keyPath: 'id' });
            }
            
            // Store chứa thư mục ảo của DMS
            if (!db.objectStoreNames.contains('folders')) {
                const folderStore = db.createObjectStore('folders', { keyPath: 'id' });
                folderStore.createIndex('projectId', 'projectId', { unique: false });
            }
            
            // Store chứa tệp tin nhị phân của DMS
            if (!db.objectStoreNames.contains('files')) {
                const fileStore = db.createObjectStore('files', { keyPath: 'id' });
                fileStore.createIndex('projectId', 'projectId', { unique: false });
                fileStore.createIndex('folderId', 'folderId', { unique: false });
            }
        };
    });
}

// --- PROJECT API ---

export async function getAllProjects() {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction('projects', 'readonly');
        const store = transaction.objectStore('projects');
        const request = store.getAll();

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

export async function getProjectById(id) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction('projects', 'readonly');
        const store = transaction.objectStore('projects');
        const request = store.get(id);

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

export async function saveProject(project) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction('projects', 'readwrite');
        const store = transaction.objectStore('projects');
        const request = store.put(project);

        request.onsuccess = () => resolve(project);
        request.onerror = () => reject(request.error);
    });
}

export async function deleteProject(id) {
    const db = await openDB();
    
    // Xóa dự án, tất cả thư mục và file thuộc dự án đó
    return new Promise(async (resolve, reject) => {
        try {
            // Xóa file trước
            const files = await getFilesByProject(id);
            for (const f of files) {
                await deleteFile(f.id);
            }
            
            // Xóa thư mục
            const folders = await getFoldersByProject(id);
            for (const folder of folders) {
                await deleteFolder(folder.id);
            }

            // Xóa dự án
            const transaction = db.transaction('projects', 'readwrite');
            const store = transaction.objectStore('projects');
            const request = store.delete(id);
            
            request.onsuccess = () => resolve(true);
            request.onerror = () => reject(request.error);
        } catch (err) {
            reject(err);
        }
    });
}

// --- FOLDER API ---

export async function getFoldersByProject(projectId) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction('folders', 'readonly');
        const store = transaction.objectStore('folders');
        const index = store.index('projectId');
        const request = index.getAll(projectId);

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

export async function saveFolder(folder) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction('folders', 'readwrite');
        const store = transaction.objectStore('folders');
        const request = store.put(folder);

        request.onsuccess = () => resolve(folder);
        request.onerror = () => reject(request.error);
    });
}

export async function deleteFolder(folderId) {
    const db = await openDB();
    return new Promise(async (resolve, reject) => {
        try {
            // Lấy tất cả tệp trong thư mục này và xóa chúng
            const transactionFile = db.transaction('files', 'readwrite');
            const fileStore = transactionFile.objectStore('files');
            const fileIndex = fileStore.index('folderId');
            const filesReq = fileIndex.getAll(folderId);

            filesReq.onsuccess = async () => {
                const files = filesReq.result;
                for (const f of files) {
                    await deleteFile(f.id);
                }

                // Sau đó xóa thư mục này
                const transactionFolder = db.transaction('folders', 'readwrite');
                const folderStore = transactionFolder.objectStore('folders');
                const delReq = folderStore.delete(folderId);
                
                delReq.onsuccess = () => resolve(true);
                delReq.onerror = () => reject(delReq.error);
            };
            filesReq.onerror = () => reject(filesReq.error);
        } catch (err) {
            reject(err);
        }
    });
}

// --- FILE API ---

export async function getFilesByProject(projectId) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction('files', 'readonly');
        const store = transaction.objectStore('files');
        const index = store.index('projectId');
        const request = index.getAll(projectId);

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

export async function getFilesByFolder(folderId) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction('files', 'readonly');
        const store = transaction.objectStore('files');
        const index = store.index('folderId');
        const request = index.getAll(folderId);

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

export async function saveFile(file) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction('files', 'readwrite');
        const store = transaction.objectStore('files');
        const request = store.put(file);

        request.onsuccess = () => resolve(file);
        request.onerror = () => reject(request.error);
    });
}

export async function getFile(id) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction('files', 'readonly');
        const store = transaction.objectStore('files');
        const request = store.get(id);

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

export async function deleteFile(id) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction('files', 'readwrite');
        const store = transaction.objectStore('files');
        const request = store.delete(id);

        request.onsuccess = () => resolve(true);
        request.onerror = () => reject(request.error);
    });
}

// --- DATABASE BACKUP & RESTORE ---

// Xuất toàn bộ dữ liệu ra đối tượng JSON (bao gồm chuyển Blob thành Base64 để lưu vào JSON)
export async function exportDatabase() {
    const projects = await getAllProjects();
    
    // Lấy thư mục
    const db = await openDB();
    const folders = await new Promise((resolve, reject) => {
        const tx = db.transaction('folders', 'readonly');
        const store = tx.objectStore('folders');
        const req = store.getAll();
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });

    // Lấy file và convert file Blob sang Base64/Text
    const filesRaw = await new Promise((resolve, reject) => {
        const tx = db.transaction('files', 'readonly');
        const store = tx.objectStore('files');
        const req = store.getAll();
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });

    const files = [];
    for (const file of filesRaw) {
        let base64Data = null;
        if (file.data instanceof Blob) {
            base64Data = await blobToBase64(file.data);
        } else if (typeof file.data === 'string') {
            base64Data = file.data;
        }
        files.push({
            id: file.id,
            projectId: file.projectId,
            folderId: file.folderId,
            name: file.name,
            size: file.size,
            type: file.type,
            uploadedAt: file.uploadedAt,
            base64Data: base64Data
        });
    }

    return {
        metadata: {
            appName: 'Petro-Track',
            exportedAt: new Date().toISOString(),
            version: '1.0'
        },
        projects,
        folders,
        files
    };
}

// Nhập dữ liệu từ JSON backup
export async function importDatabase(backupData) {
    if (!backupData || backupData.metadata?.appName !== 'Petro-Track') {
        throw new Error('Định dạng file backup không hợp lệ.');
    }

    const db = await openDB();
    
    // Clear dữ liệu hiện tại
    await clearStore('projects');
    await clearStore('folders');
    await clearStore('files');

    // Khôi phục dự án
    if (backupData.projects && Array.isArray(backupData.projects)) {
        const tx = db.transaction('projects', 'readwrite');
        const store = tx.objectStore('projects');
        for (const proj of backupData.projects) {
            store.put(proj);
        }
    }

    // Khôi phục thư mục
    if (backupData.folders && Array.isArray(backupData.folders)) {
        const tx = db.transaction('folders', 'readwrite');
        const store = tx.objectStore('folders');
        for (const folder of backupData.folders) {
            store.put(folder);
        }
    }

    // Khôi phục tệp tin
    if (backupData.files && Array.isArray(backupData.files)) {
        const tx = db.transaction('files', 'readwrite');
        const store = tx.objectStore('files');
        for (const fileData of backupData.files) {
            let blob = null;
            if (fileData.base64Data) {
                blob = base64ToBlob(fileData.base64Data, fileData.type);
            }
            
            store.put({
                id: fileData.id,
                projectId: fileData.projectId,
                folderId: fileData.folderId,
                name: fileData.name,
                size: fileData.size,
                type: fileData.type,
                uploadedAt: fileData.uploadedAt,
                data: blob
            });
        }
    }

    return true;
}

// Xóa trắng một ObjectStore
function clearStore(storeName) {
    return openDB().then(db => {
        return new Promise((resolve, reject) => {
            const tx = db.transaction(storeName, 'readwrite');
            const store = tx.objectStore(storeName);
            const req = store.clear();
            req.onsuccess = () => resolve(true);
            req.onerror = () => reject(req.error);
        });
    });
}

// Helper: Convert Blob to Base64 String
function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

// Helper: Convert Base64 back to Blob
function base64ToBlob(base64Data, contentType) {
    const parts = base64Data.split(';base64,');
    const rawBase64 = parts.length > 1 ? parts[1] : parts[0];
    const sliceSize = 512;
    const byteCharacters = atob(rawBase64);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType || '' });
}
