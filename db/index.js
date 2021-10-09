const mysql = require('mysql');

// const pool = mysql.createPool({
//     connectionLimit : 10,
//     host: 'localhost',
//     user: 'root',
//     password: 'password',
//     database:'goods',
//     port: '3306'
// })

const pool = mysql.createPool({
    connectionLimit : 10,
    host: 'us-cdbr-east-04.cleardb.com',
    user: 'b0d1352197f72a',
    password: '09bca304',
    database:'heroku_e7747223c5bbffd',
    port: '3306'
})

let goodsdb ={};

goodsdb.users = ()=>{
    return new Promise((resolve,reject)=>{
        pool.query('SELECT * FROM users', (err,results)=>{
            if (err){
                return reject (err);
            } 
            return resolve (results);
        })
    })
};

goodsdb.login = (params)=>{
    return new Promise((resolve,reject)=>{
        pool.query('SELECT * FROM user where username = ? and password = ?', [params.username, params.password],(err,results)=>{
            if (err){
                return reject (err);
            } 
            return resolve (results);
        })
    })
};

goodsdb.transaction_add = (params)=>{
    return new Promise((resolve,reject)=>{
        let sql = "INSERT INTO `transaction` (`created_at`, `edited_at`, `edited_by`, `no`, `customer_name`, `delivery`, `delivery_fee`, `delivery_percentage`, `additional_cost`, `additional_description`, `total_profit`, `total_penjualan`, `total_modal`, `item`, `pm_pro`, `catatan`, `marketplace`) VALUES (?)"
        pool.query(sql,[[params.created_at, params.edited_at, params.edited_by, params.no, params.customer_name, params.delivery, params.delivery_fee, params.delivery_percentage, params.additional_cost, params.additional_description, params.total_profit, params.total_penjualan, params.total_modal, params.item, params.pm_pro, params.catatan, params.marketplace]], (err,results)=>{
            if (err){
                return reject (err);
            } 
            console.log(results)
            return resolve (results);
        })
    })
};


goodsdb.transaction_edit = (params)=>{
    return new Promise((resolve,reject)=>{
        let sql = "UPDATE transaction set created_at = ?, edited_at = ?, edited_by = ?, no = ?, customer_name = ?, delivery = ?, delivery_fee = ?, delivery_percentage = ?, additional_cost = ?, additional_description = ?, total_profit = ?, total_penjualan = ?, total_modal = ?, item = ?, pm_pro = ?, catatan = ?, marketplace = ?  WHERE id = ?"
        pool.query(sql,[params.created_at, params.edited_at, params.edited_by, params.no, params.customer_name, params.delivery, params.delivery_fee, params.delivery_percentage, params.additional_cost, params.additional_description, params.total_profit, params.total_penjualan, params.total_modal, params.item, params.pm_pro, params.catatan, params.marketplace, params.id], (err,results)=>{
            if (err){
                return reject (err);
            } 
            console.log(results)
            return resolve (results);
        })
    })
};

goodsdb.transaction_get = (params)=>{
    return new Promise((resolve,reject)=>{
        pool.query('SELECT id, no, customer_name, item, total_profit FROM transaction where marketplace = ? and  created_at = ? ORDER BY id DESC', [params.marketplace, params.created_at],(err,results)=>{
            if (err){
                return reject (err);
            } 
            return resolve (results);
        })
    })
};

goodsdb.transaction_remove = (params)=>{
    return new Promise((resolve,reject)=>{
        pool.query('DELETE FROM transaction WHERE id = ?', [params.id],(err,results)=>{
            if (err){
                return reject (err);
            } 
            return resolve (results);
        })
    })
};

goodsdb.transaction_one = (params)=>{
    return new Promise((resolve,reject)=>{
        pool.query('SELECT * FROM transaction where id = ?', [params.id],(err,results)=>{
            if (err){
                return reject (err);
            } 
            return resolve (results);
        })
    })
};

goodsdb.count_packet = (params)=>{
    return new Promise((resolve,reject)=>{
        pool.query('SELECT no FROM transaction where marketplace = ? and  created_at >= ? and  created_at <= ? ORDER BY no DESC', [params.marketplace, params.start_month, params.end_month],(err,results)=>{
            if (err){
                return reject (err);
            } 
            return resolve (results);
        })
    })
};

goodsdb.packet_get = (params)=>{
    return new Promise((resolve,reject)=>{
        pool.query('SELECT marketplace, COUNT(id) AS count FROM transaction where  created_at >= ? and  created_at <= ? GROUP BY marketplace', [ params.start_month, params.end_month],(err,results)=>{
            if (err){
                return reject (err);
            } 
            return resolve (results);
        })
    })
};

goodsdb.expense_get_monthly = (params)=>{
    return new Promise((resolve,reject)=>{
        pool.query('SELECT amount AS pengeluaran FROM expense where date >= ? and  date <= ? ', [ params.start_month, params.end_month],(err,results)=>{
            if (err){
                return reject (err);
            } 
            return resolve (results);
        })
    })
};

goodsdb.report_get = (params)=>{
    return new Promise((resolve,reject)=>{
        pool.query('SELECT total_modal AS modal, total_penjualan AS penjualan, total_profit AS profit, delivery_fee AS kurir, additional_cost AS tambahan, pm_pro AS power_merchant, marketplace FROM transaction where  created_at >= ? and  created_at <= ? ORDER BY marketplace', [ params.start_month, params.end_month],(err,results)=>{
            if (err){
                return reject (err);
            } 
            return resolve (results);
        })
    })
};

goodsdb.expense_add = (params)=>{
    return new Promise((resolve,reject)=>{
        let sql = "INSERT INTO `expense` (`description`, `date`, `amount`) VALUES (?)"
        pool.query(sql,[[params.description, params.date, params.amount]], (err,results)=>{
            if (err){
                return reject (err);
            } 
            console.log(results)
            return resolve (results);
        })
    })
};

goodsdb.expense_get = ()=>{
    return new Promise((resolve,reject)=>{
        pool.query('SELECT * FROM expense ORDER BY date DESC' ,(err,results)=>{
            if (err){
                return reject (err);
            } 
            return resolve (results);
        })
    })
};

goodsdb.expense_remove = (params)=>{
    return new Promise((resolve,reject)=>{
        pool.query('DELETE FROM expense WHERE id = ?', [params.id],(err,results)=>{
            if (err){
                return reject (err);
            } 
            return resolve (results);
        })
    })
};

goodsdb.expense_edit = (params)=>{
    return new Promise((resolve,reject)=>{
        let sql = "UPDATE expense set description = ?, date = ?, amount = ?  WHERE id = ?"
        pool.query(sql,[params.description, params.date, params.amount, params.id], (err,results)=>{
            if (err){
                return reject (err);
            } 
            console.log(results)
            return resolve (results);
        })
    })
};


goodsdb.product_add = (params)=>{
    return new Promise((resolve,reject)=>{
        let sql = "INSERT INTO `product` (`name`, `modal`, `jual`) VALUES (?)"
        pool.query(sql,[[params.name, params.modal, params.jual]], (err,results)=>{
            if (err){
                return reject (err);
            } 
            console.log(results)
            return resolve (results);
        })
    })
};

goodsdb.product_get = ()=>{
    return new Promise((resolve,reject)=>{
        pool.query('SELECT * FROM product ORDER BY name ASC' ,(err,results)=>{
            if (err){
                return reject (err);
            } 
            return resolve (results);
        })
    })
};

goodsdb.product_remove = (params)=>{
    return new Promise((resolve,reject)=>{
        pool.query('DELETE FROM product WHERE id = ?', [params.id],(err,results)=>{
            if (err){
                return reject (err);
            } 
            return resolve (results);
        })
    })
};

goodsdb.product_edit = (params)=>{
    return new Promise((resolve,reject)=>{
        let sql = "UPDATE product set name = ?, modal = ?, jual = ?  WHERE id = ?"
        pool.query(sql,[params.name, params.modal, params.jual, params.id], (err,results)=>{
            if (err){
                return reject (err);
            } 
            console.log(results)
            return resolve (results);
        })
    })
};


goodsdb.user_get = ()=>{
    return new Promise((resolve,reject)=>{
        pool.query('SELECT * FROM user' ,(err,results)=>{
            if (err){
                return reject (err);
            } 
            return resolve (results);
        })
    })
};

goodsdb.search_get = (params)=>{
    var keyword = '%' + params.keyword+ '%';

    return new Promise((resolve,reject)=>{
        pool.query('SELECT * FROM transaction WHERE (customer_name LIKE N? OR no LIKE N? OR catatan LIKE N?) AND marketplace = ? ORDER BY created_at DESC' ,[keyword, keyword, keyword, params.marketplace ],(err,results)=>{
            if (err){
                return reject (err);
            } 
            return resolve (results);
        })
    })
};

goodsdb.expense_search = (params)=>{
    var keyword = '%' + params.keyword+ '%';

    return new Promise((resolve,reject)=>{
        pool.query('SELECT * FROM expense WHERE description LIKE N? ORDER BY date DESC' ,[keyword],(err,results)=>{
            if (err){
                return reject (err);
            } 
            return resolve (results);
        })
    })
};

goodsdb.product_search = (params)=>{
    var keyword = '%' + params.keyword+ '%';

    return new Promise((resolve,reject)=>{
        pool.query('SELECT * FROM product WHERE name LIKE N? ORDER BY name ASC' ,[keyword],(err,results)=>{
            if (err){
                return reject (err);
            } 
            return resolve (results);
        })
    })
};

module.exports = goodsdb;