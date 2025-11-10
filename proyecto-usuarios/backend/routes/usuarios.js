const express = require('express');
const router = express.Router();
const db = require('../config/database');

router.get('/', (req, res) => {
    const query = 'SELECT * FROM usuarios ORDER BY id DESC';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener usuarios:', err);
            return res.status(500).json({
                error: 'Error al obtener usuarios',
                details: err.message
            });
        }
        res.json(results);
    });
});

router.post('/', (req, res) => {
  const { nombre, email, telefono } = req.body;
  if (!nombre || !email)
    return res.status(400).json({ error: 'Nombre y correo son requeridos' });

  const query = 'INSERT INTO usuarios (nombre, email, telefono) VALUES (?, ?, ?)';
  db.query(query, [nombre, email, telefono], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, nombre, email, telefono });
  });
});

// Actualizar usuario
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, email, telefono } = req.body;
  const query = 'UPDATE usuarios SET nombre=?, email=?, telefono=? WHERE id=?';
  db.query(query, [nombre, email, telefono, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Usuario actualizado correctamente' });
  });
});

// Eliminar usuario
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM usuarios WHERE id=?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Usuario eliminado correctamente' });
  });
});


module.exports = router; 