"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface DataItem {
  id: string;
  data: any;
}

export default function SocketDemo() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [items, setItems] = useState<Record<string, any>>({});
  const [newItemName, setNewItemName] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    // Initialize socket connection
    const socketInstance = io("http://localhost:5000");

    socketInstance.on("connect", () => {
      setStatus("Connected to server");
      console.log("Connected to socket server");
    });

    socketInstance.on("demo:dataCreated", ({ id, data }) => {
      setItems((prev) => ({ ...prev, [id]: data }));
      setStatus("New item created");
    });

    socketInstance.on("demo:dataUpdated", ({ id, data }) => {
      setItems((prev) => ({ ...prev, [id]: data }));
      setStatus("Item updated");
    });

    socketInstance.on("demo:dataDeleted", ({ id }) => {
      setItems((prev) => {
        const newItems = { ...prev };
        delete newItems[id];
        return newItems;
      });
      setStatus("Item deleted");
    });

    // Get initial data
    socketInstance.emit("demo:getAll", (data: Record<string, any>) => {
      setItems(data);
      setStatus("Loaded initial data");
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const createItem = () => {
    if (!socket || !newItemName) return;

    const id = Date.now().toString();
    socket.emit(
      "demo:create",
      { id, data: { name: newItemName } },
      (response: any) => {
        setStatus(response.message);
        setNewItemName("");
      }
    );
  };

  const updateItem = (id: string) => {
    if (!socket) return;

    socket.emit(
      "demo:update",
      { id, data: { name: `${items[id].name} (updated)` } },
      (response: any) => {
        setStatus(response.message);
      }
    );
  };

  const deleteItem = (id: string) => {
    if (!socket) return;

    socket.emit("demo:delete", id, (response: any) => {
      setStatus(response.message);
    });
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Socket.IO Demo</h1>
      <div className="mb-4 text-sm text-gray-600">Status: {status}</div>

      {/* Create new item */}
      <div className="mb-6 flex gap-2">
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="Enter item name"
          className="border p-2 rounded"
        />
        <button
          onClick={createItem}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Item
        </button>
      </div>

      {/* List items */}
      <div className="space-y-4">
        {Object.entries(items).map(([id, item]) => (
          <div
            key={id}
            className="border p-4 rounded flex items-center justify-between"
          >
            <span>{(item as any).name}</span>
            <div className="space-x-2">
              <button
                onClick={() => updateItem(id)}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                Update
              </button>
              <button
                onClick={() => deleteItem(id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
