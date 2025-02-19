const pool = require('../config/database');

// Obtener todos los usuarios
const getUsers = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM ctrl_usuarios');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
};

// Insertar un nuevo usuario
const createUser = async (req, res) => {
    const { usr_nombre, usr_ced, usr_lgn_nom, usr_lgn_git } = req.body;
    if (!usr_nombre || !usr_ced || !usr_lgn_nom || !usr_lgn_git) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO ctrl_usuarios (usr_nombre, usr_ced, usr_lgn_nom, usr_lgn_git) VALUES ($1, $2, $3, $4) RETURNING *',
            [usr_nombre, usr_ced, usr_lgn_nom, usr_lgn_git]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al insertar usuario' });
    }
};

// Actualizar un usuario
const updateUser = async (req, res) => {
    const { usr_id } = req.params;
    const { usr_nombre, usr_ced, usr_lgn_nom, usr_lgn_git } = req.body;
    if (!usr_nombre || !usr_ced || !usr_lgn_nom || !usr_lgn_git) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    try {
        const result = await pool.query(
            'UPDATE ctrl_usuarios SET usr_nombre = $1, usr_ced = $2, usr_lgn_nom = $3, usr_lgn_git = $4 WHERE usr_id = $5 RETURNING *',
            [usr_nombre, usr_ced, usr_lgn_nom, usr_lgn_git, usr_id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar usuario' });
    }
};

// Eliminar un usuario
const deleteUser = async (req, res) => {
    const { usr_id } = req.params;

    try {
        const result = await pool.query(
            'DELETE FROM ctrl_usuarios WHERE usr_id = $1 RETURNING *',
            [usr_id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar usuario' });
    }
};

// Exportar las funciones
module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
};