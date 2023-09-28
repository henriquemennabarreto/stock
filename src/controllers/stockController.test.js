
const { getAllItems, getItemById, addItem, updateItem } = require('./stockController');
const StockModel = require('../models/stockModel');

jest.mock('../models/stockModel');

describe('StockController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch all items successfully', async () => {
    const mockItems = [{ id: 1, name: 'item1' }, { id: 2, name: 'item2' }];

    StockModel.getAllItems.mockResolvedValue(mockItems);

    const mockReq = {};
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await getAllItems(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockItems);
  });

  it('should handle errors when fetching items', async () => {
    const mockError = new Error('Database error');

    StockModel.getAllItems.mockRejectedValue(mockError);

    const mockReq = {};
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await getAllItems(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Erro ao buscar os itens.",
      error: mockError
    });
  });
});

describe('StockController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should retrieve an item by ID successfully', async () => {
    const mockItem = {
      id: 456,
      name: 'Test Item',
      quantity: 50,
      description: 'This is a test item'
    };

    StockModel.getItemById.mockResolvedValue(mockItem);

    const mockReq = {
      params: {
        id: 456
      }
    };

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await getItemById(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockItem);
  });

  it('should handle the scenario when the item is not found', async () => {
    StockModel.getItemById.mockResolvedValue(undefined); // Mock para simular que o item não foi encontrado

    const mockReq = {
      params: {
        id: 999 // Um ID fictício que não existe
      }
    };

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await getItemById(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({ message: "Item não encontrado." });
  });

  it('should handle errors when fetching the item by ID', async () => {
    const mockError = new Error('Database error');

    StockModel.getItemById.mockRejectedValue(mockError);

    const mockReq = {
      params: {
        id: 456
      }
    };

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await getItemById(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: 'Erro ao buscar o item.',
      error: mockError
    });
  });
});

describe('StockController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should add a new item successfully', async () => {
    const newItem = {
      name: 'Test Item',
      quantity: 50,
      description: 'This is a new test item'
    };

    const mockItemId = [456]; // O ID gerado após a inserção
    const mockItem = { id: 456, ...newItem }; // Item incluído com ID

    StockModel.addItem.mockResolvedValue(mockItemId);
    StockModel.getItemById.mockResolvedValue(mockItem);

    const mockReq = {
      body: newItem
    };

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await addItem(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith({ item: mockItem });
  });

  it('should handle the scenario when the item is not found after insertion', async () => {
    const newItem = {
      name: 'Test Item',
      quantity: 50,
      description: 'This is a new test item'
    };

    const mockItemId = [456];

    StockModel.addItem.mockResolvedValue(mockItemId);
    StockModel.getItemById.mockResolvedValue(undefined); // Mock para simular um cenário onde o item não é encontrado

    const mockReq = {
      body: newItem
    };

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await addItem(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({ message: "Item não encontrado." });
  });

  it('should handle error when adding a new item', async () => {
    const mockError = new Error('Failed to add item');

    StockModel.addItem.mockRejectedValue(mockError);

    const mockReq = {
      body: {
        name: 'Test Item',
        quantity: 50,
        description: 'This is a new test item'
      }
    };

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await addItem(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: 'Erro ao adicionar o item.',
      error: mockError
    });
  });
});

describe('StockController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully update an existing item', async () => {
    StockModel.updateItem.mockResolvedValue(1); // Mock para simular que 1 linha foi atualizada

    const mockReq = {
      params: {
        id: 123
      },
      body: {
        name: 'Updated Item',
        quantity: 100
      }
    };

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await updateItem(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ message: "Item atualizado com sucesso." });
  });

  it('should handle the scenario when trying to update a non-existing item', async () => {
    StockModel.updateItem.mockResolvedValue(0); // Mock para simular que 0 linhas foram atualizadas

    const mockReq = {
      params: {
        id: 999 // Um ID fictício que não existe
      },
      body: {
        name: 'Non-Existing Item',
        quantity: 100
      }
    };

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await updateItem(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({ message: "Item não encontrado." });
  });

  it('should handle errors when updating the item', async () => {
    const mockError = new Error('Database error');

    StockModel.updateItem.mockRejectedValue(mockError);

    const mockReq = {
      params: {
        id: 123
      },
      body: {
        name: 'Updated Item',
        quantity: 100
      }
    };

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await updateItem(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: 'Erro ao atualizar o item.',
      error: mockError
    });
  });
});
