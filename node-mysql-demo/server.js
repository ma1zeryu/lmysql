const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "Jyp23156033@",
  database: "node_mysql_demo",
};

// 测试接口
app.get("/", (req, res) => {
  res.send("Node + MySQL 后端启动成功");
});

// 新增用户
app.post("/users", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "username、email、password 都不能为空",
    });
  }

  try {
    const connection = await mysql.createConnection(dbConfig);

    const [result] = await connection.execute(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, password],
    );

    await connection.end();

    res.json({
      message: "用户创建成功",
      id: result.insertId,
    });
  } catch (err) {
    res.status(500).json({
      message: "创建用户失败",
      error: err.message,
    });
  }
});

// 查询所有用户
app.get("/users", async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);

    const [rows] = await connection.execute(
      "SELECT id, username, email, created_at FROM users",
    );

    await connection.end();

    res.json(rows);
  } catch (err) {
    res.status(500).json({
      message: "查询用户失败",
      error: err.message,
    });
  }
});

// 根据 id 查询用户
app.get("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await mysql.createConnection(dbConfig);

    const [rows] = await connection.execute(
      "SELECT id, username, email, created_at FROM users WHERE id = ?",
      [id],
    );

    await connection.end();

    if (rows.length === 0) {
      return res.status(404).json({
        message: "用户不存在",
      });
    }

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({
      message: "查询用户失败",
      error: err.message,
    });
  }
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
