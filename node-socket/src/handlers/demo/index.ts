import { DefaultEventsMap, Server, Socket } from "socket.io";

// Simulating a simple in-memory data store
let demoData: Record<string, any> = {};

function registerDemoHandler(
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  socket: Socket
) {
  // Simulate GET - Fetch all data
  const getAllData = (callback: (data: any) => void) => {
    console.log('Getting all data');
    callback(demoData);
  };

  // Simulate POST - Create new data
  const createData = (payload: { id: string; data: any }, callback: (response: any) => void) => {
    console.log('Creating data:', payload);
    const { id, data } = payload;
    demoData[id] = data;
    
    // Notify all clients about the new data
    io.emit('demo:dataCreated', { id, data });
    callback({ success: true, message: 'Data created' });
  };

  // Simulate PUT - Update existing data
  const updateData = (payload: { id: string; data: any }, callback: (response: any) => void) => {
    console.log('Updating data:', payload);
    const { id, data } = payload;
    
    if (demoData[id]) {
      demoData[id] = { ...demoData[id], ...data };
      
      // Notify all clients about the update
      io.emit('demo:dataUpdated', { id, data: demoData[id] });
      callback({ success: true, message: 'Data updated' });
    } else {
      callback({ success: false, message: 'Data not found' });
    }
  };

  // Simulate DELETE - Remove data
  const deleteData = (id: string, callback: (response: any) => void) => {
    console.log('Deleting data:', id);
    
    if (demoData[id]) {
      delete demoData[id];
      
      // Notify all clients about the deletion
      io.emit('demo:dataDeleted', { id });
      callback({ success: true, message: 'Data deleted' });
    } else {
      callback({ success: false, message: 'Data not found' });
    }
  };

  // Register event listeners
  socket.on('demo:getAll', getAllData);
  socket.on('demo:create', createData);
  socket.on('demo:update', updateData);
  socket.on('demo:delete', deleteData);

  // Notify when a client connects
  io.emit('demo:userConnected', { userId: socket.id });
}

export default registerDemoHandler;
