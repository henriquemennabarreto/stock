const StockModel = require('../models/stockModel');

const StockController = {
    getAllItems: async (req, res) => {
        try {
            const items = await StockModel.getAllItems();
            res.status(200).json(items);
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar os itens.", error });
        }
    },

    getItemById: async (req, res) => {
        try {
            const { id } = req.params;
            const item = await StockModel.getItemById(id);

            if (!item) {
                return res.status(404).json({ message: "Item não encontrado." });
            }

            res.status(200).json(item);
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar o item.", error });
        }
    },

    addItem: async (req, res) => {
        try {
            const newItem = req.body;
            const [itemId] = await StockModel.addItem(newItem);

            const item = await StockModel.getItemById(itemId);

            if (!item) {
                return res.status(404).json({ message: "Item não encontrado." });
            }

            res.status(201).json({ item });
        } catch (error) {
            res.status(500).json({ message: "Erro ao adicionar o item.", error });
        }
    },

    updateItem: async (req, res) => {
        try {
            const { id } = req.params;
            const updatedData = req.body;

            const result = await StockModel.updateItem(id, updatedData);
            if (result === 0) {
                return res.status(404).json({ message: "Item não encontrado." });
            }

            res.status(200).json({ message: "Item atualizado com sucesso." });
        } catch (error) {
            res.status(500).json({ message: "Erro ao atualizar o item.", error });
        }
    },

    deleteItem: async (req, res) => {
        try {
            const { id } = req.params;

            const result = await StockModel.deleteItem(id);
            if (result === 0) {
                return res.status(404).json({ message: "Item não encontrado." });
            }

            res.status(200).json({ message: "Item deletado com sucesso." });
        } catch (error) {
            res.status(500).json({ message: "Erro ao deletar o item.", error });
        }
    }
};

module.exports = StockController;
