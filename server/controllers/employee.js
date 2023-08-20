const {pool} = require('../config/database');

const getAllEmployees = async(req,res) =>{
    try {
        const result  =  await pool.query('Select * from employees');
        res.json(result.rows);       
    }
    catch(error){
        console.error('Error fetching employees',error);
        res.status(500).json({error : 'Internal server error'});
    }
};

const createEmployee = async (req,res) => {
    const {
        firstName,
        lastName,
        email,
        mobile
      } = req.body;

      try {
        const result = await pool.query(
          'INSERT INTO employees (firstName, lastName, email, mobile) VALUES ($1, $2, $3, $4) RETURNING *',
          [firstName, lastName, email, mobile]
        );
        res.status(201).json(result.rows[0]);
      } catch (error) {
        console.error('Error creating employee:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}



module.exports = {
    getAllEmployees,
    createEmployee
}
